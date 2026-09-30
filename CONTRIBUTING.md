# Contributing to Lumeza Cyber-Arcade

Thank you for your interest in contributing to **Lumeza Cyber-Arcade**! We welcome bug fixes, game engine optimizations, new WebAssembly ports, and UI improvements.

---

## 🏛️ Core Architectural Principles

When contributing code or new game ports to this project, adhere strictly to these standards:
1. **Client-Side Only**: All game emulation and graphics rendering must run client-side via WebAssembly, WebGL, WebAudio, or HTML5 Canvas. We do not use third-party video streaming or heavy backend render clusters.
2. **Zero Docker on Production Host**: Production uses native Nginx with HTTP/2 and SSL on bare-metal / VPS.
3. **Cross-Origin Isolation**: High-performance WASM engines require `SharedArrayBuffer`, which relies on `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`. Never disable these headers globally.
4. **Clean Code & Modals**: Every game must be playable both as an embedded modal with full screen toggle and as an independent popout window.

---

## 💻 Local Development Workflow

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/your-username/lumeza-cyber-arcade.git
   cd lumeza-cyber-arcade
   ```
2. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Test locally using Python's built-in HTTP server or Nginx:
   ```bash
   # Note: SharedArrayBuffer games require COOP/COEP headers
   python -m http.server 8080 --directory portal
   ```
4. Commit your changes with clear, descriptive commit messages following Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
5. Push to your branch and submit a Pull Request.

---

## ⚖️ Asset & Copyright Guidelines

- **Game Engines**: Must be licensed under open-source licenses (GPL, MIT, Apache 2.0, BSD, Zlib).
- **Commercial Assets**: Do NOT submit proprietary game assets (WADs, PAKs, ROMs, full game data) to this repository. Asset-loaders must download from legitimate shareware distributions or allow users to supply their own files.
