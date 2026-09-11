# Sample-match UI validation — 11 September 2026

## Scope and non-regression

Match the user-supplied assessor report presentation while retaining the Pitcher data. `data.js` is unchanged. 36 consolidated findings, 35 partial scenarios, 210 incomplete whole-journey cells and the interim release assessment remain unchanged. No product scenario was executed during this UI update.

The standalone report has no webapp/webapi runtime, environment files or service pair; the CIC application-service preflight is not applicable. Existing static server at port 8767 served this report directory. No application services were started or modified.

## Requirement-to-test mapping

| Requirement | Verification |
| --- | --- |
| Match sample | Same base dashboard HTML/CSS structure, fonts, header, split hero, release signal, metric strip, sidebar, list and drawer; Chrome sample and report inspected at 1440 configured width |
| Preserve results | DOM assertions for 36 findings, 35 rows, 210 cells; data.js unchanged in Git |
| Search/filter/sort | DOM tests: all options, all type/severity pairs, whitespace, long strings, markup-like input, Unicode, no-match recovery; actual Chrome search and empty metric/reset |
| Shareable views | URL hydration, malformed sort/filter values, metric persistence, existing deep links; Chrome copy-link confirmation |
| Detail drawer | Every finding opened/closed in DOM tests; Escape, close, backdrop, hash and keyboard checks; actual Chrome PIT-F008 drawer and Escape |
| Export | Filtered CSV generation test; actual Chrome CSV-export confirmation |
| Future fixes | Isolated test-only overlays exercise status buckets, fix links and retest evidence; no actual finding marked fixed |
| Responsive UI | Chrome visual checks at configured 360×800, 390×844, 600×900, 768×1024, 1024×768, 1280×800 and 1440×900; mobile drawer and empty recovery inspected |

Screenshots are recorded in this task's browser tool evidence. Captures may exclude the scrollbar; this report-UI check is not a product scenario size-cell certification. Temporary browser/device overrides were cleared after validation.

## Automated results

`npm test`: six groups passed; zero failed. `app.js` line coverage 98.89%, function coverage 100%, branch coverage 95.91%. Test dependencies are development-only. Browser warning/error readback was empty after copy/export checks. No application API or Playwright workflow execution was used.
