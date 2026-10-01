/**
 * LUMEZA CYBER-ARCADE // CORE JAVASCRIPT
 * games.lumeza.in
 */

// 1. Toast Notification System
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('portalToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, duration);
}

// 2. Hidden Switch to Main Website (Crafted Soul)
// Accessed by clicking the discreet top right glyph, or pressing Ctrl+Shift+H
const MAIN_SITE_URL = 'https://craftedsoul.netlify.app';

function openSecretSwitchModal() {
  const modal = document.getElementById('secretSwitchModal');
  if (modal) modal.classList.add('open');
}

function closeSecretSwitchModal() {
  const modal = document.getElementById('secretSwitchModal');
  if (modal) modal.classList.remove('open');
}

function executeSecretRedirect() {
  showToast('⚡ Redirecting to Crafted Soul Core Workspace...');
  setTimeout(() => {
    window.location.href = MAIN_SITE_URL;
  }, 400);
}

// Global hotkey: Ctrl + Shift + H
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'H' || e.key === 'h')) {
    e.preventDefault();
    openSecretSwitchModal();
  }
});

// 3. Immersive Game Modal Launcher
function launchGameModal(title, url) {
  const modal = document.getElementById('gameModalOverlay');
  const frame = document.getElementById('gameModalIframe');
  const titleEl = document.getElementById('modalGameTitle');

  if (!modal || !frame) return;

  titleEl.textContent = title;
  frame.src = url;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGameModal() {
  const modal = document.getElementById('gameModalOverlay');
  const frame = document.getElementById('gameModalIframe');

  if (!modal || !frame) return;

  frame.src = 'about:blank';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function toggleModalFullscreen() {
  const modal = document.getElementById('gameModalOverlay');
  if (!modal) return;
  const doc = document;
  const isFs = !!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
  
  if (!isFs) {
    const req = modal.requestFullscreen || modal.webkitRequestFullscreen || modal.mozRequestFullScreen || modal.msRequestFullscreen;
    if (req) {
      req.call(modal).catch(err => {
        console.warn('Modal fullscreen request failed:', err);
      });
    }
  } else {
    const exit = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
    if (exit) exit.call(doc);
  }
}

function updateModalFsButtonText() {
  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  const btn = document.querySelector('#gameModalOverlay .btn-modal-action[onclick*="toggleModalFullscreen"]');
  if (btn) {
    btn.textContent = isFs ? 'EXIT FULL' : '⛶ FULLSCREEN';
  }
}
document.addEventListener('fullscreenchange', updateModalFsButtonText);
document.addEventListener('webkitfullscreenchange', updateModalFsButtonText);

window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('gameModalOverlay');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'F4' || (e.altKey && e.key === 'Enter')) {
      e.preventDefault();
      toggleModalFullscreen();
    } else if (e.key === 'Escape') {
      // If not in native fullscreen, close modal
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        closeGameModal();
      }
    }
  }
});

// 4. Standalone Popout Window
function launchPopoutWindow(url, title = 'LumezaGameWindow') {
  window.open(url, title, 'width=1280,height=800,menubar=no,toolbar=no,location=no,status=no,resizable=yes');
  showToast('⚡ Game launched in dedicated popout window!');
}

// 5. Vice City Specific Helpers
const VICE_CITY_URL = '/vicecity/?custom_saves=1';
const VICE_CITY_MODAL_URL = '/vicecity/?custom_saves=1&embed=1';

function launchViceCityModal() {
  launchGameModal('🌴 GTA: Vice City (1986 Miami Edition)', VICE_CITY_MODAL_URL);
}

function launchViceCityPopout() {
  launchPopoutWindow(VICE_CITY_URL, 'ViceCity_Miami_Edition');
}

function copyCheat(code, btn) {
  navigator.clipboard.writeText(code).then(() => {
    btn.classList.add('copied');
    const orig = btn.innerHTML;
    btn.innerHTML = `${code} <span>COPIED!</span>`;
    showToast(`⚡ Cheat "${code}" copied! Press F3 or type it in game.`);
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = orig;
    }, 1500);
  });
}


// --- STRATEGY & PHASE 4 LAUNCHERS ---
function launchCaesar3Modal() {
  launchGameModal('🏛️ Caesar III: Empire of Rome (Julius WASM)', '/caesar3/');
}
function launchCaesar3Popout() {
  launchPopoutWindow('/caesar3/', 'Caesar3_Imperium');
}

// --- PHASE 3 LAUNCHERS ---
function launchDiabloModal() {
  launchGameModal('⚔️ Diablo 1 + Hellfire (DevilutionX)', '/diablo/');
}
function launchDiabloPopout() {
  launchPopoutWindow('/diablo/', 'Diablo1_Web');
}

function launchTombRaiderModal() {
  launchGameModal('🏛️ Tomb Raider (OpenLara 3D)', '/tombraider/');
}
function launchTombRaiderPopout() {
  launchPopoutWindow('/tombraider/', 'TombRaider_OpenLara');
}

function launchHalfLifeModal() {
  launchGameModal('λ Half-Life 1 Campaign (Black Mesa)', '/halflife/');
}
function launchHalfLifePopout() {
  launchPopoutWindow('/halflife/', 'HalfLife_Campaign');
}

function launchHexGLModal() {
  launchGameModal('🏎️ HexGL 3D Anti-Gravity Racer', '/arcade/hexgl/');
}
function launchHexGLPopout() {
  launchPopoutWindow('/arcade/hexgl/', 'HexGL_Racer');
}


// --- WINDOWS 7 CLASSICS LAUNCHERS ---
function launchComfyCakesModal() {
  launchGameModal('🎂 Purble Place: Comfy Cakes (The Cake Factory)', '/win7/comfy-cakes/');
}
function launchComfyCakesPopout() {
  launchPopoutWindow('/win7/comfy-cakes/', 'ComfyCakes_Win7');
}

function launchPurblePlaceModal() {
  launchGameModal('🏘️ Purble Place (Full 3-in-1 Game Suite)', '/win7/purble-place/');
}
function launchPurblePlacePopout() {
  launchPopoutWindow('/win7/purble-place/', 'PurblePlace_Win7');
}

function launchSpiderSolitaireModal() {
  launchGameModal('🕷️ Windows 7 Spider Solitaire (Multi-Suit)', '/win7/cards/?game=spider');
}
function launchSpiderSolitairePopout() {
  launchPopoutWindow('/win7/cards/?game=spider', 'SpiderSolitaire_Win7');
}

function launchFreecellModal() {
  launchGameModal('🃏 Windows 7 FreeCell', '/win7/cards/?game=freecell');
}
function launchFreecellPopout() {
  launchPopoutWindow('/win7/cards/?game=freecell', 'FreeCell_Win7');
}


function launchSpaceCadetPinballModal() {
  launchGameModal('🚀 3D Space Cadet Pinball (WASM)', '/win7/pinball/');
}
function launchSpaceCadetPinballPopout() {
  launchPopoutWindow('/win7/pinball/', 'SpaceCadetPinball');
}

function launchWin7MinesweeperModal() {
  launchGameModal('💣 Windows 7 Minesweeper', '/win7/minesweeper/');
}
function launchWin7MinesweeperPopout() {
  launchPopoutWindow('/win7/minesweeper/', 'Win7_Minesweeper');
}

function launchWin7SolitaireModal() {
  launchGameModal('🃏 Windows 7 Solitaire (Klondike)', '/win7/solitaire/');
}
function launchWin7SolitairePopout() {
  launchPopoutWindow('/win7/solitaire/', 'Win7_Solitaire');
}

// 6. CS 1.6 Specific Helpers
function launchCS16Modal() {
  launchGameModal('🎯 Counter-Strike 1.6 (WebAssembly Edition)', '/cs16/');
}

function launchCS16Popout() {
  launchPopoutWindow('/cs16/', 'CounterStrike_16_WASM');
}

// 7. Quake & Doom Helpers (100% Native on VPS)
function launchQuake3Modal() {
  launchGameModal('⚡ Quake (1996 Classic)', '/quake/');
}

function launchQuake3Popout() {
  launchPopoutWindow('/quake/', 'Quake_1996_Classic');
}

function launchDoomModal() {
  launchGameModal('💀 DOOM (1993 Classic)', '/doom/');
}

function launchDoomPopout() {
  launchPopoutWindow('/doom/', 'DOOM_1993_Classic');
}

// 8. Category Filter
function filterGames(category, btn) {
  document.querySelectorAll('.nav-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const searchInput = document.getElementById('gameSearchInput');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    const countBadge = document.getElementById('searchResultCount');
    if (countBadge) countBadge.style.display = 'none';
  }

  const tiles = originalTiles || Array.from(document.querySelectorAll('.game-tile'));
  tiles.forEach(tile => {
    const cats = (tile.getAttribute('data-category') || '').split(' ');
    if (category === 'all' || cats.includes(category)) {
      tile.style.display = 'flex';
    } else {
      tile.style.display = 'none';
    }
  });

  // Handle shelf category rows if shelf layout is active
  if (document.documentElement.getAttribute('data-layout') === 'shelf') {
    document.querySelectorAll('.shelf-category-row').forEach(row => {
      const shelfCat = row.getAttribute('data-shelf-cat') || '';
      if (category === 'all' || shelfCat === category || (category === 'retrox' && shelfCat === 'strategy')) {
        row.style.display = 'flex';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // Handle hero vice city visibility
  const hero = document.getElementById('heroViceCity');
  if (hero) {
    if (category === 'all' || category === 'openworld' || category === 'vicecity') {
      hero.style.display = 'block';
    } else {
      hero.style.display = 'none';
    }
  }

  // Handle retro arcade panel visibility
  const retroPanel = document.getElementById('retroArcadePanel');
  if (retroPanel) {
    if (category === 'all' || category === 'arcade' || category === 'retrox') {
      retroPanel.style.display = 'block';
    } else {
      retroPanel.style.display = 'none';
    }
  }
}

// 9. Retro Games: Snake, 2048, Minesweeper Engine
let currentRetroGame = '2048';

function switchRetroGame(game) {
  currentRetroGame = game;
  document.querySelectorAll('.arcade-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-game') === game);
  });

  document.querySelectorAll('.retro-game-view').forEach(v => {
    v.style.display = v.id === `view-${game}` ? 'block' : 'none';
  });

  if (game === 'snake') startSnakeGame();
}

// --- SNAKE GAME IMPLEMENTATION ---
let snakeCanvas, snakeCtx, snakeLoop;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1, dy = 0;
let snakeScore = 0;

function startSnakeGame() {
  snakeCanvas = document.getElementById('snakeCanvas');
  if (!snakeCanvas) return;
  snakeCtx = snakeCanvas.getContext('2d');
  snake = [{ x: 10, y: 10 }];
  dx = 1; dy = 0;
  snakeScore = 0;
  document.getElementById('snakeScore').textContent = '0';
  spawnFood();
  if (snakeLoop) clearInterval(snakeLoop);
  snakeLoop = setInterval(updateSnake, 100);
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };
}

function updateSnake() {
  if (!snakeCtx) return;
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wall collisions (wrap around)
  if (head.x < 0) head.x = 19;
  if (head.x >= 20) head.x = 0;
  if (head.y < 0) head.y = 19;
  if (head.y >= 20) head.y = 0;

  // Self collision
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      startSnakeGame();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    snakeScore += 10;
    document.getElementById('snakeScore').textContent = snakeScore;
    spawnFood();
  } else {
    snake.pop();
  }

  // Draw
  snakeCtx.fillStyle = '#06080d';
  snakeCtx.fillRect(0, 0, 400, 400);

  // Food
  snakeCtx.fillStyle = '#ff2a85';
  snakeCtx.shadowColor = '#ff2a85';
  snakeCtx.shadowBlur = 10;
  snakeCtx.fillRect(food.x * 20 + 2, food.y * 20 + 2, 16, 16);

  // Snake
  snakeCtx.fillStyle = '#00f0ff';
  snakeCtx.shadowColor = '#00f0ff';
  snakeCtx.shadowBlur = 8;
  snake.forEach((part, idx) => {
    if (idx === 0) snakeCtx.fillStyle = '#fff';
    else snakeCtx.fillStyle = '#00f0ff';
    snakeCtx.fillRect(part.x * 20 + 1, part.y * 20 + 1, 18, 18);
  });
  snakeCtx.shadowBlur = 0;
}

window.addEventListener('keydown', (e) => {
  if (currentRetroGame !== 'snake') return;
  if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; e.preventDefault(); }
  if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; e.preventDefault(); }
  if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; e.preventDefault(); }
  if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; e.preventDefault(); }
});

// --- 2048 GAME IMPLEMENTATION ---
let board2048 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
let score2048 = 0;

function init2048() {
  board2048 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  score2048 = 0;
  document.getElementById('score2048').textContent = '0';
  addRandomTile2048();
  addRandomTile2048();
  render2048();
}

function addRandomTile2048() {
  const empty = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board2048[r][c] === 0) empty.push({ r, c });
    }
  }
  if (empty.length > 0) {
    const { r, c } = empty[Math.floor(Math.random() * empty.length)];
    board2048[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
}

function render2048() {
  const container = document.getElementById('board2048Grid');
  if (!container) return;
  container.innerHTML = '';
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const val = board2048[r][c];
      const tile = document.createElement('div');
      tile.className = `tile-2048 val-${val}`;
      tile.textContent = val > 0 ? val : '';
      container.appendChild(tile);
    }
  }
}

function move2048(direction) {
  let moved = false;
  // Standard 2048 slide & merge algorithm
  const slide = (row) => {
    let arr = row.filter(val => val);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score2048 += arr[i];
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter(val => val);
    while (arr.length < 4) arr.push(0);
    return arr;
  };

  if (direction === 'left' || direction === 'right') {
    for (let r = 0; r < 4; r++) {
      let row = board2048[r];
      if (direction === 'right') row = row.reverse();
      const newRow = slide(row);
      if (direction === 'right') newRow.reverse();
      if (newRow.join(',') !== board2048[r].join(',')) moved = true;
      board2048[r] = newRow;
    }
  } else if (direction === 'up' || direction === 'down') {
    for (let c = 0; c < 4; c++) {
      let col = [board2048[0][c], board2048[1][c], board2048[2][c], board2048[3][c]];
      if (direction === 'down') col = col.reverse();
      const newCol = slide(col);
      if (direction === 'down') newCol.reverse();
      for (let r = 0; r < 4; r++) {
        if (board2048[r][c] !== newCol[r]) moved = true;
        board2048[r][c] = newCol[r];
      }
    }
  }

  if (moved) {
    addRandomTile2048();
    document.getElementById('score2048').textContent = score2048;
    render2048();
  }
}

window.addEventListener('keydown', (e) => {
  if (currentRetroGame !== '2048') return;
  if (e.key === 'ArrowLeft') { move2048('left'); e.preventDefault(); }
  if (e.key === 'ArrowRight') { move2048('right'); e.preventDefault(); }
  if (e.key === 'ArrowUp') { move2048('up'); e.preventDefault(); }
  if (e.key === 'ArrowDown') { move2048('down'); e.preventDefault(); }
});

// Angry Birds Launchers
function launchAngryBirdsModal() {
  launchGameModal('🐦 Angry Birds Classic (HTML5 Edition)', '/arcade/angry-birds/');
}
function launchAngryBirdsPopout() {
  launchPopoutWindow('/arcade/angry-birds/', 'AngryBirds_Classic');
}

// Phase 1 Game Launchers
function launchMinecraftModal() {
  launchGameModal('⛏️ Minecraft 1.8.8 (The Bountiful Update)', '/minecraft/');
}
function launchMinecraftPopout() {
  launchPopoutWindow('/minecraft/', 'Minecraft_1_8_8');
}

function launchMario64Modal() {
  launchGameModal('🍄 Super Mario 64 (PC Port WebGL 60 FPS)', '/mario64/');
}
function launchMario64Popout() {
  launchPopoutWindow('/mario64/', 'SuperMario64');
}

function launchGTA3Modal() {
  launchGameModal('🏙️ Grand Theft Auto III (Liberty City 2001)', '/gta3/');
}
function launchGTA3Popout() {
  launchPopoutWindow('/gta3/', 'GTA3_LibertyCity');
}

// ==========================================================================
// 10. ADVANCED SHELF LAYOUT ENGINE
// ==========================================================================
let originalTiles = null;

function applyShelfLayout(active) {
  const container = document.querySelector('.games-grid');
  if (!container) return;

  if (active) {
    if (!originalTiles) {
      originalTiles = Array.from(container.children).filter(el => el.classList.contains('game-tile'));
    }

    const categories = [
      { key: 'strategy', label: '🏛️ Empire & Strategy', desc: 'Civilization building & grand campaigns' },
      { key: 'openworld', label: '🏙️ 3D Open World & Adventures', desc: 'High-speed crime, tombs & exploration' },
      { key: 'rpg', label: '⚔️ Dark Fantasy & Action RPG', desc: 'Dungeon crawling & deep lore' },
      { key: 'shooters', label: '🎯 Shooters & Tactical Combat', desc: 'Precision FPS & fast deathmatches' },
      { key: 'minecraft', label: '⛏️ Sandbox & Crafting', desc: 'Endless voxel building' },
      { key: 'mario', label: '🍄 Platforming Legends', desc: 'Classic 3D & 2D agility' },
      { key: 'win7', label: '🪟 Windows 7 Nostalgia Pack', desc: 'Purble Place, Pinball, Cards & Minesweeper' },
      { key: 'arcade', label: '👾 Retro Arcade & Casual', desc: 'Quick reflexes, racing & puzzle classics' }
    ];

    container.innerHTML = '';
    const assignedTiles = new Set();

    categories.forEach(cat => {
      const matching = originalTiles.filter(tile => {
        if (assignedTiles.has(tile)) return false;
        const cats = (tile.getAttribute('data-category') || '').split(' ');
        return cats.includes(cat.key);
      });

      if (matching.length > 0) {
        matching.forEach(t => assignedTiles.add(t));
        const row = document.createElement('section');
        row.className = 'shelf-category-row';
        row.setAttribute('data-shelf-cat', cat.key);
        row.innerHTML = `
          <div class="shelf-header">
            <h3 class="shelf-title">${cat.label}</h3>
            <span class="tile-meta">${matching.length} TITLES</span>
          </div>
          <div class="shelf-scroller"></div>
        `;
        const scroller = row.querySelector('.shelf-scroller');
        matching.forEach(t => scroller.appendChild(t));
        container.appendChild(row);
      }
    });

    const unassigned = originalTiles.filter(t => !assignedTiles.has(t));
    if (unassigned.length > 0) {
      const row = document.createElement('section');
      row.className = 'shelf-category-row';
      row.setAttribute('data-shelf-cat', 'arcade');
      row.innerHTML = `
        <div class="shelf-header">
          <h3 class="shelf-title">👾 Additional Arcade Classics</h3>
          <span class="tile-meta">${unassigned.length} TITLES</span>
        </div>
        <div class="shelf-scroller"></div>
      `;
      const scroller = row.querySelector('.shelf-scroller');
      unassigned.forEach(t => scroller.appendChild(t));
      container.appendChild(row);
    }
  } else {
    // Restore flat grid
    if (originalTiles) {
      container.innerHTML = '';
      originalTiles.forEach(t => container.appendChild(t));
    }
  }
}

// ==========================================================================
// 11. THEME & LAYOUT CONTROLLERS
// ==========================================================================
function setTheme(theme) {
  const validThemes = ['cyber', 'gta6', 'overdrive', 'crt'];
  if (!validThemes.includes(theme)) theme = 'cyber';

  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('lumeza_theme', theme); } catch(e) {}

  document.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === theme);
  });

  const names = {
    cyber: 'Cyber Synth (Default)',
    gta6: 'GTA VI // Leonida Sunset 🌴',
    overdrive: 'Hyper-Animated Overdrive ✨',
    crt: 'Retro CRT 90s Arcade'
  };

  showToast(`⚡ Theme: ${names[theme] || theme.toUpperCase()}`);
}

function setLayout(layout) {
  const validLayouts = ['grid', 'shelf', 'compact'];
  if (!validLayouts.includes(layout)) layout = 'grid';

  document.documentElement.setAttribute('data-layout', layout);
  try { localStorage.setItem('lumeza_layout', layout); } catch(e) {}

  document.querySelectorAll('[data-layout-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-layout-btn') === layout);
  });

  applyShelfLayout(layout === 'shelf');

  const names = {
    grid: 'Responsive Grid View',
    shelf: 'Console Streaming Shelves',
    compact: 'Compact Arcade List'
  };

  showToast(`⚡ Layout: ${names[layout] || layout.toUpperCase()}`);
}

// ==========================================================================
// 12. LIVE GAME SEARCH ENGINE
// ==========================================================================
function handleGameSearch(query) {
  const q = (query || '').trim().toLowerCase();
  const clearBtn = document.getElementById('clearSearchBtn');
  const countBadge = document.getElementById('searchResultCount');
  const hero = document.getElementById('heroViceCity');
  const retroPanel = document.getElementById('retroArcadePanel');

  if (clearBtn) clearBtn.style.display = q.length > 0 ? 'block' : 'none';

  const container = document.querySelector('.games-grid');
  if (!originalTiles && container) {
    originalTiles = Array.from(container.children).filter(el => el.classList.contains('game-tile'));
  }

  const allTiles = originalTiles || Array.from(document.querySelectorAll('.game-tile'));

  if (!q) {
    if (countBadge) countBadge.style.display = 'none';
    const activeNav = document.querySelector('.nav-filter.active');
    const currentCat = activeNav ? (activeNav.getAttribute('onclick') || '').match(/'([^']+)'/)?.[1] || 'all' : 'all';
    filterGames(currentCat, activeNav);
    document.querySelectorAll('.shelf-category-row').forEach(row => row.style.display = 'flex');
    return;
  }

  let matchCount = 0;
  allTiles.forEach(tile => {
    const title = (tile.querySelector('.tile-title')?.textContent || '').toLowerCase();
    const desc = (tile.querySelector('.tile-desc')?.textContent || '').toLowerCase();
    const badge = (tile.querySelector('.tile-tag-badge')?.textContent || '').toLowerCase();
    const meta = (tile.querySelector('.tile-meta')?.textContent || '').toLowerCase();
    const category = (tile.getAttribute('data-category') || '').toLowerCase();

    const matches = title.includes(q) || desc.includes(q) || badge.includes(q) || meta.includes(q) || category.includes(q);
    if (matches) {
      tile.style.display = 'flex';
      matchCount++;
    } else {
      tile.style.display = 'none';
    }
  });

  // Handle shelf layout row visibility during search
  document.querySelectorAll('.shelf-category-row').forEach(row => {
    const visibleTiles = row.querySelectorAll('.game-tile:not([style*="display: none"])');
    row.style.display = visibleTiles.length > 0 ? 'flex' : 'none';
  });

  if (countBadge) {
    countBadge.textContent = `${matchCount} MATCH${matchCount === 1 ? '' : 'ES'}`;
    countBadge.style.display = 'inline-block';
  }

  // Hero visibility based on query
  if (hero) {
    const vcMatch = 'grand theft auto vice city miami tommy vercetti rockstar'.includes(q) || q.includes('vice') || q.includes('gta');
    hero.style.display = vcMatch ? 'block' : 'none';
  }

  // Retro panel visibility
  if (retroPanel) {
    const retroMatch = 'retro 2048 snake minesweeper arcade classic'.includes(q);
    retroPanel.style.display = retroMatch ? 'block' : 'none';
  }
}

function clearGameSearch() {
  const input = document.getElementById('gameSearchInput');
  if (input) {
    input.value = '';
    handleGameSearch('');
    input.focus();
  }
}

// ==========================================================================
// 13. 3D CARD TILT & OVERDRIVE PHYSICS
// ==========================================================================
function initCardTiltPhysics() {
  document.addEventListener('mousemove', (e) => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme !== 'overdrive' && theme !== 'gta6') return;

    const tile = e.target.closest('.game-tile');
    if (!tile) return;

    const rect = tile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    tile.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`;
  });

  document.addEventListener('mouseout', (e) => {
    const tile = e.target.closest('.game-tile');
    if (tile && !tile.contains(e.relatedTarget)) {
      tile.style.transform = '';
    }
  });
}

// Global hotkeys for search: '/' and 'Escape'
window.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    const searchInput = document.getElementById('gameSearchInput');
    if (searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  } else if (e.key === 'Escape' && document.activeElement.id === 'gameSearchInput') {
    clearGameSearch();
    document.activeElement.blur();
  }
});

// ==========================================================================
// 14. INITIALIZE ON DOM READY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.games-grid');
  if (container) {
    originalTiles = Array.from(container.children).filter(el => el.classList.contains('game-tile'));
  }

  init2048();
  initCardTiltPhysics();

  // Restore saved theme
  try {
    const savedTheme = localStorage.getItem('lumeza_theme') || 'cyber';
    setTheme(savedTheme);
  } catch(e) {
    setTheme('cyber');
  }

  // Restore saved layout
  try {
    const savedLayout = localStorage.getItem('lumeza_layout') || 'grid';
    setLayout(savedLayout);
  } catch(e) {
    setLayout('grid');
  }

  showToast('🎮 Welcome to Lumeza Cyber-Arcade! GTA Vice City, Caesar III & 20+ Games Ready.');
});
