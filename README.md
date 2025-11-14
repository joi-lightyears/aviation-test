## Tripzy

Tripzy Test

## Run the Project

### Prerequisites
- Node.js `>=18.18` (recommended: `18.x` or `20.x`)
- npm installed

### Install dependencies
```bash
npm install
```

### Development (hot-reload)
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm run start
```


### Architecture
- Next.js App Router with TypeScript. Pages live under `src/app`.
- Home route `src/app/page.tsx` renders the `ServiceTabs` UI.
- Search route `src/app/search/page.tsx` shows `SearchResults` based on URL params.
- Components organized under `src/components` with UI primitives under `src/components/ui` and search-specific components under `src/components/search`.
- Small static dataset for autocomplete under `src/lib/data/locations.ts`.

### Key Libraries
- `next@16`, `react@19`, `react-dom@19`
- Styling: `tailwindcss@^4`, `clsx`, `tailwind-merge`, `class-variance-authority`
- Animations: `framer-motion`
- UI primitives: Radix (`@radix-ui/react-popover`, `@radix-ui/react-checkbox`)
- Date & calendar: `react-day-picker`, `date-fns`
- Icons: `lucide-react` via a local `Icons` wrapper

#### Autocomplete details
- Data source: small static list in `src/lib/data/locations.ts`.
- Case-insensitive filtering across `english_name`, `short_code`, and `code_state`.
- Input shows either the selected value or the current search text; typing opens the dropdown and clears a prior selection to resume searching.
- Selection writes the chosen location back to the parent via `onChange`, resets search text, and closes the dropdown.
- Click-outside detection closes the dropdown using a `mousedown` listener bound to the document.
- Results are rendered as buttons for straightforward keyboard and pointer interaction.
