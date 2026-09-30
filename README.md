# 🕹️ Lumeza Cyber-Arcade // Self-Hosted WebAssembly Gaming Platform
> **Live Portal:** [https://games.lumeza.in](https://games.lumeza.in)  
> **Host Server:** Ubuntu 20.04 LTS (Nginx Native Static & Reverse Proxy)  
> **Key Architecture:** 100% Native WebAssembly & HTML5 · Zero Docker · Zero Third-Party Streaming

---

## 🌟 Overview
**Lumeza Cyber-Arcade** is a high-performance web gaming platform bringing genuine AAA titles, legendary 3D tactical shooters, sandbox worlds, and retro console classics natively to the browser.

By leveraging client-side WebAssembly (WASM), WebGL, and modern browser standards (SharedArrayBuffer, Cross-Origin Isolation), the platform delivers console-quality gameplay without placing rendering burdens on the server.

---

## 🎮 Current Game Lineup

### 👑 3D Open World & AAA Headliners
- **🌴 Grand Theft Auto: Vice City (1986 Miami Edition)**
  - Rebuilt with high-fidelity WebAssembly (`reVC`).
  - Features Tommy Vercetti campaign, 1986 authentic radio stations, keyboard + gamepad support, in-window modal + popout, and pre-bundled 100% save file.
  - Persistent fullscreen button (`⛶ FULLSCREEN`) and `F4` hotkey.

### 🎯 Tactical & Classic Shooters
- **🎯 Counter-Strike 1.6 (WebAssembly Edition)**
  - GoldSrc engine running in browser via Xash3D.
  - Hostage rescue, bomb defusal, bot matches, full pointer lock.
  - Pre-loaded with custom classic maps: `cs_mansion`, `awp_india`, `fy_pool_day`, `fy_iceworld2k`, and `aim_headshot`.
- **💀 DOOM (Classic 1993)**
  - Pure JS-DOS WebAssembly port.
  - Pixel-perfect native 4:3 responsive scaling.
  - **Drag & Drop Custom WAD Loader**: load `SIGIL`, `DOOM2`, `BRUTAL`, or custom WADs directly from your computer!
- **⚡ Quake Classic (1996)**
  - WebQuake engine port with 3D lovecraftian singleplayer and deathmatch.

### 🐦 Physics & Arcade Classics
- **🐦 Angry Birds Classic**
  - Authentic HTML5 Canvas & Physics slingshot engine with bird powers (Red, Chuck, Bomb), pig fortresses, sound effects, and fullscreen toggle.
- **👾 8 HTML5 Retro Classics:**
  - *Space Invaders*, *Asteroids Infinity*, *Hextris*, *HTML5 Breakout*, *Netris (Tetris)*, *Klondike Solitaire*, *Naval Battle*, *Comet Pinball*.
  - 100% English localization.

---

## 🚀 The Master Plan & Upcoming Titles
See the complete architecture blueprint: **[docs/ULTIMATE_GAMES_DEPLOYMENT_PLAN.md](docs/ULTIMATE_GAMES_DEPLOYMENT_PLAN.md)**

Upcoming additions:
1. **🏙️ Grand Theft Auto III (Liberty City 2001)** — `re3` WebAssembly port.
2. **⛏️ Minecraft: The Bountiful Update (1.8.8)** — Full survival, creative, nether, ender dragon, redstone, and custom skins via `Eaglercraft` WASM.
3. **⭐ Super Mario 64** — Native C/WASM 60 FPS widescreen port.
4. **🍄 The Mario Vault** — Super Mario World (SNES), Super Mario All-Stars, Super Mario Kart, Yoshi's Island.
5. **🕹️ RetroX Universal Console Station** — Multi-system emulator (GBA, SNES, NES, Genesis, PS1) with ROM drag-and-drop.
6. **⚔️ Diablo 1 + Hellfire** — `DevilutionX` WebAssembly port.
7. **🔬 Half-Life 1 Campaign** — Gordon Freeman Black Mesa storyline.
8. **🏛️ Tomb Raider 1 & 2** — `OpenLara` 3D WebGL engine.
9. **💥 Quake III Arena** — `ioquake3` 3D arena deathmatch.

---

## 🛠️ Repository Layout
```
lumeza-cyber-arcade/
├── README.md                      # Project presentation and documentation
├── .gitignore                     # Git ignore rules
│
├── docs/
│   └── ULTIMATE_GAMES_DEPLOYMENT_PLAN.md  # Comprehensive deployment plan
│
├── portal/                        # Live portal web assets
│   ├── index.html                 # Master portal landing page
│   └── portal.js                  # Modal launcher, filtering, fullscreen & cheats
│
├── nginx/
│   └── games.lumeza.in.conf       # High-performance Nginx vhost with COOP/COEP
│
└── scripts/
    ├── setup_vps.sh               # Automated deployment script for VPS
    └── update_cs_maps.py          # Custom CS 1.6 map download and pack utility
```

---

## 🔒 Security & Standards
- **Cross-Origin Isolation:** Configured with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` to enable high-speed multi-threaded `SharedArrayBuffer` for WebAssembly.
- **Iframe Compatibility:** Optimized header proxying allows games to load both as in-page modals and as standalone popouts without `refused to connect` browser errors.
- **Zero Third-Party Tracking:** No ad trackers, no streaming CDNs, 100% self-hosted on private VPS.

---

## 📜 License
All source game engines are open-source and governed by their respective licenses (GPL, MIT, Apache 2.0, Zlib). Proprietary assets remain the copyright of their respective publishers (Rockstar Games, Valve, id Software, Rovio, Nintendo, Mojang).
