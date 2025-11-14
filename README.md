# Backend Authentication & CRUD API

This repository contains a Node.js + Express + MongoDB REST API demonstrating authentication (JWT), authorization (role-based), and CRUD operations for a `Product` resource as required by the task.

## Quick start

1. Edit the `.env` and fill values to match your MongoDB connection string if needed.
2. Install dependencies: `npm install`
3. Run dev: `npm run dev` (requires nodemon) or `npm start`.

<!-- API endpoints: -->
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin only)
- PUT /api/products/:id (admin only)
- DELETE /api/products/:id (admin only)

Responses use: `{ status, message, data }` and meaningful HTTP status codes.


<!-- POSTMAN COLLECTION LINK BELOW -->
https://ismailtimileyin.postman.co/workspace/Ismail-Timileyin's-Workspace~21340dd2-a953-4de0-8fef-6b90bf0cd589/collection/46739005-056ca7ec-4d76-4046-84bf-53f0e5dc3c45?action=share&source=copy-link&creator=46739005