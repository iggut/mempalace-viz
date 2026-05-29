# Product

## Register

product

## Users

Primary users are people who maintain and explore a **MemPalace** memory palace: developers, knowledge workers, and agent operators who already use MemPalace MCP tools and want a spatial view of what the system actually stores.

Typical context:

- **Local-first, single-user session** at a desk or in a focused work block
- **Dim ambient light** (evening, home office, terminal-adjacent setup)
- **Exploratory mode**: browsing wings and rooms, following explicit tunnel links, inspecting drawers, running semantic search, reading diary/KG surfaces
- **Secondary mode**: validating graph topology, checking duplicate memories, chatting with memories via the left-panel chat surface

They are not casual visitors landing on a marketing page. They are operators who need trustworthy structure, fast orientation, and clear separation between **graph truth** (MCP tunnel edges) and **related memory surfaces** (search, diary, KG stats) that do not become edges unless the API exposes them.

## Product Purpose

MemPalace Viz is a **local-first 3D cognitive map and control surface** for MemPalace. It turns wings, rooms, drawers, tunnels, and memory tooling into an explorable spatial graph backed by the real MemPalace Python MCP server.

Success looks like:

- A user can **orient instantly** in their palace (where am I, what wing, what room, what connects)
- The 3D scene shows **only explicit MCP/API relationships**; disconnected rooms are valid, not bugs
- Panels support **find, browse, inspect, search, and chat** without competing with the scene for attention
- Connection and load states are **legible** (status pill, refresh, empty/error states)
- The UI feels like a **precision instrument** for memory topology, not a demo or dashboard template

Core principle (non-negotiable):

> **Show what MemPalace actually knows. Do not invent hidden structure.**

## Brand Personality

**Calm · Spatial · Honest**

Voice and tone:

- **Instrument, not billboard.** Copy is terse and specific. Labels name what will happen ("Refresh", "Search memories", "Route along path").
- **Spatial language.** Wings, rooms, tunnels, loci, graph, palace. Avoid generic SaaS vocabulary (streamline, empower, seamless).
- **Truthful UI.** When data is missing, say so. When search results are not graph edges, say so (already reflected in semantic search hint copy).
- **Atmospheric, not decorative.** Dark glass chrome frames a cinematic Three.js scene; panels are layered quietly over depth, not stacked card grids.

Emotional goal: **focused curiosity** — the feeling of navigating a personal mind-map with confidence that the map matches the backend.

## Anti-references

Do **not** drift toward:

- **Generic SaaS dashboards**: identical metric cards, hero-metric templates, cream/warm-neutral body backgrounds, purple-gradient marketing aesthetics
- **Invented graph semantics**: edges from proximity, taxonomy adjacency, semantic similarity, or UI selection history
- **Marketing landing patterns**: oversized hero typography, eyebrow kickers on every section, numbered section scaffolds (01/02/03), gradient text, side-stripe accent borders
- **Visual noise over the scene**: heavy glassmorphism stacks, nested cards, bright panels that flatten the 3D depth
- **Misleading affordances**: implying KG/diary/search hits are tunnel links; hiding disconnected components as errors
- **Demo-mode polish**: fake data, speculative flows, or features not backed by MCP/API routes

Reference direction (specific qualities, not category clones):

- **Obsidian graph view** — explicit edges, honest disconnected components, exploration over presentation
- **Flight instruments / mission control** — dark surfaces, high legibility, status at a glance, minimal chrome
- **Stellarium / spatial tools** — the canvas is the product; UI orbits the view

## Design Principles

1. **The scene is the hero.** Layout, color, and motion serve the Three.js cognitive map. Panels frame and inform; they never overpower the spatial view.

2. **Graph truth is sacred.** Render `edgesResolved` from MCP tunnels only. Disconnected rooms and missing edges are valid states. Related memory tools live in panels, not as invented arcs.

3. **Orientation before decoration.** Navigation (breadcrumbs, back, view modes, search/filter, route/focus) must answer "where am I?" and "what connects?" before any visual flourish.

4. **Quiet chrome, legible state.** Connection status, loading, empty, and error states should be obvious without modal drama. Muted text must still meet contrast on tinted dark surfaces.

5. **Explore without cognitive overload.** Progressive disclosure in inspector and panels; distinguish structure search, semantic memory search, graph routing, and discovery overlays clearly.

## Accessibility & Inclusion

Target: **WCAG 2.1 AA** for UI chrome (panels, forms, buttons, status text).

Known requirements and conventions already in the codebase:

- Skip link to the 3D view; semantic landmarks (`header`, `nav`, `main`)
- ARIA for tabs, live regions (connection status, search), `aria-busy` during loads, keyboard-friendly controls
- `prefers-reduced-motion` respected for CSS transitions and scene-adjacent motion
- Focus-visible styling on interactive controls
- Color is not the sole signal for state (connection pill uses text + `data-state`; route/focus uses labels and structure)

Considerations:

- **Low-light use** is primary; dark theme is intentional, not a "cool dev tool" default
- **Keyboard and screen-reader users** need panel collapse, search, and inspector content to remain operable when the WebGL canvas is secondary
- **Placeholder and muted text** on dark tinted panels must maintain ≥4.5:1 contrast; avoid washed-out gray-on-navy patterns
