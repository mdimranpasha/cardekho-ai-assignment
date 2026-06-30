# Smart Car Shortlist Assistant

## Project Overview
Smart Car Shortlist Assistant is an MVP for confused car buyers who want a shortlist they can trust. The application collects a buyer's budget, preferred body type, fuel type, and top buying priority, then returns ranked car recommendations with reasons and a side-by-side comparison workflow.

## Features
- Buyer preference form for budget, body type, fuel type, and priority
- Top recommendation list with match scores and recommendation reasons
- Compare flow for 2 to 3 selected cars
- Backend-owned image URLs with frontend fallback handling
- H2 in-memory seed dataset with 25 Indian cars
- Swagger UI and H2 console for backend inspection

## Architecture
- `backend/`: Spring Boot monolith with layered architecture
- `frontend/`: React SPA with Parcel and Tailwind CSS
- `docker-compose.yml`: orchestrates both services for local end-to-end startup

## Folder Structure
```text
cardekho-ai-assignment/
├─ backend/
│  ├─ Dockerfile
│  ├─ pom.xml
│  └─ src/
├─ frontend/
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ src/
│  └─ static/images/
├─ docker-compose.yml
└─ README.md
```

## Tech Stack
- Backend: Spring Boot 3, Java 21, Maven, Spring Web, Spring Data JPA, Validation, H2, Lombok
- Frontend: React, Parcel, Tailwind CSS
- Containers: Docker, Docker Compose

## API List
Base backend URL:
- `http://localhost:8081/cardekho`

Endpoints:
- `GET /api/cars`
- `POST /api/recommendations`
- `POST /api/compare`

Swagger UI:
- `http://localhost:8081/cardekho/swagger-ui/index.html`

H2 Console:
- `http://localhost:8081/cardekho/h2-console`

## How Recommendation Engine Works
The backend scores every seeded car against buyer preferences using deterministic weighted rules:
- Budget fit
- Body type match
- Fuel type match
- Safety contribution
- Mileage contribution
- Priority-specific boost

The highest-scoring cars are sorted, tie-broken, and the top 5 are returned with human-readable reasons.

## How to Run using Docker Compose
Prerequisite:
- Docker Desktop or Docker Engine must be installed
- Docker must be running before executing the compose command

Run from the repository root:

```bash
docker compose up --build
```

Application URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`

Notes:
- The frontend is configured to call `http://localhost:8081/cardekho`
- The backend exposes APIs under the `/cardekho` context path

## Run without Docker
If Docker is unavailable, the project can still be started locally.

Backend:
```bash
cd backend
mvnw.cmd spring-boot:run
```

Frontend:
```bash
cd frontend
npm install
npm start
```

Application URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`
- Swagger UI: `http://localhost:8081/cardekho/swagger-ui/index.html`
- H2 Console: `http://localhost:8081/cardekho/h2-console`

## Deployment
The frontend uses environment-based API configuration.

Local development:
- Parcel reads `frontend/.env`
- Local Docker continues using `localhost` automatically
- The local API URL is `http://localhost:8081/cardekho`

Production:
- Set `REACT_APP_API_BASE_URL` to the deployed backend base URL before building or starting the frontend
- Example:

```bash
REACT_APP_API_BASE_URL=https://your-backend-domain/cardekho
```

Notes:
- No backend API paths were changed
- Docker Compose remains unchanged
- Local Docker development still works with the same setup as before

## Future Improvements
- Add focused unit and integration tests for ranking and compare flows
- Add filters and sorting on the frontend
- Add richer fallback/placeholder handling for static assets
- Add pagination or browsing for the full car catalog

## What AI Helped Generate
- Initial backend scaffolding and API structure
- Frontend component scaffolding and UI iterations
- Docker and Compose setup
- README draft structure

## What Was Manually Reviewed
- Backend runtime correctness and compile health
- DTO and service contract consistency
- Recommendation and compare flow behavior
- Frontend layout quality and API integration
- Static image path alignment with backend seed data

## What Was Deliberately Left Out
- Authentication and login
- Admin workflows
- Payments
- Microservices
- Spring Security and JWT
- Persistent production database
