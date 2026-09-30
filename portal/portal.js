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

  const tiles = document.querySelectorAll('.game-tile');
  tiles.forEach(tile => {
    const cats = (tile.getAttribute('data-category') || '').split(' ');
    if (category === 'all' || cats.includes(category)) {
      tile.style.display = 'flex';
    } else {
      tile.style.display = 'none';
    }
  });

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

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  init2048();
  showToast('🎮 Welcome to Lumeza Cyber-Arcade! GTA Vice City & CS 1.6 Ready.');
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
