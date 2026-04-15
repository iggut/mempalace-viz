# Agent Instructions: MemPalace Viz

## Architecture Overview
- **Frontend**: Three.js 3D visualization. Core logic in `brain.js` (legacy/demo) and `scene.js` (primary).
- **Backend**: Node.js (`server.js`) acting as a bridge to a Python MCP server.
- **MCP Server**: Spawned as a child process using the Python virtual environment in `../mempalace-venv`.

## Key Files
- `index.html`: Primary entry point for the 3D visualization.
- `ui.js`: Main frontend application module.
- `scene.js`: Three.js scene management and layout.
- `server.js`: API server (port 8767). Proxied by Vite in dev mode.
- `canonical.js`: Data normalization and graph logic.
- `api.js`: Frontend API client.

## Development Tips
- **Portability**: Avoid hardcoding absolute paths. Use `WORKSPACE` environment variable or relative paths from `__dirname`.
- **API Port**: The backend runs on `8767`. Vite dev server (`npm run dev`) runs on `3001` and proxies `/api` to the backend.
- **Testing**: Run `npm test` to execute the full suite of logic tests.
- **Logs**: Backend logs useful MCP interaction details, including errors from the Python process.

## Common Tasks
- **Updating Visuals**: Modify `CONFIG` in `scene.js`.
- **New API Route**: Add to the switch statement in `server.js` and ensure it follows the canonical data shape.
- **Build**: Use `npm run build` to generate the production bundle in `dist/`.
