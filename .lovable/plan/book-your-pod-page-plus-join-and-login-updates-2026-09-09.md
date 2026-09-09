# Book Your Pod page, plus join and login updates

## Issues to flag before we build

1. **Roles.** You chose RN and CNA only, so I will leave out LPN and Phlebotomist. That means dropping these pieces of the brief: the "PHLEBOTOMY ADD ON" pod strip item, the phlebotomy add-on chip, the "LPNs acceptable inside the RN pod" question, and the four-role rewrite of /join. The join page stays as it is today (RN and CNA), and the payload fields `lpn_acceptable` and `phlebotomy` are dropped.
2. **Prices and checkout.** You chose full Clover checkout, which overrides the brief's "no prices, no checkout on /facilities" rule. So the pod rows will show real tier prices, and after booking, the confirmation will offer the matching Clover payment link. I would not put the pay button before the fifteen minute call, so payment sits in the confirmation, not in the form.
3. **Pod tiers.** The Clover links use 1-2, 3-5, 6-10, not 1-3 / 4-6 / 7+. I will use the Clover tiers plus NONE and a 7 OR MORE option that has no price and is scoped on the call.
4. **Booking endpoint.** No webhook yet. The form will read a new environment setting; until it is filled in, submitting still shows the confirmation and logs the details so nothing breaks in preview. You give me the address later and it just works.
5. Login rescue links already exist and only need the /facilities target updated.

## What gets built

### New page at /facilities, labeled Book Your Pod
Same look as the homepage: same top bar, same dark hero with photo, gradient and teal glow, same stat pills, step cards, comparison table, FAQ accordion, and teal closing band.

- Hero: eyebrow FOR FACILITIES, headline BOOK YOUR / POD with the second line teal, pod strip reading RN POD · CNA POD, the lead paragraph as written, and three stat pills (5 MIN, 1, 0).
- New hero image generated to match the site: a director greeting an arriving team outside a care building.
- Booking card on the right (form first on phones, within one scroll at 390px).
- Section 01 YOU BOOK IT. WE BUILD IT. with the three step cards.
- Section 02 A TEAM, NOT A LIST OF NAMES. with the comparison table rows as written.
- Section 03 STRAIGHT ANSWERS. FAQ, minus the "what if I only need CNAs" wording tweak needed by the tier change, and with a pricing answer that matches showing prices.
- Closing teal band: GIVE YOUR WEEKEND A TEAM IT CAN KEEP with a white BOOK YOUR POD button back to the form.

### The booking form fields
Facility name, facility type chips (Skilled Nursing, Assisted Living, Memory Care, LTACH, Hospital, Other), bed count, city and ZIP.

WHAT YOUR WEEKEND NEEDS block, two rows shown as a small grid with the helper line "Most buildings need more CNAs than RNs. Size them separately.":
- RN POD SIZE: NONE / 1-2 $798 / 3-5 $998 / 6-10 $1198 / 7 OR MORE
- CNA POD SIZE: NONE / 1-2 $498 / 3-5 $798 / 6-10 $997 / 7 OR MORE
- If both are NONE, submit is blocked with "Select at least one pod so we know what to build."

Days covered, shifts, desired start date, floor notes, then first name, last name, title, work email, direct phone, decision authority chips, and the BOOK MY POD button with the fine print kept word for word.

### Confirmation
Card swaps in place to WE ARE BUILDING YOUR POD with the copy as written, the demo calendar link, and the Clover payment buttons for whichever pods were selected. Failures show an inline retry and keep everything typed.

### Other pages
- Top bar gains a BOOK YOUR POD button; on /facilities the order is BOOK YOUR POD, LOGIN, FOR WARRIORS.
- Login page second rescue link points at /facilities and reads "Looking for weekend coverage for your facility? Book your pod."
- Footer facility column points at /facilities.

## Technical notes

- New route `src/routes/facilities.tsx` with its own head metadata, reusing `Nav`, `Footer`, `useReveal`, and existing ww.css classes (`hero`, `role-strip lg`, `kpi-row`, `reg-card`, `chip-grid`, `steps`, `compare-wrap`, `faq`, `final`).
- Small ww.css additions only: the two-row pod size grid and the price line inside a chip.
- New env var `VITE_FACILITY_WEBHOOK_URL` added to `.env.example` and `src/vite-env.d.ts`; the join form keeps `VITE_JOIN_WEBHOOK_URL`.
- Facility payload posted as JSON: facility_name, facility_type, bed_count, city, zip, rn_pod_size, cna_pod_size, days, shift, start_date, floor_notes, first_name, last_name, title, email, phone, decision_authority, source "facilities_page". Clover links stored in a constant map keyed by pod and tier.
- Copy contains no em dashes, en dashes, or exclamation points.
