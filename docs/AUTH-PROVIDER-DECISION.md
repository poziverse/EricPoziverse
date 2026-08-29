# Auth Provider Decision — Option A (hosted)
**Date:** 2026-08-28 · Status: recommendation, awaiting operator account creation
**Contract reference:** README §"Auth architecture" — `/api/auth/signin|magic|signout`, `GET /api/me`, `/api/download/:id` signed links, `/api/billing/*`

## Recommendation: Outseta

One provider covers the full Phase 8–10 contract on a static host:

| Contract need | Outseta |
|---|---|
| Email + password sign-in | ✅ built-in member auth |
| Magic link | ✅ built-in (passwordless login links) |
| Sessions / revocation | ✅ managed sessions, admin kill switch |
| Billing: Free / Member / Patron tiers | ✅ Stripe-backed plans (3 plans = 3 tiers), upgrades/downgrades incl. via REST API |
| Dunning / lapse → Free at period end | ✅ built-in subscription lifecycle |
| Member profile + custom fields → `/api/me` | ✅ Person records with custom properties (contributions, RSVPs as custom props or CRM records) |
| Email (member digest, transactional) | ✅ built-in email tools — covers the weekly member digest without a second ESP |
| Gated delivery (short-TTL signed URLs) | ⚠️ gate at a tiny host function: verify Outseta session → 302 to signed URL (outseta verifies entitlement; the mesh/FC function issues the link) |
| Works on static FC nginx | ✅ embed/JS + REST; no server runtime needed for auth itself |

**Pricing model:** revenue-share (reported ~1% on the startup plan, ~0.5% on higher plans) rather than a fixed fee — near-zero cost before revenue exists. *(Sources: outseta.com product pages; lowcode.agency Outseta review 2026; go.outseta.com KB on plans/API.)*

**Why not the alternatives:**
- **Memberstack** — equally good auth/gating, Webflow-centric tooling, and no built-in email/CRM → still need a separate ESP for the member digest. Fine fallback if Outseta's CRM surface feels heavy. *(Sources: memberstack.com vs-Outseta page; slammedialab.com 2026 comparison; Webflow forum thread.)*
- **Clerk + Stripe/Polar** — best-in-class auth, but billing, tier UI, dunning, and entitlement checks all become custom glue; two vendors to operate. Noted by third parties as the "Clerk handles auth, Stripe Billing handles subscriptions/dunning" split. *(Source: softwarevouch.com comparison.)*
- **Ghost / newsletter-first (Option C)** — replaces or supplements the site host; conflicts with the static FC architecture we just stabilized.

**Caveat to know:** Outseta (like Memberstack) bills through **Stripe under the hood — it is not a merchant of record**. EU/UK VAT on the Patron tier remains the operator's problem. If that becomes real, add **Polar** (MoR) for digital-download sales only; memberships can stay on Outseta. Do not pre-optimize.

## Integration plan (when the operator creates the account)

1. **Outseta setup**: 3 plans named `Free` / `Member` / `Patron` (Free = $0 plan for profile capture); custom person properties: `handle`, `contributions`, `discussions`, `rsvps`.
2. **Site glue (small, one file)**: `assets/js/outseta-bridge.js` — maps Outseta auth state to the site's contract: intercept `signin.html` POST → Outseta login; `account.html` reads person record → renders `/api/me` shape; sign-out → Outseta logout. No backend needed for auth surfaces.
3. **Signed-link delivery**: one FC/host function `GET /api/download/:id` — validates the Outseta session (embedded profile JWT) + entitlement (`access` field in `DOWNLOADS[]`), then 302s to a short-TTL signed URL against the mesh (or Outseta protected file). This is the only server code in the whole plan.
4. **Webhooks** → optional: subscription events update `MEMBERS[]` count source and unlock the club page's member-count display when >50.
5. **Data minimization floor (FR-C06)**: collect email + handle only; disable Outseta analytics/marketing features we don't use; document retention in the privacy note.
6. **Rollback**: all auth surfaces already render honest unauthenticated states, so flipping providers later only touches the bridge file.

## Open sub-decisions for Eric
- [ ] Create the Outseta account (or veto → Memberstack fallback) and connect Stripe
- [ ] Set Member/Patron price points (site copy says "prices are illustrative; operator sets final numbers")
- [ ] Confirm digest sender identity (hello@poziverse.fyi)
