# Pitcher deployed defect-delivery retest

Completed: 2026-09-18T10:10:00Z

Environment: deployed development · Google Chrome · 1792x976 by default; additional sizes only for responsive findings.

This report records terminal disposition for every Pitcher entry in the 276-finding delivery batch. PASS means the deployed behavior was verified. FAIL means the deployed defect remains reproducible. PASSED_OVER means the bounded attempt could not produce trustworthy proof, commonly because an exact fixture, actor, reversible mutation, or stable protected page was unavailable. DUPLICATE_COVERAGE points to another finding that exercised the same behavior.

## Summary

| Total | PASS | FAIL | DUPLICATE_COVERAGE | PASSED_OVER |
|---:|---:|---:|---:|---:|
| 26 | 11 | 3 | 0 | 12 |

Severity inventory: LOW 3 · MEDIUM 23. Outcome reconciliation: FAIL 3 · PASS 11 · PASSED_OVER 12.

## Finding dispositions

| ID | Severity | Outcome | Title | Disposition | Tested |
|---|---|---|---|---|---|
| PIT-F014 | MEDIUM | PASSED_OVER | Calendar dates shift by one day | PARTIAL_BRANCH_OBSERVED_REMAINING_FIXTURES_UNAVAILABLE | 2026-09-18T08:34:27Z |
| PIT-F015 | MEDIUM | PASS | Session filters and Back state are inconsistent | VERIFIED_FIXED_DEPLOYED | 2026-09-18T08:01:32.318Z |
| PIT-F016 | MEDIUM | PASS | Completed session recording is not playable | VERIFIED_FIXED_DEPLOYED | 2026-09-18T08:08:28.932Z |
| PIT-F017 | MEDIUM | PASSED_OVER | Session emails contain wrong duration and destination | EXTERNAL_MAILBOX_AND_EVENT_FIXTURE_UNAVAILABLE | 2026-09-18T08:11:48.581Z |
| PIT-F018 | MEDIUM | PASS | RFI accepts a description beyond its displayed limit | VERIFIED_FIXED_DEPLOYED | 2026-09-18T07:47:37.262Z |
| PIT-F019 | MEDIUM | PASSED_OVER | Completed assessment link opens an editable blank form | EXACT_TERMINAL_RECORD_ACTORS_UNAVAILABLE | 2026-09-18T08:38:00Z |
| PIT-F020 | MEDIUM | PASSED_OVER | Historical wallet presentation changes or misstates entries | STABILITY_CONTROL_PASSED_EXACT_HOLD_RELEASE_REPLAY_UNAVAILABLE | 2026-09-18T08:45:24.349Z |
| PIT-F021 | MEDIUM | FAIL | External-holder records cannot be reliably maintained | FAIL | 2026-09-18T04:54:00.000Z |
| PIT-F022 | MEDIUM | PASSED_OVER | Agreement preview overlaps at laptop sizes | PASSED_OVER | 2026-09-18T05:03:00.000Z |
| PIT-F023 | MEDIUM | FAIL | Receipts misstate amounts, direction or transaction type | REPRODUCED_DEPLOYED | 2026-09-18T08:45:24.349Z |
| PIT-F024 | MEDIUM | PASSED_OVER | Agreement email link becomes empty after promotion | EXTERNAL_MAILBOX_AND_EVENT_FIXTURE_UNAVAILABLE | 2026-09-18T08:11:48.581Z |
| PIT-F025 | MEDIUM | PASS | Trend dollar toggle is not clearly a variance view | VERIFIED_FIXED_DEPLOYED | 2026-09-18T09:03:37.486Z |
| PIT-F026 | MEDIUM | PASSED_OVER | Grant status and approval prompts contradict lifecycle | PASSED_OVER | 2026-09-18T09:07:28Z |
| PIT-F027 | MEDIUM | PASS | Closed grant still presents Apply | VERIFIED_FIXED_DEPLOYED | 2026-09-18T07:44:58.892Z |
| PIT-F029 | MEDIUM | PASSED_OVER | Messages and unread badges require refresh | PASSED_OVER | 2026-09-18T09:10:44Z |
| PIT-F030 | MEDIUM | PASSED_OVER | Email-preference positive control not established | EXTERNAL_MAILBOX_AND_EVENT_FIXTURE_UNAVAILABLE | 2026-09-18T08:11:48.581Z |
| PIT-F031 | MEDIUM | PASS | Feedback UI is hidden at target widths | VERIFIED_FIXED_DEPLOYED | 2026-09-18T07:37:56.664Z |
| PIT-F032 | MEDIUM | FAIL | Assistant gives irrelevant high-confidence answers | REPRODUCED_DEPLOYED | 2026-09-18T08:15:53.887Z |
| PIT-F033 | MEDIUM | PASS | Invitation and application controls lose legibility | VERIFIED_FIXED_DEPLOYED | 2026-09-18T08:22:34.248Z |
| PIT-F034 | MEDIUM | PASS | Marketplace trackers misrepresent discovery data | VERIFIED_FIXED_DEPLOYED | 2026-09-18T08:25:20.771Z |
| PIT-F035 | LOW | PASSED_OVER | Activation dashboard CTA reaches root | FIXTURE_PRECONDITION_UNAVAILABLE | 2026-09-18T07:41:11.969Z |
| PIT-F036 | LOW | PASSED_OVER | Grant emails omit context or address the wrong role | EXTERNAL_MAILBOX_AND_EVENT_FIXTURE_UNAVAILABLE | 2026-09-18T08:11:48.581Z |
| PIT-F038 | MEDIUM | PASS | Fresh submission missing from Lifecycle history | VERIFIED_FIXED_DEPLOYED | 2026-09-18T08:30:43.588Z |
| PIT-F039 | MEDIUM | PASS | Return clears public pitch search | VERIFIED_FIXED_DEPLOYED | 2026-09-18T08:10:44.977Z |
| PIT-F040 | LOW | PASS | Corrected form values retain stale error summaries | VERIFIED_FIXED_DEPLOYED | 2026-09-18T07:40:14.324Z |
| PIT-F041 | MEDIUM | PASSED_OVER | Project bid table clips decision actions at 1024 | FIXTURE_PRECONDITION_UNAVAILABLE | 2026-09-18T07:57:07.266Z |

The machine-readable companion file preserves target URLs, evidence paths, notes, browser, viewport, and API provenance for each entry.
