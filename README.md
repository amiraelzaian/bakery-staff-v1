# Golden Crumbs — Staff App (`bakery-staff-v1`)

The internal staff portal for Golden Crumbs Bakery. A single React (Vite) app with three role-based experiences — **Admin**, **Baker**, and **Delivery** — sharing one login and one codebase, routed and gated by role.

## Tech Stack

- **Build tool:** Vite 8
- **UI:** React 19, Tailwind CSS 4
- **Routing:** React Router 8/7
- **State:** Zustand (client state), TanStack Query (server state)
- **Tables:** TanStack Table
- **Forms:** React Hook Form + `@hookform/resolvers`
- **Charts:** Recharts (analytics dashboard)
- **Auth:** Google OAuth (`@react-oauth/google`) + email/password
- **Notifications:** Sonner (toasts)
- **Icons:** Lucide

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [BakeryApi backend](https://github.com/amiraelzaian/BakeryApi)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root (Vite requires the `VITE_` prefix):

```env
VITE_PUBLIC_API_URL=https://bakeryapi-production.up.railway.app/api/v1
VITE_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Development

```bash
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173).

### Build & Preview

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
  routes/
    AppRoutes.jsx        # All routes, grouped by role, gated by ProtectedRoute
    ProtectedRoute.jsx
  layouts/
    AdminLayout.jsx
    BakerLayout.jsx (BakeryLayout.jsx)
    DeliveryLayout.jsx
  pages/
    Admin/                # Dashboard, Orders, OrderDetails, Products, Categories,
                            Users, Coupons, Offers, Analytics, Logs, Profile
    Baker/                 # Dashboard, Orders, OrderDetails, Profile
    Delivery/              # Dashboard, Deliveries, DeliveryDetails, Profile
    Login/
  components/
    orders/                # OrdersTable, OrderActions, AssignStaffModal, status config
    coupons/                # CouponsTable, CouponModals
    offers/                 # OffersList, OfferModals
    dashboard/               # StatCard, RangeToggle, ChartCard, chart components
    profile/                  # ProfileForm (shared across all three roles)
    common/                    # SearchInput, Pagination, ScrollToTop
  services/                     # One file per resource (orders, coupons, offers,
                                   users, products, categories, dashboard, profile, auth)
  hooks/                         # React Query hooks wrapping each service
  stores/                        # Zustand stores (auth/session, UI state)
```

## Roles & Access

| Role       | Can do |
|------------|--------|
| **Admin**  | Full access — manage products, categories, users, coupons, seasonal offers, view analytics, audit logs, all orders, accept orders, assign staff |
| **Baker**  | View orders assigned to them, accept/prepare/mark orders ready, mark pickup orders picked up |
| **Delivery** | View deliveries assigned to them, mark orders as delivered |

Access is enforced in two layers:
1. **Frontend:** `ProtectedRoute` checks the logged-in user's role before rendering a route group.
2. **Backend:** every endpoint is additionally protected by `protect` + `allowedTo(...roles)` middleware — the frontend gating is a UX convenience, not the security boundary.

## Key Features

- **Order management** — search by partial ID, filter by status, accept orders and assign a baker, assign delivery staff, track status history
- **Coupons** — create/edit/delete discount codes with expiry dates
- **Seasonal offers** — offers scoped to either a single category or a specific set of products
- **Analytics dashboard** — revenue, sales over time, order status breakdown, best-selling products, average order value, new customers over time, active offers, top-rated products — all filterable by time range
- **User management** — view/manage customer and staff accounts
- **Audit logs** — track admin actions
- **Profile** — shared profile page (info, address, password change) across all three roles, with role-specific activity stats (orders accepted/deliveries completed this week, currently assigned)

## Deployment

Deployed on Vercel. Set the same environment variables in the Vercel project settings as in `.env`:

```env
VITE_PUBLIC_API_URL=https://bakeryapi-production.up.railway.app/api/v1
VITE_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Backend API: [BakeryApi](https://github.com/amiraelzaian/BakeryApi) — deployed on Railway.

