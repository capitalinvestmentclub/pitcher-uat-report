# Pitcher UAT — interim public report

Published report: https://capitalinvestmentclub.github.io/pitcher-uat-report/

The repository was transferred from wase932 to capitalinvestmentclub at the user's request, preserving history. Public GitHub Pages was enabled for the organization; private Pages remains disabled. Source links now point to the organization repository. Test results are unchanged.

Sanitized 11 September 2026 Chrome-only test findings, published by wase932 at the user's request before further execution. Static HTML/CSS/JavaScript; no runtime dependencies, accounts, tracking or secrets.

35 partial scenario records, 210 incomplete whole-journey viewport cells. Successful subchecks are described separately. Finding priorities are proposed; this is not final UAT acceptance or go-live approval.

The public register consolidates selected findings from private webapp test records. It does not replace the original per-scenario steps, execution timestamps and evidence. Six unchanged, reviewed synthetic-data screenshots are mapped to five findings; credentials, email addresses, capability URLs, private documents and raw logs are excluded.

Serve the directory with any static HTTP server. GitHub Pages publishes the main branch root. Edit data.js for subsequent curated findings; preserve publication history and distinguish original evidence from fix/retest evidence.

## UI revision 2

At the user's request, the dashboard now follows the supplied [sample report](https://oyinkansolight.github.io/pr-2323-review-report/): Manrope/DM Mono typography, sticky header, circular branding, split hero with release signal, five clickable metric columns, sidebar checkbox filters, compact finding rows and right-hand detail drawer. Google Fonts supplies the same fonts as the sample; system fallbacks remain available. The original Pitcher results, IDs and scenario coverage are unchanged. Reconciliation items appear as Questions and retain their original evidence status in details and CSV.

Search/filter/sort state is encoded in shareable URLs. Existing `#PIT-F001`-style finding links remain supported. CSV exports the currently filtered view. Escape, close and backdrop dismiss the native dialog. Coverage and methodology remain in the appendix, reachable from the campaign note and each detail drawer.

`npm ci && npm test` runs isolated DOM regression tests for this report only, not product scenarios. Runtime remains static and dependency-free; npm packages are development-only. The sample's UI structure/styles are adapted with attribution; no assessor findings or fix statuses are imported.

## Evidence revision 3

The evidence selector and finding drawer share the finding-specific `visualEvidence` mapping in `data.js`. F008 has applicant/creator comparison images; F010 configuration readback; F012 negative spend; F021 holder readback; F033 voting-table layout. Each caption records the original capture time and limits of what the image proves. Findings without published images display an explicit empty state and never inherit another finding's image. The selected finding persists in the `evidence` URL parameter. Original test results are unchanged.

Publication and updates target Capital Investment Club only. The former wase932 Pages URL returns 404; its repository address redirects to the transferred CIC repository and must not be used for deletion.
