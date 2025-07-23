# TicketMine 🎫

A comprehensive concert ticket booking platform built with modern technologies and clean architecture principles. TicketMine connects music fans with live events while providing event organizers with powerful tools to manage ticket sales and analytics.

## 🌟 Features

### ✅ **Completed Features**
- **User Authentication**: Secure JWT-based authentication with registration, login, and profile management
- **Event Management**: Full CRUD operations for events with advanced filtering and search
- **Event Discovery**: Enhanced discovery interface with search, filtering, and responsive design
- **Venue Management**: Comprehensive venue data with location mapping
- **Artist Management**: Artist profiles with bio, genre, and social media integration
- **Database Schema**: 16 comprehensive tables with proper relationships and indexing
- **Clean Architecture**: Separation of Views, Use Cases, and Repositories
- **Modern UI**: shadcn/ui components with Tailwind CSS and responsive design

### 🔄 **In Progress**
- Enhanced UI/UX improvements with shadcn/ui refactoring
- Real-time availability updates
- Mobile-responsive design optimizations

### 📋 **Planned Features**
- Shopping cart and secure checkout
- Payment processing with multiple payment methods
- Order management and downloadable tickets with QR codes
- Dynamic pricing and promotional codes
- Waitlist and ticket resale marketplace
- Analytics dashboard and reporting
- Multi-language and multi-currency support

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Backend**: Next.js API Routes with Server Actions
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: Zustand + React Query (TanStack Query)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: JWT with custom implementation
- **Deployment**: Docker containerization ready

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (protected)/       # Protected user routes
│   └── (public)/          # Public routes including events
├── components/            # Shared UI components
│   └── ui/               # shadcn/ui components
└── lib/                  # Utilities and configurations

db/
├── schema/               # Drizzle database schema
├── migrations/           # Database migrations
├── repositories/         # Data access layer
└── seed/                # Database seeding scripts
```

### Clean Architecture Layers
- **Views**: Container and Presentation components
- **Use Cases**: Business logic through custom hooks
- **Repositories**: Data access layer with React Query
- **Models**: TypeScript interfaces and types

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database
- npm, yarn, pnpm, or bun

### 1. Clone the Repository
```bash
git clone https://github.com/dwihp2/ticketmine-web.git
cd ticketmine-web
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/ticketmine"
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ticketmine
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_key

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your system
2. Create a database named `ticketmine`
3. Update the `.env.local` file with your database credentials

#### Option B: Docker PostgreSQL
```bash
# Run PostgreSQL in Docker
docker run --name ticketmine-postgres \
  -e POSTGRES_USER=ticketmine \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=ticketmine \
  -p 5432:5432 \
  -d postgres:15

# Update .env.local with these credentials
```

### 5. Database Migration and Seeding
```bash
# Generate and run database migrations
npm run db:generate
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

### 6. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

The application includes 16 comprehensive database tables:

### Core Tables
- **Users**: Enhanced user profiles with verification and preferences
- **Venues**: Venue management with location and capacity data
- **Events**: Event information with status tracking and rich metadata
- **Artists**: Artist profiles with bio, genre, and social media
- **Event Categories**: Categorization system for events

### Advanced Tables
- **Ticket Types**: Flexible ticket pricing and availability
- **Orders & Order Items**: Complete order tracking system
- **Tickets**: Individual ticket instances with QR codes
- **Promotional Codes**: Discount and promotion management
- **Waitlists**: Sold-out event waiting lists
- **Resale Listings**: Ticket resale marketplace
- **Analytics Events**: User behavior tracking
- **Support System**: Customer support tickets and messages

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Drizzle migrations
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with sample data
npm run db:studio       # Open Drizzle Studio (if configured)

# UI Components
npm run registry:build  # Build shadcn/ui registry
```

## 🎨 UI Components

The project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible UI components:

- ✅ 21 Components installed and configured
- ✅ Form components with react-hook-form + zod validation
- ✅ Date picker with calendar integration
- ✅ Toast notifications with Sonner
- ✅ Responsive design with Tailwind CSS

## 🔐 Authentication

JWT-based authentication system with:
- User registration and email verification
- Secure login/logout functionality
- Protected routes with middleware
- Profile management
- Password reset capabilities

## 📱 Routes

### Public Routes
- `/` - Landing page
- `/events` - Event listing
- `/events/discover` - Enhanced event discovery
- `/events/[id]` - Event details
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/profile` - User profile management
- `/events/manage` - Event management dashboard
- `/events/[id]/edit` - Event editing (for organizers)

## 🐳 Docker Deployment

### Build and Run with Docker
```bash
# Build the Docker image
docker build -t ticketmine-web .

# Run the container
docker run -p 3000:3000 -e DATABASE_URL="your_database_url" ticketmine-web
```

### Docker Compose (with PostgreSQL)
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://ticketmine:password@db:5432/ticketmine
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=ticketmine
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=ticketmine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🧪 Testing

```bash
# Run unit tests (when configured)
npm run test

# Run integration tests (when configured)
npm run test:integration

# Run end-to-end tests (when configured)
npm run test:e2e
```

## 📈 Performance

- **Next.js 15**: Latest features with App Router and Turbopack
- **Server-First**: Optimized server-side rendering and data fetching
- **React Query**: Efficient client-side caching and synchronization
- **Image Optimization**: Next.js Image component with responsive images
- **Code Splitting**: Automatic code splitting for optimal loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the Clean Architecture principles
4. Ensure type safety with TypeScript
5. Test your changes thoroughly
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines
- Follow the established folder structure
- Use TypeScript for all new code
- Implement proper error handling
- Add appropriate tests
- Update documentation as needed

## 📋 Development Roadmap

See [PRD.md](./PRD.md) for the complete Product Requirements Document and detailed implementation timeline.

### Current Phase: Phase 3 - User Interface & Experience
- ✅ Event discovery interface enhancement
- 🔄 Authentication forms refactoring with shadcn/ui
- 📋 Shopping cart and checkout system (Phase 4)
- 📋 Advanced features and analytics (Phase 5-7)

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Clean Architecture principles**
