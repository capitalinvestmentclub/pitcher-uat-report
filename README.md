# Pitcher UAT — interim public report

Sanitized 11 September 2026 Chrome-only test findings, published by wase932 at the user's request before further execution. Static HTML/CSS/JavaScript; no runtime dependencies, accounts, tracking or secrets.

35 partial scenario records, 210 incomplete whole-journey viewport cells. Successful subchecks are described separately. Finding priorities are proposed; this is not final UAT acceptance or go-live approval.

The public register consolidates selected findings from private webapp test records. It does not replace the original per-scenario steps, execution timestamps and evidence. One unchanged synthetic-data screenshot is included; credentials, email addresses, capability URLs, private documents and raw logs are excluded.

Serve the directory with any static HTTP server. GitHub Pages publishes the main branch root. Edit data.js for subsequent curated findings; preserve publication history and distinguish original evidence from fix/retest evidence.

## UI revision 2

At the user's request, the dashboard now follows the supplied [sample report](https://oyinkansolight.github.io/pr-2323-review-report/): Manrope/DM Mono typography, sticky header, circular branding, split hero with release signal, five clickable metric columns, sidebar checkbox filters, compact finding rows and right-hand detail drawer. Google Fonts supplies the same fonts as the sample; system fallbacks remain available. The original Pitcher results, IDs and scenario coverage are unchanged. Reconciliation items appear as Questions and retain their original evidence status in details and CSV.

Search/filter/sort state is encoded in shareable URLs. Existing `#PIT-F001`-style finding links remain supported. CSV exports the currently filtered view. Escape, close and backdrop dismiss the native dialog. Coverage and methodology remain in the appendix, reachable from the campaign note and each detail drawer.

`npm ci && npm test` runs isolated DOM regression tests for this report only, not product scenarios. Runtime remains static and dependency-free; npm packages are development-only. The sample's UI structure/styles are adapted with attribution; no assessor findings or fix statuses are imported.
