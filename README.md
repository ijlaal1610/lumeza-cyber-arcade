# 🕹️ Lumeza Cyber-Arcade // Self-Hosted WebAssembly Gaming Platform
> **Live Portal:** [https://games.lumeza.in](https://games.lumeza.in)  
> **Host Server:** Ubuntu 20.04 LTS (Nginx Native Static & Reverse Proxy)  
> **Key Architecture:** 100% Native WebAssembly & HTML5 · Zero Docker · Zero Third-Party Streaming  
> **License:** [MIT](LICENSE)

---

## 🌟 Overview
**Lumeza Cyber-Arcade** is a high-performance web gaming platform bringing genuine AAA titles, legendary 3D tactical shooters, sandbox worlds, and retro console classics natively to the browser.

By leveraging client-side WebAssembly (WASM), WebGL, and modern browser standards (`SharedArrayBuffer`, Cross-Origin Isolation), the platform delivers console-quality gameplay without placing rendering burdens on the server.

---

## 🎮 Current Game Lineup (Phase 0 & 1 Complete)

### 👑 3D Open World & Sandbox Headliners
- **🌴 Grand Theft Auto: Vice City (1986 Miami Edition)**
  - Rebuilt with high-fidelity WebAssembly (`reVC`).
  - Features Tommy Vercetti campaign, 1986 authentic radio stations, keyboard + gamepad support, in-window modal + popout, and pre-bundled 100% save file.
  - Persistent fullscreen button (`⛶ FULLSCREEN`) and `F4` hotkey.
- **🏙️ Grand Theft Auto III (Liberty City 2001)**
  - Powered by the `re3` WebAssembly engine with 3D audio, physics, vehicle handling, and persistent IndexedDB (`IDBFS`) save system.
- **⛏️ Minecraft: The Bountiful Update (1.8.8)**
  - Desktop-grade Minecraft 1.8.8 running natively in WebAssembly via `EaglercraftX`.
  - Single-player Survival & Creative modes, Nether & End dimensions, Redstone mechanics, sound effects, custom skins, and local world saves in IndexedDB.
- **🍄 Super Mario 64 (PC Port WebGL 60 FPS)**
  - The landmark Nintendo 64 3D platformer running in silky 60 FPS WebGL via native C-to-WASM compilation.
  - Features widescreen 16:9 rendering, gamepad & keyboard controls, save games, and classic castle exploration.

### 🎯 Tactical & Classic Shooters
- **🎯 Counter-Strike 1.6 (WebAssembly Edition)**
  - GoldSrc engine running in browser via Xash3D.
  - Hostage rescue, bomb defusal, bot matches, full pointer lock.
  - Pre-loaded with custom classic maps: `cs_mansion`, `awp_india`, `fy_pool_day`, `fy_iceworld2k`, and `aim_headshot`.
- **💀 DOOM (Classic 1993)**
  - Pure JS-DOS WebAssembly port with pixel-perfect native 4:3 responsive scaling.
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

## 🚀 Master Roadmap & Upcoming Titles
See the complete architecture blueprint: **[docs/ULTIMATE_GAMES_DEPLOYMENT_PLAN.md](docs/ULTIMATE_GAMES_DEPLOYMENT_PLAN.md)**

Upcoming additions:
1. **🍄 The Mario Vault** — Super Mario World (SNES), Super Mario All-Stars, Super Mario Kart, Yoshi's Island.
2. **🕹️ RetroX Universal Console Station** — Multi-system emulator (GBA, SNES, NES, Genesis, PS1) with ROM drag-and-drop.
3. **⚔️ Diablo 1 + Hellfire** — `DevilutionX` WebAssembly port.
4. **🔬 Half-Life 1 Campaign** — Gordon Freeman Black Mesa storyline.
5. **🏛️ Tomb Raider 1 & 2** — `OpenLara` 3D WebGL engine.
6. **💥 Quake III Arena** — `ioquake3` 3D arena deathmatch.

---

## 🛠️ Repository Layout
```
lumeza-cyber-arcade/
├── README.md                          # Project presentation and documentation
├── LICENSE                            # MIT License for portal orchestration code
├── SECURITY.md                        # Security policy & vulnerability reporting
├── CONTRIBUTING.md                    # Contribution workflow and guidelines
├── .gitignore                         # Git ignore rules
│
├── .github/                           # GitHub configuration & workflows
│   ├── dependabot.yml                 # Automated dependency updates
│   ├── PULL_REQUEST_TEMPLATE.md       # PR guidelines
│   ├── workflows/
│   │   └── ci.yml                     # Automated CI & syntax validation gate
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md              # Bug report template
│       └── game_request.md            # New game request template
│
├── docs/
│   └── ULTIMATE_GAMES_DEPLOYMENT_PLAN.md  # Comprehensive multi-phase plan
│
├── portal/                            # Live portal web assets
│   ├── index.html                     # Master portal landing page (v2.2)
│   ├── styles.css                     # Neon cyberpunk arcade UI stylesheet
│   └── portal.js                      # Modal launcher, filtering, fullscreen & cheats
│
├── nginx/
│   └── games.lumeza.in.conf           # High-performance Nginx vhost with COOP/COEP
│
└── scripts/
    ├── setup_vps.sh                   # Automated deployment script for VPS
    └── update_cs_maps.py              # Custom CS 1.6 map download and pack utility
```

---

## 🔒 Security & Cross-Origin Isolation
- **Cross-Origin Isolation:** Configured with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` (with `require-corp` on game endpoints) to enable multi-threaded `SharedArrayBuffer` for WebAssembly.
- **Iframe Compatibility:** Optimized header proxying allows games to load both as in-page modals and as standalone popouts without `refused to connect` browser errors.
- **Zero Third-Party Tracking:** No ad trackers, no telemetry beacons, 100% self-hosted on private VPS.

---

## ⚖️ Legal & Fair Use Disclaimer
1. **Source Code**: All portal orchestration code, custom loaders, and stylesheets in this repository are licensed under the [MIT License](LICENSE).
2. **Game Engines**: All game engines (`reVC`, `re3`, `EaglercraftX`, `SM64-PC-Port`, `Xash3D`, `JS-DOS`, `WebQuake`) are open-source projects governed by their respective licenses (GPLv2, GPLv3, MIT, Apache 2.0, or Zlib).
3. **Proprietary Assets & Trademarks**: Game titles, trademarks, and associated intellectual property remain the property of their respective owners (Take-Two Interactive / Rockstar Games, Valve Corporation, id Software / Bethesda, Rovio Entertainment, Nintendo, Mojang / Microsoft). This repository is non-commercial and maintained strictly for personal research, educational preservation, and self-hosting purposes.
