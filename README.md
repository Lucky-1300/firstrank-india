# FirstRank India

Backend + client for exam, results, and ranking workflows.

## Server Setup

1. Copy env file:
   - `cp .env.example .env`
2. Update `.env` values (`MONGO_URI`, `JWT_SECRET`, `PORT`).
3. Install deps:
   - `cd server && npm install`
4. Run dev:
   - `npm run dev`
5. Run production style:
   - `npm run start:prod`

## Health Checks

- `GET /health`
- `GET /api/health`

## API Modules

- Auth: `/api/auth/*`
- Exam: `/api/exam/*`
- Result: `/api/result/*`
- Ranking: `/api/ranking/*`

## Postman Collections

- `postman/day5-security-api-tests.postman_collection.json`
- `postman/day6-exam-api-tests.postman_collection.json`
- `postman/day15-result-ranking-api-tests.postman_collection.json`
- `postman/day19-all-endpoints-tests.postman_collection.json`

## Deployment Notes

- Ensure `NODE_ENV=production` on production runtime.
- Ensure MongoDB is reachable from deployment environment.
- Set strong `JWT_SECRET`.
- Use process manager (PM2/systemd/container orchestrator) with restart policy.
