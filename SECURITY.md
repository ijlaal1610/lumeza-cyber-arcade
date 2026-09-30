# Security Policy

## Supported Versions

We release patches and security improvements on the default branch (`main`). Only the latest revision deployed to production is actively supported.

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `main`           | :white_check_mark: |
| `< 1.0` (legacy) | :x:                |

---

## Architecture & Security Model

Lumeza Cyber-Arcade operates as a **100% self-hosted, client-side WebAssembly platform**:
1. **Zero Server-Side Code Execution for Game Payloads**:
   Game binaries (`.wasm`, `.js`) and ROMs run exclusively inside the visitor's browser sandbox via WebGL and WebAudio. The server acts strictly as an HTTP/2 static delivery CDN and reverse proxy.
2. **Cross-Origin Isolation**:
   - `Cross-Origin-Opener-Policy: same-origin`
   - `Cross-Origin-Embedder-Policy: credentialless` (or `require-corp` on isolated subdomains/paths)
   - These headers protect high-resolution timers (`performance.now()`) and multi-threading primitives (`SharedArrayBuffer`) against Spectre-style side-channel vulnerabilities.
3. **No Third-Party Trackers or Data Harvesting**:
   The portal contains no third-party telemetry, ad beacons, or external analytics (e.g. Google Analytics scripts are purged).

---

## Reporting a Vulnerability

If you discover a security vulnerability or security misconfiguration in this project:

1. **Do not open a public GitHub issue.**
2. Send an email to the repository owner at **`ijlaal1610@gmail.com`** or open a [Private Vulnerability Advisory](https://github.com/ijlaal1610/lumeza-cyber-arcade/security/advisories/new) via GitHub Security.
3. Include:
   - Description of the issue (CORS/COEP leak, path traversal, header misconfiguration, etc.)
   - Steps or proof-of-concept to reproduce
   - Potential impact
4. You will receive an acknowledgment within 48 hours, followed by a remediation timeline.
