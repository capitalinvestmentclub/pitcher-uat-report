const RETEST_SIZES = ['360x800', '390x844', '768x1024', '1024x768', '1280x800', '1440x900'];
const RETEST_FINDINGS = {
  'PIT-F001': ['f001', 'Fresh recipient wallet readback reconciled two successful assessment captures to USD 22.75 available and USD 47.75 current balance.', 'Rendered wallet ledger and balance readback'],
  'PIT-F002': ['f002', 'A fresh USD 25 paid hire was created and cancelled through the UI; the wallet recorded both a Cancelled reservation release and a Refunded row.', 'Fresh create → cancel → wallet reconciliation'],
  'PIT-F003': ['f003', 'A fresh dividend motion used verified project profit, executed, and credited the eligible stakeholder wallet.', 'Fresh verified-profit dividend lifecycle'],
  'PIT-F004': ['f004', 'A fresh USD 1.03 Stripe sandbox checkout was cancelled in Chrome and reloaded as Failed instead of remaining Pending.', 'Fresh checkout → cancel → terminal ledger status'],
  'PIT-F005': ['f005', 'The cancelled session Join action remained on the details page and returned HTTP 410 with a no-longer-available message.', 'Cancelled-session admission denial'],
  'PIT-F006': ['f006', 'The targeted seller received the pending secondary bid and decision controls; Reject completed through the deployed UI and persisted the rejected status.', 'Seller incoming-bid visibility and rejection persistence'],
  'PIT-F007': ['f007', 'Zero-vote, tied, and all-no failed motions consistently render Rejected; the zero-vote row explains the 51% threshold.', 'Three terminal governance outcomes'],
  'PIT-F008': ['f008', 'Creator review shows the submitted URL, single-choice, multi-choice, and long-text custom answers.', 'Reviewer custom-answer readback'],
  'PIT-F009': ['f009', 'Targeted notification-template tests confirm click tracking is disabled; the deployed HTTPS review destination loaded in Chrome without a certificate interstitial.', 'Notification CTA template and deployed TLS destination'],
  'PIT-F010': ['f010', 'Weekly tracking and a newly added Seed funding-stage rule both survived save, close, and edit-modal reload.', 'Grant configuration save → close → reload'],
  'PIT-F011': ['f011', 'Blank and 501-character milestones were rejected in the rendered form and no invalid milestone was persisted.', 'Milestone boundary validation'],
  'PIT-F012': ['f012', 'Negative spend and a malformed evidence URL were blocked with specific inline validation before publication.', 'Governance report validation'],
  'PIT-F013': ['f013', 'Password recovery completed the CAPTCHA-backed submission on the deployed domain and showed the email confirmation state.', 'Deployed-domain recovery submission'],
  'PIT-F028': ['f028', 'The refunded terminated grant now reports a zero disbursement balance while retaining its terminal lifecycle state.', 'Terminated grant balance readback'],
  'PIT-F037': ['f037', 'Admin review exposed Request changes and Reject; Request changes accepted a reason and persisted Changes requested.', 'Admin publication decision lifecycle'],
};

window.PR_REVIEW_UPDATES = Object.fromEntries(
  Object.entries(RETEST_FINDINGS).map(([id, [fileId, resolution, check]]) => [id, {
    status: 'Fixed',
    resolution,
    verifiedAt: '2026-09-12',
    retest: {
      browser: 'Google Chrome',
      environment: 'deployed development',
      check,
      sizes: RETEST_SIZES.map((size) => ({ size: size.replace('x', '×'), status: 'Pass' })),
    },
    visuals: RETEST_SIZES.map((size) => ({
      src: `assets/deployed-retest-20260912/${fileId}-${size}.png`,
      capturedAt: '12 September 2026 · deployed Chrome retest',
      caption: `${id} passed at ${size.replace('x', '×')}. ${check}.`,
    })),
    fix: {
      summary: resolution,
      evidence: [{ label: 'Six-viewport Chrome evidence', url: `assets/deployed-retest-20260912/${fileId}-1440x900.png`, note: `${check}; every requested viewport run is listed above.` }],
    },
  }])
);
