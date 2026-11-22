# ManageTask — Frontend Design System

## Direction

Use a calm, modern SaaS dashboard visual language: clean neutral surfaces, a confident indigo primary, restrained accent color, readable typography, clear task metadata, and generous but efficient spacing. Tokens are an initial proposal and should be validated for contrast and brand fit before implementation.

## Color tokens

| Token | Light mode proposal | Usage |
|---|---|---|
| Primary | `#4F46E5` (indigo-600) | Primary actions, active navigation, links; use a darker hover/focus shade where contrast requires. |
| Primary-soft | `#EEF2FF` | Selected navigation, subtle primary surfaces. |
| Secondary | `#0F766E` (teal-700) | Secondary emphasis and supporting actions; do not compete with primary. |
| Accent | `#F59E0B` | Occasional highlight, not body text on white without contrast review. |
| Background | `#F8FAFC` | Application canvas. |
| Surface | `#FFFFFF` | Cards, panels, modal surfaces. |
| Surface-muted | `#F1F5F9` | Hover regions and subtle grouped areas. |
| Text-primary | `#0F172A` | Main content. |
| Text-secondary | `#475569` | Supporting labels. |
| Border | `#E2E8F0` | Dividers, control outlines. |
| Success / warning / danger / info | `#15803D` / `#B45309` / `#B91C1C` / `#0369A1` | Feedback and status; always pair with text or an icon. |

Treat these as semantic tokens rather than hard-coded colors in components. Check text, focus, and component contrast against WCAG 2.2 AA before shipping. Status and priority must not be conveyed by color alone.

## Typography

- Primary font: system UI stack (`Inter` may be adopted if licensed/served appropriately; do not require a remote font).
- Body default: 14–16 px, line-height 1.45–1.6.
- Page title: 24–30 px, semibold; section heading: 18–22 px; card heading: 15–17 px.
- Use a consistent hierarchy and readable line length. Avoid very light text weights and overly dense dashboard labels.

## Spacing and layout

Use a 4 px base scale: `4, 8, 12, 16, 24, 32, 48, 64` px. Use 16–24 px content padding in common cards and 24–32 px page gutters on larger screens. Keep task metadata compact but distinct. Sidebar width can begin near 240–260 px on desktop and collapse behind a labeled menu on small screens.

## Shape and elevation

- Radius: 6 px for compact controls, 8 px standard, 12 px cards/panels, 16 px prominent overlays.
- Shadows: subtle one-level card lift and stronger modal shadow; use borders for most grouping rather than stacked shadows.
- Focus: visible 2 px outline/ring with offset, not removed for visual polish.

## Responsive breakpoints

Suggested Tailwind-aligned breakpoints (confirm during setup):

| Name | Width | Guidance |
|---|---:|---|
| Small | `<640 px` | One-column layouts; sidebar becomes drawer; tables transform to readable list/cards where necessary. |
| Medium | `640–1023 px` | Compact navigation and two-column dashboard where content permits. |
| Large | `1024–1279 px` | Desktop sidebar and flexible multi-column content. |
| Extra large | `>=1280 px` | Wider content grid with a maximum readable page width. |

These are layout thresholds, not guarantees about device type. Validate actual views at intermediate widths and browser zoom.

## Light and dark mode

Use semantic CSS variables for surfaces, text, borders, feedback, and focus. Light mode is the default proposal; dark mode should be a complete token mapping, not a filter/inversion. Allow system preference and an explicit user choice, with preference persistence limited to a non-sensitive UI setting. Validate charts/status badges, modal overlays, focus, and disabled states in both modes. Keep the chosen theme accessible before first paint when feasible to avoid flash.

## Interaction and accessibility

- Target WCAG 2.2 AA for primary flows.
- Provide semantic landmarks, heading order, visible focus, accessible labels, keyboard-operable dialogs/menus, and announced async changes.
- Respect reduced motion. Keep animation short and nonessential.
- Provide clear hover, active, focus, disabled, loading, success, and error states.
- Never use color alone for task status/priority; add a text label or icon.
- Ensure touch targets and spacing are practical on mobile.

## Token implementation proposal

Define CSS custom properties in `src/styles/` (for example `--color-primary`, `--surface`, `--text-primary`, `--border`, `--radius-md`, `--shadow-card`) and map Tailwind utilities to those semantics during setup. Components consume tokens; feature code should not introduce one-off hex values except data-defined colors such as approved project labels.

## Validation before implementation

Create a small palette and component reference, test contrast with chosen text/background combinations, review light/dark appearance, and check layouts at mobile/tablet/desktop widths. Product approval is required before freezing brand colors and typography.
