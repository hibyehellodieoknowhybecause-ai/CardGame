const MAX_UPGRADE_STARS = 6;
const LEVEL_STAT_PERCENT = 9 / 13;
const FINAL_MAX_STAT_SCALE = 3.264;
const STAR_STAT_PERCENT_BY_STARS = {
  1: 10,
  2: 16,
  3: 24,
  4: 34,
  5: 50,
  6: 73,
};

const rarities = [
  { id: "one", stars: 1, label: "1 Star", short: "1*", color: "#9aa7b8" },
  { id: "two", stars: 2, label: "2 Star", short: "2*", color: "#7bcf94" },
  { id: "three", stars: 3, label: "3 Star", short: "3*", color: "#5db7e8" },
  { id: "four", stars: 4, label: "4 Star", short: "4*", color: "#b489ff" },
  { id: "five", stars: 5, label: "5 Star", short: "5*", color: "#ffbf4d" },
  { id: "secret", stars: 6, label: "Secret", short: "S", color: "#ff5f7a", secret: true },
];

const elements = {
  fire: {
    label: "Fire",
    symbol: "FI",
    color: "#e85445",
    beats: "wind",
    weakTo: "water",
    isRare: false,
  },
  water: {
    label: "Water",
    symbol: "WA",
    color: "#357dd8",
    beats: "fire",
    weakTo: "wind",
    isRare: false,
  },
  wind: {
    label: "Wind",
    symbol: "WI",
    color: "#42a66a",
    beats: "water",
    weakTo: "fire",
    isRare: false,
  },
  light: {
    label: "Light",
    symbol: "LI",
    color: "#f2d66b",
    beats: "dark",
    weakTo: "dark",
    isRare: true,
  },
  dark: {
    label: "Dark",
    symbol: "DA",
    color: "#6c5fd6",
    beats: "light",
    weakTo: "light",
    isRare: true,
  },
};

const creatureTemplates = [
  { name: "Ashling Cub", archetype: "Bruiser", element: "fire", naturalStars: 1, hp: 880, atk: 92, def: 64, spd: 96 },
  { name: "Cinder Imp", archetype: "Striker", element: "fire", naturalStars: 2, hp: 930, atk: 116, def: 70, spd: 103 },
  { name: "Emberback Drake", archetype: "Attacker", element: "fire", naturalStars: 3, hp: 1080, atk: 144, def: 82, spd: 101 },
  { name: "Blazehorn Myrmidon", archetype: "Tank Breaker", element: "fire", naturalStars: 4, hp: 1240, atk: 170, def: 98, spd: 99 },
  { name: "Solar Chimera", archetype: "Boss Attacker", element: "fire", naturalStars: 5, hp: 1420, atk: 205, def: 116, spd: 105 },

  { name: "Tidelet", archetype: "Support", element: "water", naturalStars: 1, hp: 940, atk: 78, def: 78, spd: 94 },
  { name: "Shellfin Guard", archetype: "Defender", element: "water", naturalStars: 2, hp: 1040, atk: 88, def: 105, spd: 88 },
  { name: "Mistfin Siren", archetype: "Controller", element: "water", naturalStars: 3, hp: 1140, atk: 118, def: 92, spd: 102 },
  { name: "Riptide Basilisk", archetype: "Debuffer", element: "water", naturalStars: 4, hp: 1310, atk: 144, def: 118, spd: 97 },
  { name: "Abyssal Leviathan", archetype: "HP Bruiser", element: "water", naturalStars: 5, hp: 1580, atk: 176, def: 128, spd: 96 },

  { name: "Leafsprite", archetype: "Healer", element: "wind", naturalStars: 1, hp: 900, atk: 82, def: 72, spd: 100 },
  { name: "Gale Hare", archetype: "Speed Lead", element: "wind", naturalStars: 2, hp: 920, atk: 102, def: 68, spd: 112 },
  { name: "Thornback Stag", archetype: "Bruiser", element: "wind", naturalStars: 3, hp: 1180, atk: 128, def: 96, spd: 98 },
  { name: "Verdant Wyvern", archetype: "Turn Cycler", element: "wind", naturalStars: 4, hp: 1260, atk: 152, def: 104, spd: 108 },
  { name: "Tempest Roc", archetype: "Nuker", element: "wind", naturalStars: 5, hp: 1360, atk: 214, def: 102, spd: 111 },

  { name: "Lantern Moth", archetype: "Cleanser", element: "light", naturalStars: 3, hp: 1220, atk: 116, def: 108, spd: 103 },
  { name: "Dawn Kirin", archetype: "Protector", element: "light", naturalStars: 4, hp: 1380, atk: 136, def: 132, spd: 104 },
  { name: "Seraphic Gryphon", archetype: "Support Carry", element: "light", naturalStars: 5, hp: 1500, atk: 188, def: 132, spd: 110 },
  { name: "Shade Wisp", archetype: "Disruptor", element: "dark", naturalStars: 3, hp: 1080, atk: 132, def: 92, spd: 109 },
  { name: "Umbral Manticore", archetype: "Assassin", element: "dark", naturalStars: 4, hp: 1200, atk: 178, def: 92, spd: 112 },
  { name: "Nightmare Hydra", archetype: "Control Carry", element: "dark", naturalStars: 5, hp: 1460, atk: 198, def: 120, spd: 107 },
];

const packs = [
  {
    id: "wildling",
    name: "Worst Scroll",
    ticket: "basicTickets",
    cost: 1,
    summons: 1,
    naturalStarOdds: [
      { stars: 1, weight: 91.5 },
      { stars: 2, weight: 8 },
      { stars: 3, weight: 0.5 },
    ],
    elementOdds: [
      { element: "fire", weight: 30 },
      { element: "water", weight: 30 },
      { element: "wind", weight: 30 },
      { element: "light", weight: 5 },
      { element: "dark", weight: 5 },
    ],
    note: "Summons natural 1-3 star creatures.",
  },
  {
    id: "mystic",
    name: "Mystic Pack",
    ticket: "mysticTickets",
    cost: 1,
    summons: 1,
    naturalStarOdds: [
      { stars: 3, weight: 91.5 },
      { stars: 4, weight: 8 },
      { stars: 5, weight: 0.5 },
    ],
    elementOdds: [
      { element: "fire", weight: 31 },
      { element: "water", weight: 31 },
      { element: "wind", weight: 31 },
      { element: "light", weight: 3.5 },
      { element: "dark", weight: 3.5 },
    ],
    note: "Summons natural 3-5 star creatures.",
  },
];

const playerState = {
  basicTickets: 200,
  mysticTickets: 200,
  collection: [],
};

const collectionSort = {
  field: "element",
  direction: "desc",
};

const defaultButtonLayout = {
  summoning: { x: 52, y: 78, w: 9.5, h: 8.5, labelY: 2.25 },
  monsters: { x: 23, y: 49, w: 10, h: 8.75, labelY: 2.4 },
  forge: { x: 72, y: 34, w: 10, h: 8.25, labelY: 2.35 },
  trials: { x: 72, y: 61, w: 8, h: 8, labelY: 2.25 },
};

const defaultTextBoxes = [
  {
    id: "label-summoning",
    text: "Summoning",
    x: 50.73,
    y: 87.75,
    w: 8,
    h: 1.5,
    color: "#fff3c6",
    fontSize: 13,
    fontWeight: "900",
    align: "center",
  },
  {
    id: "label-monsters",
    text: "Monsters",
    x: 15.52,
    y: 51.8,
    w: 8,
    h: 1.5,
    color: "#fff3c6",
    fontSize: 13,
    fontWeight: "900",
    align: "center",
  },
  {
    id: "label-forge",
    text: "Forge",
    x: 89.27,
    y: 31.8,
    w: 6,
    h: 1.5,
    color: "#ffe7b3",
    fontSize: 13,
    fontWeight: "900",
    align: "center",
  },
  {
    id: "label-trials",
    text: "Trials",
    x: 88.85,
    y: 55.5,
    w: 6,
    h: 1.5,
    color: "#ffe7b3",
    fontSize: 13,
    fontWeight: "900",
    align: "center",
  },
];

let layoutState = {
  buttons: structuredClone(defaultButtonLayout),
  textBoxes: structuredClone(defaultTextBoxes),
};
let buttonLayout = layoutState.buttons;
let isLayoutEditing = false;
let activeLayoutDrag = null;
let activeTextBoxId = null;
const isLocalLayoutEditor =
  window.location.protocol.startsWith("http") &&
  ["127.0.0.1", "localhost"].includes(window.location.hostname);

const openSummonButton = document.querySelector("#openSummon");
const openCollectionButton = document.querySelector("#openCollection");
const closeSummonButton = document.querySelector("#closeSummon");
const closeCollectionButton = document.querySelector("#closeCollection");
const summonMenu = document.querySelector("#summonMenu");
const collectionMenu = document.querySelector("#collectionMenu");
const packGrid = document.querySelector("#packGrid");
const summonResults = document.querySelector("#summonResults");
const collectionList = document.querySelector("#collectionList");
const collectionCount = document.querySelector("#collectionCount");
const monsterCount = document.querySelector("#monsterCount");
const collectionSortField = document.querySelector("#collectionSortField");
const basicTickets = document.querySelector("#basicTickets");
const mysticTickets = document.querySelector("#mysticTickets");
const homeScene = document.querySelector("#homeScene");
const navSummonButton = document.querySelector("#navSummon");
const navCollectionButton = document.querySelector("#navCollection");
const mainMenu = document.querySelector(".main-menu");
const layoutEntries = [...document.querySelectorAll("[data-layout-id]")];
let layoutEditor = null;
let toggleLayoutEditButton = null;
let saveLayoutButton = null;
let layoutStatus = null;
let addTextBoxButton = null;
let deleteTextBoxButton = null;
let textBoxTextInput = null;
let textBoxColorInput = null;
let textBoxSizeInput = null;
let textBoxWeightInput = null;
let textBoxAlignInput = null;

function getRarity(stars) {
  return rarities.find((rarity) => rarity.stars === stars);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundLayoutValue(value) {
  return Math.round(value * 100) / 100;
}

function getRootFontSize() {
  return Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
}

function createLayoutEditor() {
  layoutEditor = document.createElement("aside");
  layoutEditor.className = "layout-editor";
  layoutEditor.id = "layoutEditor";
  layoutEditor.setAttribute("aria-label", "Layout editor");
  layoutEditor.innerHTML = `
    <button type="button" id="toggleLayoutEdit" aria-pressed="false">Edit Layout</button>
    <button type="button" id="addTextBox">Add Text</button>
    <button type="button" id="deleteTextBox" disabled>Delete Text</button>
    <label>
      <span>Text</span>
      <input id="textBoxText" type="text" disabled />
    </label>
    <label>
      <span>Color</span>
      <input id="textBoxColor" type="color" value="#fff3c6" disabled />
    </label>
    <label>
      <span>Size</span>
      <input id="textBoxSize" type="number" min="10" max="72" step="1" disabled />
    </label>
    <label>
      <span>Weight</span>
      <select id="textBoxWeight" disabled>
        <option value="500">Regular</option>
        <option value="700">Bold</option>
        <option value="900">Heavy</option>
      </select>
    </label>
    <label>
      <span>Align</span>
      <select id="textBoxAlign" disabled>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </label>
    <button type="button" id="saveLayout" disabled>Save</button>
    <span id="layoutStatus">Layout ready</span>
  `;
  homeScene.append(layoutEditor);

  toggleLayoutEditButton = layoutEditor.querySelector("#toggleLayoutEdit");
  addTextBoxButton = layoutEditor.querySelector("#addTextBox");
  deleteTextBoxButton = layoutEditor.querySelector("#deleteTextBox");
  textBoxTextInput = layoutEditor.querySelector("#textBoxText");
  textBoxColorInput = layoutEditor.querySelector("#textBoxColor");
  textBoxSizeInput = layoutEditor.querySelector("#textBoxSize");
  textBoxWeightInput = layoutEditor.querySelector("#textBoxWeight");
  textBoxAlignInput = layoutEditor.querySelector("#textBoxAlign");
  saveLayoutButton = layoutEditor.querySelector("#saveLayout");
  layoutStatus = layoutEditor.querySelector("#layoutStatus");
}

function setLayoutStatus(message) {
  if (!layoutStatus) return;

  layoutStatus.textContent = message;
}

function getSavedLayout() {
  return {
    buttons: layoutState.buttons,
    textBoxes: layoutState.textBoxes,
  };
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function normalizeButtonLayout(rawButtons) {
  const buttons = structuredClone(defaultButtonLayout);

  Object.entries(buttons).forEach(([id, fallback]) => {
    const item = rawButtons?.[id];

    if (!isObject(item)) return;

    buttons[id] = {
      x: Number.isFinite(item.x) ? item.x : fallback.x,
      y: Number.isFinite(item.y) ? item.y : fallback.y,
      w: Number.isFinite(item.w) ? item.w : fallback.w,
      h: Number.isFinite(item.h) ? item.h : fallback.h,
      labelY: Number.isFinite(item.labelY) ? item.labelY : fallback.labelY,
    };
  });

  return buttons;
}

function normalizeTextBox(item, index = 0) {
  if (!isObject(item)) return null;

  return {
    id: String(item.id || `text-${Date.now()}-${index}`),
    text: String(item.text || "New text"),
    x: Number.isFinite(item.x) ? item.x : 50,
    y: Number.isFinite(item.y) ? item.y : 45,
    w: Number.isFinite(item.w) ? item.w : 12,
    h: Number.isFinite(item.h) ? item.h : 3,
    color: /^#[0-9a-f]{6}$/i.test(item.color) ? item.color : "#fff3c6",
    fontSize: Number.isFinite(item.fontSize) ? clamp(item.fontSize, 10, 72) : 22,
    fontWeight: ["500", "700", "900"].includes(String(item.fontWeight)) ? String(item.fontWeight) : "900",
    align: ["left", "center", "right"].includes(item.align) ? item.align : "center",
  };
}

function normalizeLayout(rawLayout) {
  const usesStructuredLayout = isObject(rawLayout?.buttons) || Array.isArray(rawLayout?.textBoxes);
  const rawButtons = usesStructuredLayout ? rawLayout.buttons : rawLayout;
  const savedTextBoxes = Array.isArray(rawLayout?.textBoxes)
    ? rawLayout.textBoxes.map(normalizeTextBox).filter(Boolean)
    : [];
  const savedTextBoxIds = new Set(savedTextBoxes.map((textBox) => textBox.id));
  const defaultMissingTextBoxes = defaultTextBoxes
    .filter((textBox) => !savedTextBoxIds.has(textBox.id))
    .map(normalizeTextBox);

  return {
    buttons: normalizeButtonLayout(rawButtons),
    textBoxes: [...defaultMissingTextBoxes, ...savedTextBoxes],
  };
}

function setLayoutState(nextLayout) {
  layoutState = normalizeLayout(nextLayout);
  buttonLayout = layoutState.buttons;
}

function applyButtonLayout() {
  layoutEntries.forEach((entry) => {
    const layout = buttonLayout[entry.dataset.layoutId];

    if (!layout) return;

    entry.style.setProperty("--x", `${layout.x}%`);
    entry.style.setProperty("--y", `${layout.y}%`);
    entry.style.setProperty("--w", `${layout.w}rem`);
    entry.style.setProperty("--h", `${layout.h}rem`);
    entry.style.setProperty("--label-y", `${layout.labelY}rem`);
  });
}

function getTextBox(id) {
  return layoutState.textBoxes.find((textBox) => textBox.id === id);
}

function selectTextBox(id) {
  activeTextBoxId = id;

  document.querySelectorAll(".layout-text-box").forEach((element) => {
    element.classList.toggle("is-layout-target", element.dataset.textId === activeTextBoxId);
  });

  updateTextBoxControls();
}

function updateTextBoxControls() {
  if (!textBoxTextInput) return;

  const textBox = getTextBox(activeTextBoxId);
  const hasSelection = Boolean(textBox);

  deleteTextBoxButton.disabled = !hasSelection;
  textBoxTextInput.disabled = !hasSelection;
  textBoxColorInput.disabled = !hasSelection;
  textBoxSizeInput.disabled = !hasSelection;
  textBoxWeightInput.disabled = !hasSelection;
  textBoxAlignInput.disabled = !hasSelection;

  textBoxTextInput.value = textBox?.text || "";
  textBoxColorInput.value = textBox?.color || "#fff3c6";
  textBoxSizeInput.value = textBox?.fontSize || 22;
  textBoxWeightInput.value = textBox?.fontWeight || "900";
  textBoxAlignInput.value = textBox?.align || "center";
}

function renderTextBoxes() {
  mainMenu.querySelectorAll(".layout-text-box").forEach((element) => element.remove());

  layoutState.textBoxes.forEach((textBox) => {
    const element = document.createElement("div");

    element.className = "layout-text-box";
    element.dataset.textId = textBox.id;
    element.textContent = textBox.text;
    element.style.setProperty("--x", `${textBox.x}%`);
    element.style.setProperty("--y", `${textBox.y}%`);
    element.style.setProperty("--w", `${textBox.w}rem`);
    element.style.setProperty("--h", `${textBox.h}rem`);
    element.style.setProperty("--text-color", textBox.color);
    element.style.setProperty("--font-size", `${textBox.fontSize}px`);
    element.style.setProperty("--font-weight", textBox.fontWeight);
    element.style.setProperty("--text-align", textBox.align);
    element.classList.toggle("is-layout-target", textBox.id === activeTextBoxId);
    mainMenu.append(element);
  });

  if (activeTextBoxId && !getTextBox(activeTextBoxId)) {
    activeTextBoxId = null;
  }

  updateTextBoxControls();
}

function applyLayout() {
  applyButtonLayout();
  renderTextBoxes();
}

async function loadButtonLayout() {
  try {
    const savedLocalLayout = localStorage.getItem("cardGameLayoutDraft");

    if (savedLocalLayout) {
      setLayoutState(JSON.parse(savedLocalLayout));
      setLayoutStatus("Loaded local draft");
    }

    const response = await fetch(`layout.json?v=${Date.now()}`, { cache: "no-store" });

    if (response.ok) {
      setLayoutState(await response.json());
      localStorage.removeItem("cardGameLayoutDraft");
      setLayoutStatus("Layout loaded");
    }
  } catch {
    setLayoutStatus("Using default layout");
  }

  applyLayout();
}

function setLayoutDirty(isDirty) {
  if (!saveLayoutButton) return;

  saveLayoutButton.disabled = !isDirty;
}

function persistLocalLayoutDraft() {
  localStorage.setItem("cardGameLayoutDraft", JSON.stringify(getSavedLayout()));
}

async function sendLayout(endpoint) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(getSavedLayout()),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.ok === false) {
    throw new Error(result.error || "The layout server did not accept the save.");
  }

  return result;
}

async function saveLayoutToGitHub() {
  setLayoutStatus("Saving and pushing layout...");

  try {
    const result = await sendLayout("/api/layout/publish");
    localStorage.removeItem("cardGameLayoutDraft");
    setLayoutDirty(false);
    setLayoutStatus(result.message || "Saved and pushed to GitHub");
  } catch (error) {
    persistLocalLayoutDraft();
    setLayoutStatus(`Save failed: ${error.message}. Draft saved locally.`);
    console.warn(error);
  }
}

function setLayoutEditing(nextValue) {
  isLayoutEditing = nextValue;
  homeScene.classList.toggle("layout-editing", isLayoutEditing);
  toggleLayoutEditButton.setAttribute("aria-pressed", String(isLayoutEditing));
  toggleLayoutEditButton.textContent = isLayoutEditing ? "Done" : "Edit Layout";
  setLayoutStatus(isLayoutEditing ? "Drag buttons. Pull lower-right corner to resize." : "Layout ready");
}

function getLayoutAction(entry, clientX, clientY) {
  const rect = entry.getBoundingClientRect();
  const isResize =
    clientX >= rect.right - Math.max(24, rect.width * 0.22) && clientY >= rect.bottom - Math.max(24, rect.height * 0.22);

  return isResize ? "resize" : "move";
}

function markLayoutDirty(message = "Unsaved layout changes") {
  applyLayout();
  persistLocalLayoutDraft();
  setLayoutDirty(true);
  setLayoutStatus(message);
}

function createTextBox() {
  const textBox = normalizeTextBox({
    id: `text-${Date.now()}`,
    text: "New text",
    x: 50,
    y: 42,
    w: 12,
    h: 3,
    color: "#fff3c6",
    fontSize: 22,
    fontWeight: "900",
    align: "center",
  });

  layoutState.textBoxes.push(textBox);
  selectTextBox(textBox.id);
  markLayoutDirty("Added text box");
}

function deleteSelectedTextBox() {
  if (!activeTextBoxId) return;

  layoutState.textBoxes = layoutState.textBoxes.filter((textBox) => textBox.id !== activeTextBoxId);
  activeTextBoxId = null;
  markLayoutDirty("Deleted text box");
}

function updateSelectedTextBox(changes) {
  const textBox = getTextBox(activeTextBoxId);

  if (!textBox) return;

  Object.assign(textBox, changes);
  markLayoutDirty("Unsaved text changes");
}

function startLayoutDrag(event) {
  const textBoxElement = event.target.closest(".layout-text-box");
  const entry = event.target.closest("[data-layout-id]");

  if (!isLayoutEditing || (!entry && !textBoxElement)) return;

  event.preventDefault();
  event.stopPropagation();

  const targetElement = textBoxElement || entry;
  const item = textBoxElement ? getTextBox(textBoxElement.dataset.textId) : buttonLayout[entry.dataset.layoutId];
  const entryRect = targetElement.getBoundingClientRect();

  if (!item) return;

  if (textBoxElement) {
    selectTextBox(textBoxElement.dataset.textId);
  } else {
    selectTextBox(null);
  }

  activeLayoutDrag = {
    action: getLayoutAction(targetElement, event.clientX, event.clientY),
    entry: targetElement,
    kind: textBoxElement ? "text" : "button",
    id: textBoxElement ? textBoxElement.dataset.textId : entry.dataset.layoutId,
    startX: event.clientX,
    startY: event.clientY,
    startLayout: { ...item },
    startWidth: entryRect.width,
    startHeight: entryRect.height,
  };

  entry.classList.add("is-layout-target");
  entry.setPointerCapture(event.pointerId);
}

function updateLayoutDrag(event) {
  if (!activeLayoutDrag) return;

  event.preventDefault();

  const layout =
    activeLayoutDrag.kind === "text" ? getTextBox(activeLayoutDrag.id) : buttonLayout[activeLayoutDrag.id];
  const menuRect = mainMenu.getBoundingClientRect();

  if (!layout) return;

  if (activeLayoutDrag.action === "move") {
    layout.x = roundLayoutValue(clamp(((event.clientX - menuRect.left) / menuRect.width) * 100, 5, 95));
    layout.y = roundLayoutValue(clamp(((event.clientY - menuRect.top) / menuRect.height) * 100, 5, 95));
  } else {
    const rootFontSize = getRootFontSize();
    layout.w = roundLayoutValue(clamp((activeLayoutDrag.startWidth + event.clientX - activeLayoutDrag.startX) / rootFontSize, 4, 18));
    layout.h = roundLayoutValue(clamp((activeLayoutDrag.startHeight + event.clientY - activeLayoutDrag.startY) / rootFontSize, 4, 18));
  }

  markLayoutDirty();
}

function stopLayoutDrag(event) {
  if (!activeLayoutDrag) return;

  activeLayoutDrag.entry.classList.remove("is-layout-target");
  activeLayoutDrag.entry.releasePointerCapture(event.pointerId);
  activeLayoutDrag = null;
}

function getMaxLevelForStars(stars) {
  return stars * 5 + 10;
}

function weightedPick(options) {
  const total = options.reduce((sum, option) => sum + option.weight, 0);
  let roll = Math.random() * total;

  for (const option of options) {
    roll -= option.weight;
    if (roll <= 0) return option;
  }

  return options[options.length - 1];
}

function getAttributeRelation(attackerElement, defenderElement) {
  const attacker = elements[attackerElement];

  if (!attacker || attackerElement === defenderElement) return "neutral";
  if (attacker.beats === defenderElement) return "advantage";
  if (attacker.weakTo === defenderElement) return "disadvantage";
  return "neutral";
}

function getCombatModifiers(attackerElement, defenderElement) {
  const relation = getAttributeRelation(attackerElement, defenderElement);

  if (relation === "advantage") {
    return { relation, critChanceBonus: 0.15, effectAccuracyBonus: 0.15 };
  }

  if (relation === "disadvantage") {
    return { relation, critChanceBonus: -0.15, effectAccuracyBonus: -0.15 };
  }

  return { relation, critChanceBonus: 0, effectAccuracyBonus: 0 };
}

function calculateFinalMaxStats(template) {
  const naturalOriginBonus = 1 + (template.naturalStars - 1) * 0.025;
  const rareElementBonus = elements[template.element].isRare ? 1.035 : 1;
  const totalMultiplier = naturalOriginBonus * rareElementBonus * FINAL_MAX_STAT_SCALE;

  return {
    hp: Math.round(template.hp * totalMultiplier),
    atk: Math.round(template.atk * totalMultiplier),
    def: Math.round(template.def * totalMultiplier),
    spd: Math.round(template.spd * naturalOriginBonus),
  };
}

function getStatProgressPercent(stars, level) {
  const targetStars = clamp(stars, 1, MAX_UPGRADE_STARS);
  const targetLevel = clamp(level, 1, getMaxLevelForStars(targetStars));
  return STAR_STAT_PERCENT_BY_STARS[targetStars] + (targetLevel - 1) * LEVEL_STAT_PERCENT;
}

function calculateProjectedStats(template, targetStars = MAX_UPGRADE_STARS, targetLevel = 40) {
  const finalMaxStats = calculateFinalMaxStats(template);
  const statProgressMultiplier = getStatProgressPercent(targetStars, targetLevel) / 100;

  return {
    hp: Math.round(finalMaxStats.hp * statProgressMultiplier),
    atk: Math.round(finalMaxStats.atk * statProgressMultiplier),
    def: Math.round(finalMaxStats.def * statProgressMultiplier),
    spd: finalMaxStats.spd,
  };
}

function getSummonTemplate(stars, element) {
  const exactPool = creatureTemplates.filter((creature) => creature.naturalStars === stars && creature.element === element);

  if (exactPool.length) {
    return weightedPick(exactPool.map((creature) => ({ ...creature, weight: 1 })));
  }

  const sameStarPool = creatureTemplates.filter((creature) => creature.naturalStars === stars);
  const baseTemplate = weightedPick(sameStarPool.map((creature) => ({ ...creature, weight: 1 })));
  const elementName = elements[element].label;

  return {
    ...baseTemplate,
    name: `${elementName} ${baseTemplate.name}`,
    element,
  };
}

function createCardInstance(template) {
  const currentStars = template.naturalStars;
  const level = 1;
  const maxLevel = getMaxLevelForStars(currentStars);
  const currentStats = calculateProjectedStats(template, currentStars, level);
  const finalMaxStats = calculateFinalMaxStats(template);

  return {
    id: crypto.randomUUID(),
    name: template.name,
    archetype: template.archetype,
    element: template.element,
    naturalStars: template.naturalStars,
    currentStars,
    maxStars: MAX_UPGRADE_STARS,
    level,
    maxLevel,
    baseStats: {
      hp: template.hp,
      atk: template.atk,
      def: template.def,
      spd: template.spd,
    },
    currentStats,
    projectedMaxStats: finalMaxStats,
    skills: [],
    art: null,
    canAwaken: true,
  };
}

function summonFromPack(pack, packCount = 1) {
  const totalCost = pack.cost * packCount;

  if (playerState[pack.ticket] < totalCost) return [];

  playerState[pack.ticket] -= totalCost;

  const pulls = Array.from({ length: pack.summons * packCount }, () => {
    const stars = weightedPick(pack.naturalStarOdds).stars;
    const element = weightedPick(pack.elementOdds).element;
    const template = getSummonTemplate(stars, element);
    return createCardInstance(template);
  });

  playerState.collection.push(...pulls);
  renderResources();
  renderPacks();
  renderResults(pulls);
  renderCollection();
  return pulls;
}

function renderResources() {
  basicTickets.textContent = `Basic Tickets: ${playerState.basicTickets}`;
  mysticTickets.textContent = `Mystic Tickets: ${playerState.mysticTickets}`;
  collectionCount.textContent = `Collection: ${playerState.collection.length}`;
  monsterCount.textContent = `Monsters: ${playerState.collection.length}`;
}

function renderPacks() {
  const bulkOptions = [1, 10, 100];

  packGrid.innerHTML = packs
    .map((pack) => {
      const odds = pack.naturalStarOdds.map((odd) => `${odd.stars}*: ${odd.weight}%`).join(" / ");
      const buttons = bulkOptions
        .map((packCount) => {
          const totalCost = pack.cost * packCount;
          const totalCards = pack.summons * packCount;
          const canAfford = playerState[pack.ticket] >= totalCost;

          return `
            <button type="button" data-pack="${pack.id}" data-count="${packCount}" ${canAfford ? "" : "disabled"}>
              ${canAfford ? `Open ${packCount}` : `Need ${totalCost}`}
              <span>${totalCards} card${totalCards > 1 ? "s" : ""}</span>
            </button>
          `;
        })
        .join("");

      return `
        <article class="pack" style="--pack-accent: ${pack.id === "wildling" ? "#42a66a" : "#b489ff"}">
          <div>
            <p class="eyebrow">${pack.summons} summon${pack.summons > 1 ? "s" : ""}</p>
            <h3>${pack.name}</h3>
            <p>${pack.note}</p>
          </div>
          <dl>
            <div><dt>Natural Grade</dt><dd>${odds}</dd></div>
            <div><dt>Elements</dt><dd>Fire, Water, Wind, rare Light/Dark</dd></div>
          </dl>
          <div class="pack-actions">${buttons}</div>
        </article>
      `;
    })
    .join("");

  packGrid.querySelectorAll("button[data-pack]").forEach((button) => {
    button.addEventListener("click", () => {
      const pack = packs.find((item) => item.id === button.dataset.pack);
      summonFromPack(pack, Number(button.dataset.count));
    });
  });
}

function renderResults(cards) {
  if (!cards.length) {
    summonResults.innerHTML = `<p class="empty-state">Not enough tickets for that pack.</p>`;
    return;
  }

  summonResults.innerHTML = cards.map(renderCard).join("");
}

function getSortValue(card, field) {
  if (field === "element") return elements[card.element].label;
  if (field === "naturalStars") return card.naturalStars;
  if (field === "level") return card.level;
  return card.currentStats[field];
}

function sortCards(cards) {
  const directionMultiplier = collectionSort.direction === "asc" ? 1 : -1;

  return [...cards].sort((firstCard, secondCard) => {
    const firstValue = getSortValue(firstCard, collectionSort.field);
    const secondValue = getSortValue(secondCard, collectionSort.field);

    if (typeof firstValue === "string" && typeof secondValue === "string") {
      const elementOrder = ["Fire", "Water", "Wind", "Light", "Dark"];
      const firstIndex = elementOrder.indexOf(firstValue);
      const secondIndex = elementOrder.indexOf(secondValue);
      return (firstIndex - secondIndex) * directionMultiplier || firstCard.name.localeCompare(secondCard.name);
    }

    return (firstValue - secondValue) * directionMultiplier || firstCard.name.localeCompare(secondCard.name);
  });
}

function renderCollection() {
  renderResources();

  if (!playerState.collection.length) {
    collectionList.innerHTML = `<p class="empty-state">Summoned monsters will appear here.</p>`;
    return;
  }

  collectionList.innerHTML = sortCards(playerState.collection).map(renderCard).join("");
}

function renderCard(card) {
  const element = elements[card.element];
  const rarity = getRarity(card.naturalStars);
  const sampleTarget = card.element === "light" ? "dark" : "fire";
  const modifier = getCombatModifiers(card.element, sampleTarget);

  return `
    <article class="creature-card" style="--element-color: ${element.color}; --rarity-color: ${rarity.color}">
      <div class="card-visual" aria-hidden="true">
        <span class="creature-mark">${element.symbol}</span>
      </div>
      <div class="card-body">
        <div class="card-title">
          <h4>${card.name}</h4>
          <span>${rarity.short}</span>
        </div>
        <p>${element.label} ${card.archetype}</p>
        <div class="star-line" aria-label="Current star grade">${"★".repeat(card.currentStars)}${"☆".repeat(MAX_UPGRADE_STARS - card.currentStars)}</div>
        <dl class="stats">
          <div><dt>HP</dt><dd>${card.currentStats.hp}</dd></div>
          <div><dt>ATK</dt><dd>${card.currentStats.atk}</dd></div>
          <div><dt>DEF</dt><dd>${card.currentStats.def}</dd></div>
          <div><dt>SPD</dt><dd>${card.currentStats.spd}</dd></div>
        </dl>
        <p class="rules-note">Current ${card.currentStars}* Lv${card.level}/${card.maxLevel}. 6* Lv40 max: ${card.projectedMaxStats.hp} HP / ${card.projectedMaxStats.atk} ATK / ${card.projectedMaxStats.def} DEF. ${modifier.relation} vs ${elements[sampleTarget].label}.</p>
      </div>
    </article>
  `;
}

openSummonButton.addEventListener("click", () => {
  if (isLayoutEditing) return;
  summonMenu.setAttribute("aria-hidden", "false");
});

openCollectionButton.addEventListener("click", () => {
  if (isLayoutEditing) return;
  renderCollection();
  collectionMenu.setAttribute("aria-hidden", "false");
});

navSummonButton.addEventListener("click", () => {
  summonMenu.setAttribute("aria-hidden", "false");
});

navCollectionButton.addEventListener("click", () => {
  renderCollection();
  collectionMenu.setAttribute("aria-hidden", "false");
});

closeSummonButton.addEventListener("click", () => {
  summonMenu.setAttribute("aria-hidden", "true");
});

closeCollectionButton.addEventListener("click", () => {
  collectionMenu.setAttribute("aria-hidden", "true");
});

summonMenu.addEventListener("click", (event) => {
  if (event.target === summonMenu) {
    summonMenu.setAttribute("aria-hidden", "true");
  }
});

collectionMenu.addEventListener("click", (event) => {
  if (event.target === collectionMenu) {
    collectionMenu.setAttribute("aria-hidden", "true");
  }
});

collectionSortField.addEventListener("change", (event) => {
  collectionSort.field = event.target.value;
  renderCollection();
});

document.querySelectorAll("[data-sort-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    collectionSort.direction = button.dataset.sortDirection;
    document.querySelectorAll("[data-sort-direction]").forEach((directionButton) => {
      directionButton.classList.toggle("active", directionButton === button);
    });
    renderCollection();
  });
});

if (isLocalLayoutEditor) {
  createLayoutEditor();

  toggleLayoutEditButton.addEventListener("click", () => {
    setLayoutEditing(!isLayoutEditing);
  });

  saveLayoutButton.addEventListener("click", saveLayoutToGitHub);
  addTextBoxButton.addEventListener("click", createTextBox);
  deleteTextBoxButton.addEventListener("click", deleteSelectedTextBox);

  textBoxTextInput.addEventListener("input", (event) => {
    updateSelectedTextBox({ text: event.target.value });
  });

  textBoxColorInput.addEventListener("input", (event) => {
    updateSelectedTextBox({ color: event.target.value });
  });

  textBoxSizeInput.addEventListener("input", (event) => {
    updateSelectedTextBox({ fontSize: clamp(Number(event.target.value), 10, 72) });
  });

  textBoxWeightInput.addEventListener("change", (event) => {
    updateSelectedTextBox({ fontWeight: event.target.value });
  });

  textBoxAlignInput.addEventListener("change", (event) => {
    updateSelectedTextBox({ align: event.target.value });
  });

  mainMenu.addEventListener("pointerdown", startLayoutDrag);
  mainMenu.addEventListener("pointermove", updateLayoutDrag);
  mainMenu.addEventListener("pointerup", stopLayoutDrag);
  mainMenu.addEventListener("pointercancel", stopLayoutDrag);

  layoutEntries.forEach((entry) => {
    entry.addEventListener("click", (event) => {
      if (!isLayoutEditing) return;

      event.preventDefault();
      event.stopPropagation();
    });
  });
}

function updateSceneMotion(clientX, clientY) {
  const rect = homeScene.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width - 0.5;
  const y = (clientY - rect.top) / rect.height - 0.5;

  homeScene.style.setProperty("--scene-x", `${clamp(x * 18, -9, 9)}px`);
  homeScene.style.setProperty("--scene-y", `${clamp(y * 18, -9, 9)}px`);
}

homeScene.addEventListener("pointermove", (event) => {
  if (isLayoutEditing) return;
  updateSceneMotion(event.clientX, event.clientY);
});

homeScene.addEventListener("pointerleave", () => {
  homeScene.style.setProperty("--scene-x", "0px");
  homeScene.style.setProperty("--scene-y", "0px");
});

renderResources();
renderPacks();
renderCollection();
applyLayout();
loadButtonLayout();

window.cardGameSystem = {
  elements,
  rarities,
  packs,
  creatureTemplates,
  playerState,
  collectionSort,
  getAttributeRelation,
  getCombatModifiers,
  getMaxLevelForStars,
  getStatProgressPercent,
  calculateFinalMaxStats,
  calculateProjectedStats,
  sortCards,
  layoutState,
  buttonLayout,
  applyLayout,
};
