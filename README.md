# 🏰 MemPalace 3D Visualization

A beautiful 3D visualization of your MemPalace memory palace, showing wings, rooms, and their relationships.

## Features

- **Wings View** 📚 — See all wings (projects/domains) arranged in a circle, sized by drawer count
- **Rooms View** 🚪 — Explore rooms within each wing, orbiting their parent wing
- **Graph View** 🕸️ — Force-directed layout showing tunnel connections between rooms across wings
- **Interactive** — Hover over nodes to see details, click to drill down (future)
- **Auto-rotating** — Gentle rotation for ambient viewing

## Quick Start

### 1. Start the API server

```bash
cd /home/iggut/.openclaw/workspace/mempalace-viz
node server.js
```

Server runs at `http://localhost:8767`

### 2. Open the visualization

Open `index.html` in your browser:

```bash
# Option A: Use a simple HTTP server
python -m http.server 3001
# Then open http://localhost:3001

# Option B: Just open the file directly
xdg-open index.html  # Linux
open index.html      # macOS
```

## Architecture

```
┌─────────────┐
│  Browser    │← Three.js visualization
│  (index.html)│
└──────┬──────┘
       │ HTTP requests
       ↓
┌─────────────┐
│  server.js  │← Node.js API bridge
└──────┬──────┘
       │ MCP protocol
       ↓
┌─────────────┐
│ MemPalace   │← Python MCP server
│  MCP Server │
└─────────────┘
```

## API Endpoints

- `GET /api/status` — Palace overview (total drawers, wings, rooms)
- `GET /api/wings` — List all wings with drawer counts
- `GET /api/rooms?wing=xxx` — List rooms in a wing
- `GET /api/taxonomy` — Full hierarchy: wing → room → drawer count
- `GET /api/graph-stats` — Tunnel connections between rooms
- `GET /api/kg-stats` — Knowledge graph statistics

## Configuration

Edit `CONFIG` object in `index.html` to customize:

```javascript
const CONFIG = {
  wingColors: {
    projects: '#a5b4fc',
    shared_grocery_list: '#86efac',
    default: '#fbbf24'
  },
  nodeSizes: {
    wingMin: 3,
    wingMax: 8,
    roomMin: 0.8,
    roomMax: 2.5
  }
};
```

## Future Enhancements

- [ ] Click on wing/room to filter or zoom
- [ ] Show drawer contents on click
- [ ] Animation transitions between views
- [ ] Search/filter functionality
- [ ] Knowledge graph entity visualization
- [ ] Time-based animations (drawer additions over time)

## Tech Stack

- **Three.js** — 3D rendering
- **OrbitControls** — Camera controls
- **Vanilla JavaScript** — No build step needed!

---

Made with 💜 for MemPalace
