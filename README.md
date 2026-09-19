# Leadyfy OS - Prototype

Full-stack agency management SaaS prototype (Node.js, Express, MongoDB, React).

## What works
- Register / login with JWT authentication
- Role-based access control (owner, admin, employee, client) via middleware
- Client module: create, list, get, update, delete (protected, owner/admin only)
- Client schema fixed: `company_name` is consistent across form, API validation and database model
- React frontend: login page, protected Clients page with add/delete

## Needs fix / partially built
- Edit Client UI (API is ready, form is not)
- Input validation on the frontend
- Client status changes from the UI

## Missing (planned)
- Packages / Orders, Scripts, Creators, Shoots, Videos
- Payments, Expenses, Creator Payouts
- Client portal, notifications, dashboard analytics

## Run locally

Backend:
```
cd backend
npm install
node server.js
```

Frontend:
```
cd frontend
npm install
npm run dev
```

Backend needs a `.env` with MONGO_URI and JWT_SECRET.

Backend needs a `.env` with MONGO_URI and JWT_SECRET.

## Next steps
Phase 3: complete core operational modules. Phase 4: client portal. Phase 5: financials and reporting. Phase 6: QA, security and deployment.
