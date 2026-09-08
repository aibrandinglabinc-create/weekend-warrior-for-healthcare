# Join page: put CNA next to RN in the role picker

## Problem
On the registration form's first step ("What's your role?"), the CNA chip has a `wide` class (`grid-column: 1 / -1` in `.chip.wide`), so it stretches across the full width on its own row while RN sits alone above it. The user wants RN and CNA side by side.

## Change
In `src/routes/join.tsx`, remove the `wide` class from the CNA chip so both chips occupy the same grid row (the 3-column grid leaves them side by side; the ≤420px breakpoint already shows two columns, so they still sit together on small screens).

No other copy, styling, or logic changes.
