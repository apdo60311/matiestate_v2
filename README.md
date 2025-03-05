# Matiestate API v2
# Property Management System API
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Express](https://img.shields.io/badge/Express-4.x-green)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3.x-orange)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)


This project is a refactored version of the Matiestate application built with Express and TypeScript. It offers a RESTful API for managing buildings, lands, apartments, materials, patterns, and more.

## 🚀 Features

- **Tenant Management**: Complete tenant lifecycle management
- **Billing System**: Sophisticated billing with tax handling and refund management
- **Contract Management**: Handle contract terminations and evacuations
- **Owner Expenses**: Track and manage property owner expenses
- **Advanced Routing**: Type-safe route handling with middleware support
- **Database Integration**: Robust TypeORM implementation with PostgreSQL

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18.x or higher
- PostgreSQL 13.x or higher
- TypeScript 4.9.x or higher
- npm or yarn package manager


## 🏗️ Project Structure

- **Configuration & Environment**  
  - Environment variables are defined in [`.env`](.env)  
  - Environment validation is implemented in [`src/config/env.ts`](src/config/env.ts)

- **Database Configuration**  
  - Database connectivity and settings are handled in [`src/config/db.config.ts`](src/config/db.config.ts) and [`src/config/db.ts`](src/config/db.ts)

- **Controllers & Routes**  
  - API endpoints are defined in the [src/controllers](src/controllers) and linked via [src/routes](src/routes) (e.g., [`src/routes/land.routes.ts`](src/routes/land.routes.ts), [`src/routes/apartment.routes.ts`](src/routes/apartment.routes.ts), [`src/routes/material.routes.ts`](src/routes/material.routes.ts))

- **Dependency Injection**  
  - The application uses Inversify for DI, with configuration in [`src/di/di.config.ts`](src/di/di.config.ts) and type definitions in [`src/di/di.types.ts`](src/di/di.types.ts)

- **Data Transfer Objects (DTOs)**  
  - DTOs for request validation are in the [src/dtos](src/dtos) directory (e.g., [`src/dtos/create-building.dto.ts`](src/dtos/create-building.dto.ts))

- **Entities & Types**  
  - The domain models are defined in [src/entities](src/entities)  
  - Custom types and interfaces are available in [src/types](src/types) (e.g., [`src/types/owner.types.ts`](src/types/owner.types.ts))

- **Middlewares & Validators**  
  - Authentication and validation logic is implemented in [src/middlewares](src/middlewares) and [src/validators](src/validators)

- **Utilities & Logging**  
  - Utility functions and logging are available in [src/utils](src/utils)  
  - The logger is configured in [`src/utils/logger.ts`](src/utils/logger.ts)

- **Testing**  
  - Test cases are located in the [tests](tests) directory

- **Other Config Files**  
  - Linting rules: [`.eslintrc`](.eslintrc)  
  - TypeScript configuration: [`tsconfig.json`](tsconfig.json)  
  - Docker scripts: [`docker-compose.yaml`](docker-compose.yaml) and [`docker-dev.sh`](docker-dev.sh)


## 📡 API Routes

### Report Routes
#### Financial Reports
- `GET /api/reports/balance-sheet` - Get balance sheet report
- `GET /api/reports/profit-and-loss` - Get profit and loss statement
- `GET /api/reports/trial-balance` - Get trial balance report
- `GET /api/reports/general-ledger` - Get general ledger report
- `GET /api/reports/journal-ledger` - Get journal ledger entries

#### Inventory Reports
- `GET /api/reports/inventory` - Get current inventory status
- `GET /api/reports/ending-inventory` - Get ending inventory report
- `GET /api/reports/item-activity` - Get item activity report
- `GET /api/reports/sales` - Get sales report

#### Property Reports
- `POST /api/reports/units/leased` - Get leased units report
- `POST /api/reports/units/sold` - Get sold units report
- `POST /api/reports/units/vacated` - Get vacated units report
- `POST /api/reports/units/reserved` - Get reserved units report

#### Land Reports
- `POST /api/reports/land/leased` - Get leased land report
- `POST /api/reports/land/sold` - Get sold land report

#### Villa Reports
- `POST /api/reports/villa/leased` - Get leased villas report
- `POST /api/reports/villa/sold` - Get sold villas report

#### Other Reports
- `POST /api/reports/contracts` - Get contracts report
- `POST /api/reports/changes-flats-rent-pricing` - Get rent pricing changes report
- `POST /api/reports/complaints` - Get complaints report
- `POST /api/reports/warehouse` - Get warehouse report
- `POST /api/reports/worker` - Get worker report
- `POST /api/reports/owner-expenses` - Get owner expenses report
- `GET /api/reports/worker/service-report` - Get worker service report
- `GET /api/reports/customer/reports` - Get customer reports

### Booking Routes
- `GET /api/bookings/` - Get all bookings (Requires authentication)

### Calendar Routes
- `GET /api/calendar/` - Get calendar by category and building ID (Requires authentication)

### Properties Routes
- `POST /api/properties/leased` - Get leased property report

### Parking Routes
- `POST /api/parking/leased` - Get leased parking report

### Response Format
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string | null
}
```

### Authentication
All routes marked with "Requires authentication" need a valid JWT token in the Authorization header:
```http
Authorization: Bearer <your-jwt-token>



##  🛠️ Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. ```npm install ```

3. Ensure your environment variables in `.env` are properly set. The file is validated by `env.ts` at startup.

3. Building the Project
```python npm run build```

5. Running the Project

**In Development**
```bash
npm run start:dev
```

**In Production**
```bash
npm start
```

**Using Docker**
```bash
chmod +x docker-dev.sh
./docker-dev.sh start
```
### 📚 API Documentation
API documentation is generated via Swagger. You can view the documentation at:

[http://localhost:4000/api/v1/]()