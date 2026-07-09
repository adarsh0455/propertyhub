# PropertyHub - Luxury Real Estate Marketplace

> Industry-level premium marketplace to buy, sell, and rent verified properties across India.

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.19.0-black)
![MongoDB](https://img.shields.io/badge/MongoDB-6.15.0-green)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24.14-black)

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [API Routes](#api-routes)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Screenshots / Pages Overview](#screenshots--pages-overview)
- [Development Notes](#development-notes)

---

## About the Project

**PropertyHub** is a full-stack real estate marketplace built with Next.js App Router. It provides a premium, institutional-grade platform where property owners, agents, and buyers can list, discover, and manage real estate assets. The application supports role-based access control, admin-level property approval workflows, and cloud-based media management.

### Core Philosophy

The platform is engineered with corporate-grade design patterns — striped down UI layers, blockchain-inspired terminology, escrow-grade security semantics, and real-time compliance tracking. PropertyHub targets Tier-1 and Tier-2 Indian corridors with verified listings and direct owner-to-buyer pipelines.

---

## Key Features

### For Buyers / Tenants
- Browse verified property listings (only `APPROVED` properties are visible)
- Advanced property search with filters: location, category, price range
- Property detail pages with image galleries and full specifications
- Market insights, stats, and testimonials

### For Sellers / Owners / Agents
- Role-based seller dashboard showing all listed properties
- Post new property wizard with multi-image Cloudinary upload
- Amenity selection with checkboxes
- Real-time property status tracking (PENDING / APPROVED / REJECTED)

### For Admins
- Admin dashboard with complete property oversight
- Approve / Reject pending property submissions
- Platform-wide analytics and property management
- Protected routes via middleware and server-side checks

### Authentication & Session
- Credentials-based login with bcrypt password hashing
- NextAuth.js v4 (JWT strategy) with MongoDB adapter
- Role-aware session callbacks (`USER`, `OWNER`, `AGENT`, `ADMIN`)
- Secure logout and protected route guards

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.7 (App Router) |
| **Runtime** | React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + Custom CSS |
| **Database** | MongoDB (via Prisma + native MongoClient) |
| **ORM** | Prisma Client 6.19.0 (schema-first, MongoDB provider) |
| **Authentication** | NextAuth v4 + bcryptjs |
| **Image Upload** | Cloudinary |
| **Validation** | Zod v4 |
| **Animation** | Framer Motion |
| **3D / Graphics** | Three.js + React Three Fiber |
| **UI Utilities** | Radix UI, clsx, tailwind-merge, lucide-react |
| **Form Handling** | React Hook Form |
| **Notifications** | React Hot Toast |

---

## Project Structure

```
project/
├── prisma/
│   └── schema.prisma          # Prisma schema (MongoDB provider)
├── public/
│   └── {svg assets}           # Static images and SVGs
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, auth provider, navbar, footer)
│   │   ├── page.tsx           # Homepage (hero, search, categories, featured, cities, stats)
│   │   ├── globals.css        # Global styles
│   │   ├── about/
│   │   │   └── page.tsx       # About Us page
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact page
│   │   ├── login/
│   │   │   └── page.tsx       # Login page
│   │   ├── register/
│   │   │   └── page.tsx       # Registration page
│   │   ├── properties/
│   │   │   ├── page.tsx       # Property listings with filters
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Property detail page
│   │   ├── post-property/
│   │   │   └── page.tsx       # Post new property wizard
│   │   ├── sellerdashboard/
│   │   │   └── page.tsx       # Seller/Owner/Agent dashboard
│   │   ├── admin/
│   │   │   └── dashboard/
│   │   │       └── page.tsx   # Admin dashboard
│   │   ├── actions/           # Server Actions
│   │   │   ├── getProperties.ts
│   │   │   ├── login.ts
│   │   │   └── register.ts
│   │   └── api/               # API Routes
│   │       ├── auth/[...nextauth]/
│   │       │   └── route.ts   # NextAuth handler
│   │       ├── properties/
│   │       │   ├── route.ts   # GET (list) / POST (create)
│   │       │   ├── [id]/
│   │       │   │   └── route.ts   # GET single property
│   │       │   └── [id]/status/
│   │       │       └── route.ts   # PATCH property status
│   │       └── admin/properties/
│   │           └── route.ts   # GET (admin) / PUT (status update)
│   ├── component/
│   │   ├── AuthProvider.tsx    # Session wrapper
│   │   ├── hero.tsx           # Hero section
│   │   ├── navbar.tsx         # Responsive navigation
│   │   ├── footer.tsx         # Site footer
│   │   ├── searchBar.tsx      # Advanced search bar
│   │   ├── categories.tsx     # Property categories grid
│   │   ├── cities.tsx         # Marquee city showcase
│   │   ├── stats.tsx          # Platform statistics
│   │   ├── testimonials.tsx   # User testimonials
│   │   ├── featuredProperties.tsx
│   │   ├── propertycard.tsx   # Property listing card
│   │   └── FloatingLines.tsx
│   ├── lib/
│   │   ├── auth.ts            # NextAuth options config
│   │   ├── db.ts              # MongoDB client singleton + retry logic
│   │   ├── prisma.ts          # Prisma client instance
│   │   └── utils.ts           # Utility functions
│   ├── proxy.ts               # Proxy server configuration
│   └── types/
│       └── next-auth.d.ts     # NextAuth type extensions
├── middleware.ts              # Route guard middleware
├── next.config.mjs            # Next.js config (Cloudinary image domain)
├── package.json
└── tsconfig.json
```

---

## Database Schema

Defined in `prisma/schema.prisma`. MongoDB is used as the datasource.

### Users Collection (`User`)
```prisma
model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          String    @default("USER")  // USER, OWNER, AGENT, ADMIN
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  properties    Property[]
  accounts      Account[]
  sessions      Session[]
}
```

### Properties Collection (`Property`)
```prisma
model Property {
  id          String          @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  price       Float
  location    String
  category    String          // Flat, Villa, Plot, Commercial
  beds        Int             @default(0)
  baths       Int             @default(0)
  sqft        Int             @default(0)
  amenities   String[]        // Checkbox values
  images      String[]        // Cloudinary URLs
  userId      String          @db.ObjectId
  user        User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  status      PropertyStatus  @default(PENDING)   // PENDING, APPROVED, REJECTED

  propertyImages PropertyImage[]
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}
```

### Property Images (`PropertyImage`)
```prisma
model PropertyImage {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  url        String
  propertyId String   @db.ObjectId
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
}
```

### NextAuth Required Models
- `Account` — OAuth provider accounts
- `Session` — Active sessions
- `VerificationToken` — Email verification tokens

### Status Enum
```prisma
enum PropertyStatus {
  PENDING
  APPROVED
  REJECTED
}
```

---

## Authentication & Authorization

### Configuration Locations
| File | Purpose |
|------|---------|
| `src/lib/auth.ts` | NextAuth options (credentials provider, JWT callbacks, role mapping) |
| `src/app/api/auth/[...nextauth]/route.ts` | NextAuth API handler with MongoDB adapter |
| `src/component/AuthProvider.tsx` | Client-side session provider wrapper |
| `middleware.ts` | Route-level authorization for `/admin/*` and `/sellerdashboard/*` |

### Role-Based Access Control
| Route | Allowed Roles |
|-------|--------------|
| `/admin/dashboard` | `ADMIN` only |
| `/sellerdashboard` | `OWNER`, `AGENT`, `ADMIN` |
| `/post-property` | `OWNER`, `AGENT` |
| `/properties`, `/about`, `/contact`, `/` | Public |

### Session Flow
1. User submits credentials on `/login`
2. NextAuth `CredentialsProvider` validates against MongoDB `User` collection
3. Password comparison via `bcryptjs`
4. JWT token stores `id` and `role` through custom callbacks
5. Middleware intercepts protected routes and redirects unauthorized users

### Registration
- Server Action: `src/app/actions/register.ts`
- Password hashed with bcrypt (12 rounds)
- Validates email uniqueness before insert

---

## API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/properties` | Public | Fetch all `APPROVED` properties |
| `GET` | `/api/properties?admin=true` | ADMIN | Fetch all properties regardless of status |
| `POST` | `/api/properties` | Auth | Create new property (status: PENDING) |
| `GET` | `/api/properties/[id]` | Public | Fetch single property by ID |
| `PATCH` | `/api/properties/[id]/status` | Auth | Update property status |
| `GET` | `/api/admin/properties` | ADMIN | Admin list all properties |
| `PUT` | `/api/admin/properties` | ADMIN | Update property status (approve/reject) |

---

## Setup & Installation

### Prerequisites
- Node.js >= 20
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### Step 1: Clone & Install
```bash
git clone <repository-url>
cd project
npm install
```

### Step 2: Environment Variables
Create a `.env` file in the root directory:

```env
DATABASE_URL="mongodb://<user>:<password>@<host>:<port>/propertyhub?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 3: Database
```bash
npx prisma generate
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | MongoDB connection string |
| `NEXTAUTH_SECRET` | Yes | NextAuth JWT encryption secret |
| `NEXTAUTH_URL` | Yes | Base URL of the application |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name for image uploads |
| `CLOUDINARY_API_KEY` | No | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | No | Cloudinary API secret |

---

## Screenshots / Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, SearchBar, Categories, Featured Properties, Cities, Stats, Testimonials, Market Insights |
| Property Listings | `/properties` | Filterable grid of approved properties |
| Property Details | `/properties/[id]` | Full property info with image gallery |
| Login | `/login` | Client-side login with NextAuth |
| Register | `/register` | Account creation with role selection |
| Post Property | `/post-property` | Multi-step property listing form |
| Seller Dashboard | `/sellerdashboard` | Owner/Agent property management |
| Admin Dashboard | `/admin/dashboard` | Property approval / rejection |
| About | `/about` | Brand story and market impact |
| Contact | `/contact` | Contact form and operational channels |

---

## Development Notes

### MongoDB Connection Strategy
The project uses a **dual-layer MongoDB access pattern**:

1. **Prisma Client** (`src/lib/prisma.ts`) for typed ORM operations
2. **Native MongoDB Client** (`src/lib/db.ts`) for direct collection access (used in API routes and server actions)

A custom `withDbRetry()` wrapper provides exponential backoff for transient MongoDB errors (`Topology is closed`, `MongoServerSelectionError`, `MongoNetworkError`).

### Cloudinary Integration
- Multiple image upload supported in post-property wizard
- Upload preset: `property_preset`
- Image URLs stored as strings in the `images` array

### Property Status Workflow
1. `OWNER` / `AGENT` creates a property → `status = PENDING`
2. Property does **not** appear on listings until admin approves
3. `ADMIN` changes status to `APPROVED` or `REJECTED`
4. Public listing page only queries `status: "APPROVED"`

### Prisma Schema Notes
- MongoDB ObjectId is used for all primary keys
- Cascade delete is configured on User → Property and Property → PropertyImage relations
- Prisma is used primarily for schema definition and type generation, while runtime queries use native MongoDB collections for flexibility

---

## License

Private — All Rights Reserved © 2026 PropertyHub Core Registry Engine.
