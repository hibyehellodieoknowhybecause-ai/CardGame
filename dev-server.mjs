import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const port = Number(process.argv[2] || process.env.PORT || 4174);
const host = "127.0.0.1";
const layoutPath = join(root, "layout.json");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
};

function sendJson(response, status, data) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data, null, 2));
}

function readRequestBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        rejectBody(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

function validateLayout(layout) {
  if (!layout || typeof layout !== "object" || Array.isArray(layout)) {
    throw new Error("Layout must be an object.");
  }

  const buttons = layout.buttons && typeof layout.buttons === "object" && !Array.isArray(layout.buttons) ? layout.buttons : layout;

  for (const [id, item] of Object.entries(buttons)) {
    if (!/^[a-z][a-z0-9-]*$/i.test(id)) {
      throw new Error(`Invalid layout id: ${id}`);
    }

    for (const key of ["x", "y", "w", "h", "labelY"]) {
      if (typeof item[key] !== "number" || !Number.isFinite(item[key])) {
        throw new Error(`${id}.${key} must be a number.`);
      }
    }
  }

  if (layout.textBoxes !== undefined && !Array.isArray(layout.textBoxes)) {
    throw new Error("textBoxes must be an array.");
  }

  for (const [index, item] of (layout.textBoxes || []).entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`textBoxes[${index}] must be an object.`);
    }

    for (const key of ["id", "text", "color", "fontWeight", "align"]) {
      if (typeof item[key] !== "string") {
        throw new Error(`textBoxes[${index}].${key} must be a string.`);
      }
    }

    if (!/^#[0-9a-f]{6}$/i.test(item.color)) {
      throw new Error(`textBoxes[${index}].color must be a hex color.`);
    }

    if (!["500", "700", "900"].includes(item.fontWeight)) {
      throw new Error(`textBoxes[${index}].fontWeight is invalid.`);
    }

    if (!["left", "center", "right"].includes(item.align)) {
      throw new Error(`textBoxes[${index}].align is invalid.`);
    }

    for (const key of ["x", "y", "w", "h", "fontSize"]) {
      if (typeof item[key] !== "number" || !Number.isFinite(item[key])) {
        throw new Error(`textBoxes[${index}].${key} must be a number.`);
      }
    }
  }
}

function run(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd: root });
    let output = "";

    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });
    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code === 0) {
        resolveRun(output.trim());
      } else {
        rejectRun(new Error(output.trim() || `${command} exited with code ${code}`));
      }
    });
  });
}

async function saveLayout(request, response) {
  try {
    await writeLayoutFromRequest(request);
    sendJson(response, 200, { ok: true });
  } catch (error) {
    sendJson(response, 400, { ok: false, error: error.message });
  }
}

async function writeLayoutFromRequest(request) {
  const body = await readRequestBody(request);
  const layout = JSON.parse(body);

  validateLayout(layout);
  await writeFile(layoutPath, `${JSON.stringify(layout, null, 2)}\n`);
}

async function publishLayout(request, response) {
  try {
    await writeLayoutFromRequest(request);
    await run("git", ["add", "layout.json"]);

    const status = await run("git", ["status", "--short", "layout.json"]);
    if (!status) {
      sendJson(response, 200, { ok: true, message: "No layout changes to publish." });
      return;
    }

    await run("git", ["commit", "-m", "Update in-game layout"]);
    await run("git", ["push"]);
    sendJson(response, 200, { ok: true, message: "Layout committed and pushed to GitHub." });
  } catch (error) {
    sendJson(response, 500, { ok: false, error: error.message });
  }
}

function serveFile(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = normalize(resolve(root, `.${requestPath}`));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const stream = createReadStream(filePath);

  stream.on("open", () => {
    response.writeHead(200, { "content-type": contentTypes[extname(filePath)] || "application/octet-stream" });
    stream.pipe(response);
  });
  stream.on("error", () => {
    response.writeHead(404);
    response.end("Not found");
  });
}

createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/layout") {
    saveLayout(request, response);
    return;
  }

  if (request.method === "POST" && request.url === "/api/layout/publish") {
    publishLayout(request, response);
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    serveFile(request, response);
    return;
  }

  response.writeHead(405);
  response.end("Method not allowed");
}).listen(port, host, () => {
  console.log(`Card Game dev server running at http://${host}:${port}`);
  console.log("Use Edit Layout in the game to drag/resize map buttons.");
});
