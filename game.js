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

const defaultLayout = {
  summoning: { x: 52, y: 78, w: 9.5, h: 8.5, labelY: 2.25 },
  monsters: { x: 23, y: 49, w: 10, h: 8.75, labelY: 2.4 },
  forge: { x: 72, y: 34, w: 10, h: 8.25, labelY: 2.35 },
  trials: { x: 72, y: 61, w: 8, h: 8, labelY: 2.25 },
};

let buttonLayout = structuredClone(defaultLayout);
let isLayoutEditing = false;
let activeLayoutDrag = null;

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
const toggleLayoutEditButton = document.querySelector("#toggleLayoutEdit");
const saveLayoutButton = document.querySelector("#saveLayout");
const publishLayoutButton = document.querySelector("#publishLayout");
const layoutStatus = document.querySelector("#layoutStatus");
const layoutEntries = [...document.querySelectorAll("[data-layout-id]")];

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

function setLayoutStatus(message) {
  layoutStatus.textContent = message;
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

async function loadButtonLayout() {
  try {
    const savedLocalLayout = localStorage.getItem("cardGameLayoutDraft");

    if (savedLocalLayout) {
      buttonLayout = { ...buttonLayout, ...JSON.parse(savedLocalLayout) };
      setLayoutStatus("Loaded local draft");
    }

    const response = await fetch("layout.json", { cache: "no-store" });

    if (response.ok) {
      buttonLayout = { ...buttonLayout, ...(await response.json()) };
      localStorage.removeItem("cardGameLayoutDraft");
      setLayoutStatus("Layout loaded");
    }
  } catch {
    setLayoutStatus("Using default layout");
  }

  applyButtonLayout();
}

function setLayoutDirty(isDirty) {
  saveLayoutButton.disabled = !isDirty;
  publishLayoutButton.disabled = !isDirty;
}

function persistLocalLayoutDraft() {
  localStorage.setItem("cardGameLayoutDraft", JSON.stringify(buttonLayout));
}

async function sendLayout(endpoint) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(buttonLayout),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.ok === false) {
    throw new Error(result.error || "The layout server did not accept the save.");
  }

  return result;
}

async function saveLayoutToRepo() {
  setLayoutStatus("Saving layout...");

  try {
    await sendLayout("/api/layout");
    localStorage.removeItem("cardGameLayoutDraft");
    setLayoutDirty(false);
    setLayoutStatus("Saved to layout.json");
  } catch (error) {
    persistLocalLayoutDraft();
    setLayoutStatus("Draft saved locally. Start dev-server.mjs to write repo.");
    console.warn(error);
  }
}

async function publishLayoutToGitHub() {
  setLayoutStatus("Publishing layout...");

  try {
    const result = await sendLayout("/api/layout/publish");
    localStorage.removeItem("cardGameLayoutDraft");
    setLayoutDirty(false);
    setLayoutStatus(result.message || "Pushed to GitHub");
  } catch (error) {
    persistLocalLayoutDraft();
    setLayoutStatus("Publish failed. Draft saved locally.");
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

function startLayoutDrag(event) {
  const entry = event.target.closest("[data-layout-id]");

  if (!isLayoutEditing || !entry) return;

  event.preventDefault();
  event.stopPropagation();

  const item = buttonLayout[entry.dataset.layoutId];
  const entryRect = entry.getBoundingClientRect();

  activeLayoutDrag = {
    action: getLayoutAction(entry, event.clientX, event.clientY),
    entry,
    id: entry.dataset.layoutId,
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

  const layout = buttonLayout[activeLayoutDrag.id];
  const menuRect = mainMenu.getBoundingClientRect();

  if (activeLayoutDrag.action === "move") {
    layout.x = roundLayoutValue(clamp(((event.clientX - menuRect.left) / menuRect.width) * 100, 5, 95));
    layout.y = roundLayoutValue(clamp(((event.clientY - menuRect.top) / menuRect.height) * 100, 5, 95));
  } else {
    const rootFontSize = getRootFontSize();
    layout.w = roundLayoutValue(clamp((activeLayoutDrag.startWidth + event.clientX - activeLayoutDrag.startX) / rootFontSize, 4, 18));
    layout.h = roundLayoutValue(clamp((activeLayoutDrag.startHeight + event.clientY - activeLayoutDrag.startY) / rootFontSize, 4, 18));
  }

  applyButtonLayout();
  persistLocalLayoutDraft();
  setLayoutDirty(true);
  setLayoutStatus("Unsaved layout changes");
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

toggleLayoutEditButton.addEventListener("click", () => {
  setLayoutEditing(!isLayoutEditing);
});

saveLayoutButton.addEventListener("click", saveLayoutToRepo);
publishLayoutButton.addEventListener("click", publishLayoutToGitHub);

layoutEntries.forEach((entry) => {
  entry.addEventListener("pointerdown", startLayoutDrag);
  entry.addEventListener("pointermove", updateLayoutDrag);
  entry.addEventListener("pointerup", stopLayoutDrag);
  entry.addEventListener("pointercancel", stopLayoutDrag);
  entry.addEventListener("click", (event) => {
    if (!isLayoutEditing) return;

    event.preventDefault();
    event.stopPropagation();
  });
});

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
applyButtonLayout();
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
  buttonLayout,
  applyButtonLayout,
};
