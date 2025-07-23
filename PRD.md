# TicketMine Concert Ticket App - Product Requirements Document (PRD)

## Executive Summary

TicketMine is a comprehensive concert ticket booking platform that enables users to discover, purchase, and manage tickets for live music events. The application follows a clean architecture pattern with Next.js, TypeScript, Drizzle ORM, and PostgreSQL, designed for scalability and maintainability.

## Product Overview

### Vision
To create a seamless, user-friendly platform that connects music fans with live events while providing event organizers with powerful tools to manage ticket sales and analytics.

### Mission
Build a robust, scalable ticket booking system that can handle high-traffic events while maintaining excellent user experience and data integrity.

## Target Audience

### Primary Users
- **Music Fans**: Individuals aged 18-45 who frequently attend concerts and live events
- **Event Organizers**: Concert promoters, venues, and artists who need to sell tickets

### Secondary Users
- **Venue Managers**: Staff who need to manage venue operations and check-ins
- **Customer Support**: Team members who handle user inquiries and issues

## User Personas

### 1. Public User (Anonymous/Guest)
**Profile**: Casual visitors who browse events without creating an account
- **Access Level**: Unprotected pages only
- **Typical Behavior**: 
  - Browse event listings and discover new concerts
  - View event details including venue, artists, and basic information
  - Search and filter events by date, location, genre, and artist
  - Check event availability and pricing information
  - Access general information pages (about, contact, FAQ)
- **Limitations**: 
  - Cannot purchase tickets or join waitlists
  - Cannot save favorite events or create wishlists
  - Must register/login to proceed with any transactional activities
- **User Journey**: Discovery → Interest → Registration (conversion point) → Purchase
- **Key Pages**: `/events`, `/events/discover`, `/events/[id]`, `/`, static content pages

### 2. Authenticated User (Registered Customer)
**Profile**: Registered users who want to purchase tickets and access personalized features
- **Access Level**: All public pages + protected customer features
- **Authentication Required For**:
  - Ticket purchasing and checkout process
  - Joining waitlists for sold-out events
  - Managing personal profile and preferences
  - Viewing order history and purchased tickets
  - Downloading ticket PDFs and QR codes
  - Managing ticket transfers and resales (future feature)
- **Typical Behavior**:
  - All public user behaviors PLUS
  - Purchase tickets for events
  - Manage personal account and payment methods
  - Track order status and ticket delivery
  - Join waitlists for popular events
  - Receive personalized recommendations
  - Access customer support features
- **Key Pages**: `/profile`, `/orders`, `/tickets`, checkout flow, waitlist management
- **Value Proposition**: Seamless ticket purchasing, order management, and personalized experience

### 3. Admin User (Content Manager)
**Profile**: Staff members responsible for managing the platform's content and operations
- **Access Level**: All pages + administrative dashboard and management tools
- **Responsibilities**:
  - **Event Management**: Create, update, and delete events
  - **Content Moderation**: Manage event descriptions, images, and details
  - **Venue Management**: Add and maintain venue information
  - **Artist Management**: Manage artist profiles and associations
  - **Category Management**: Organize and maintain event categories
  - **System Monitoring**: Track platform performance and user activities
- **Typical Workflows**:
  - Create new events with comprehensive details
  - Update event information, pricing, and availability
  - Manage event promotions and featured listings
  - Monitor ticket sales and event performance
  - Handle customer support escalations
  - Generate reports and analytics
- **Key Pages**: `/admin/dashboard`, `/events/manage`, `/events/create`, `/events/[id]/edit`, analytics pages
- **Access Requirements**: Special admin authentication with role-based permissions
- **Value Proposition**: Efficient content management tools with comprehensive oversight capabilities

## Core Features

### MVP Features (Phase 1-4)

#### 1. User Authentication & Management
- **Status**: ✅ COMPLETED
- User registration with email verification
- Secure login/logout functionality
- Profile management with personal information
- Password reset and recovery
- JWT-based authentication
- **Role-Based Access Control**:
  - **Public Access**: Anonymous browsing of events and static content
  - **Authenticated Access**: Ticket purchasing, order management, waitlists
  - **Admin Access**: Content management, event CRUD operations, analytics

#### 2. Database Schema & Infrastructure
- **Status**: ✅ COMPLETED
- Comprehensive database schema with 15+ tables
- Proper indexing for performance
- Relationships between entities
- Migration system setup

#### 3. Event Discovery & Browsing
- **Status**: 🔄 IN PROGRESS (Advanced discovery completed July 22, 2025)
- Browse concerts by date, location, artist, genre, venue ✅
- Advanced search and filtering capabilities ✅
- Event detail pages with comprehensive information ✅
- Enhanced event discovery interface at `/events/discover` ✅
- Real-time availability updates (TODO)
- Mobile-responsive event cards ✅

#### 4. Venue Management
- **Status**: 🔄 PLANNED
- Venue registration and management
- Location mapping and directions
- Capacity and seating information
- Venue amenities and details

#### 5. Ticket Selection & Purchase
- **Status**: 🔄 PLANNED
- Real-time ticket availability display
- Multiple ticket types (General Admission, VIP, etc.)
- Shopping cart functionality
- Secure checkout process

#### 6. Payment Processing
- **Status**: 🔄 PLANNED
- Mock payment gateway integration
- Support for multiple payment methods
- Secure transaction processing
- Order confirmation and receipts

#### 7. Order Management
- **Status**: 🔄 PLANNED
- Order history and tracking
- Downloadable tickets (PDF with QR codes)
- Email confirmations and notifications
- Refund and cancellation handling

#### 8. Customer Support
- **Status**: 🔄 PLANNED
- Contact forms and help center
- Support ticket system
- FAQ and documentation

### Advanced Features (Phase 5-7)

#### 9. Dynamic Pricing & Promotions
- **Status**: 🔄 PLANNED
- Early bird and last-minute pricing
- Promotional codes and discount management
- Group packages and bulk discounts
- Dynamic pricing based on demand

#### 10. Waitlist & Resale System
- **Status**: 🔄 PLANNED
- Waitlist for sold-out events
- Secure ticket resale marketplace
- Transfer and exchange capabilities
- Fraud prevention measures

#### 11. Multi-language & Multi-currency
- **Status**: 🔄 PLANNED
- International localization
- Currency conversion and regional pricing
- Location-based recommendations
- Regional payment methods

#### 12. Analytics & Reporting
- **Status**: 🔄 PLANNED
- Sales tracking and analytics dashboard
- User behavior tracking
- Event performance metrics
- Revenue and attendance reports

#### 13. Access Control Integration
- **Status**: 🔄 PLANNED
- QR code generation and scanning
- Venue integration APIs
- Real-time attendance tracking
- Mobile scanning capabilities

## Technical Architecture

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Backend**: Next.js API Routes with Server Actions
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: Zustand + React Query (TanStack Query)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: JWT with custom implementation
- **Deployment**: Docker containerization for VPS deployment

### Architecture Principles
- **Clean Architecture**: Separation of concerns with Views, Use Cases, and Repositories
- **Server-First Approach**: Prioritize server-side rendering and data fetching
- **Modular Design**: Easily extractable backend for future microservices migration
- **Type Safety**: Strict TypeScript implementation throughout

### Database Schema Overview

#### Core Tables (✅ COMPLETED)
1. **Users**: Enhanced user profiles with verification
2. **Venues**: Comprehensive venue management
3. **Events**: Event information with status tracking
4. **Event Categories**: Categorization system
5. **Artists**: Artist profiles and management
6. **Event Artists**: Many-to-many artist-event relationships
7. **Ticket Types**: Flexible ticket type system
8. **Promotional Codes**: Discount and promotion management
9. **Orders**: Complete order tracking
10. **Order Items**: Individual order line items
11. **Tickets**: Individual ticket instances with QR codes
12. **Waitlists**: Sold-out event waiting lists
13. **Resale Listings**: Ticket resale marketplace
14. **Analytics Events**: User behavior tracking
15. **Support Tickets**: Customer support system
16. **Support Messages**: Support conversation threads

## User Stories

### As a Public User (Anonymous/Guest)
- I want to browse upcoming concerts without creating an account so I can discover new events
- I want to filter events by genre, date, and location to find events that interest me
- I want to see detailed event information including venue, artists, and pricing before deciding to register
- I want to search for specific artists or venues to find relevant events
- I want to view event availability and pricing information to make informed decisions
- I want to easily navigate to registration when I'm ready to purchase tickets

### As an Authenticated User (Registered Customer)
- I want to purchase tickets securely with multiple payment options after logging in
- I want to join waitlists for sold-out events that I'm interested in attending
- I want to receive confirmation emails and downloadable tickets with QR codes
- I want to view my order history and manage my purchased tickets
- I want to update my profile information and payment methods
- I want to transfer or resell tickets when my plans change
- I want to receive personalized event recommendations based on my preferences
- I want to save favorite events and create wishlists for future reference
- I want to access customer support for any issues with my orders

### As an Admin User (Content Manager)
- I want to create and manage events with comprehensive details and pricing
- I want to upload and manage event images, descriptions, and promotional content
- I want to set up different ticket types with varying prices and availability
- I want to associate events with venues and artists from the database
- I want to organize events into categories for better user discovery
- I want to monitor ticket sales and revenue in real-time through analytics
- I want to manage promotional codes and discount campaigns
- I want to moderate user-generated content and handle reported issues
- I want to access comprehensive reporting tools for business insights
- I want to manage venue information and artist profiles in the system

## Implementation Timeline

### Phase 1: Foundation & Core Architecture (✅ COMPLETED)
- [x] Database schema design and implementation (16 tables with comprehensive relationships)
- [x] Database migration system properly configured
- [x] Authentication system setup with JWT and Clean Architecture
- [x] Project structure following Clean Architecture principles
- [x] Basic user management with enhanced profile fields
- [x] Comprehensive seed data with realistic test data

### Phase 2: Event Management System (✅ COMPLETED - July 22, 2025)
- [x] Database seeding with comprehensive test data
- [x] Event repository with proper database joins and filtering
- [x] Event detail repository with full venue and artist joins
- [x] Event interface updated to match new database structure
- [x] Event listing and detail UI components with proper data handling
- [x] React Query integration for client-side data fetching
- [x] Server actions for secure database operations
- [x] Image optimization with Next.js Image component
- [x] Comprehensive event card and detail card components
- [x] Event creation interface with comprehensive form
- [x] Event management interface with CRUD operations
- [x] Event creation, update, and delete repositories
- [x] Form validation and user experience enhancements
- [x] Management dashboard with event cards and actions
- [x] Event edit form with comprehensive functionality
- [x] Dedicated event edit page at `/events/[id]/edit`
- [x] EventEditForm component with pre-populated data
- [x] EventEditContainer with proper error handling
- [x] Integration with venues, artists, and event categories
- [x] Enhanced event discovery interface with search and filtering
- [x] Responsive event cards with multiple layout options
- [x] Advanced event discovery page at `/events/discover`

### Phase 3: User Interface & Experience (🔄 IN PROGRESS - Started July 22, 2025)
- [x] Responsive event discovery interface
- [x] Advanced search and filtering
- [x] Enhanced event cards with multiple layouts
- [x] ShadCN/UI component library installation (21 components)
- [x] DatePicker component implementation
- [x] Form dependencies installation (react-hook-form, zod, resolvers)
- [x] **EventForm.tsx shadcn/ui refactoring** ✅ COMPLETED (react-hook-form + zod + shadcn)
- [x] **EventEditForm.tsx shadcn/ui refactoring** ✅ COMPLETED (enhanced validation + status display)
- [x] **Sonner toast integration** ✅ COMPLETED (Event CRUD operations)
- [x] **REFACTORING-TODO.md tracking system** ✅ CREATED (21% progress tracked)
- [x] **Authentication forms refactoring** ✅ COMPLETED (LoginForm, RegisterForm with Better Auth)
- [x] **Event cards refactoring** ✅ COMPLETED (EventCard, EventDetailCard, EventManagementCard)
- [x] **Navigation system** ✅ COMPLETED (AppSidebar with role-based navigation)
- [x] **Homepage redesign** ✅ COMPLETED (Dynamic homepage with featured events)
- [x] **Date formatting standardization** ✅ COMPLETED (date-fns across all components)
- [x] **Button and Alert standardization** ✅ COMPLETED (shadcn/ui components)
- [ ] **Event detail pages with rich media** (Next Priority)
- [ ] User profile management UI
- [ ] Real-time availability updates
- [ ] Mobile-responsive design improvements
- [ ] Performance optimizations

### Phase 4: Shopping & Checkout System (🔄 PLANNED)
- [ ] Shopping cart functionality
- [ ] Secure checkout process
- [ ] Mock payment gateway integration
- [ ] Order confirmation and receipt generation
- [ ] Downloadable tickets with QR codes

### Phase 5: Advanced Features (🔄 PLANNED)
- [ ] Dynamic pricing system
- [ ] Promotional codes and discounts
- [ ] Waitlist functionality
- [ ] Ticket resale marketplace
- [ ] Multi-language support

### Phase 6: Analytics & Reporting (🔄 PLANNED)
- [ ] Event analytics dashboard
- [ ] User behavior tracking
- [ ] Sales reporting system
- [ ] Performance metrics

### Phase 7: Access Control & Integration (🔄 PLANNED)
- [ ] QR code generation and scanning
- [ ] Venue integration APIs
- [ ] Real-time attendance tracking
- [ ] Mobile scanning capabilities

### Phase 8: Testing & Deployment (🔄 PLANNED)
- [ ] Comprehensive testing suite
- [ ] Performance optimization
- [ ] Security auditing
- [ ] Docker containerization
- [ ] VPS deployment setup

## Success Metrics

### User Engagement
- Daily/Monthly Active Users
- Event page views and conversion rates
- User retention rates
- Average session duration

### Business Metrics
- Total ticket sales volume
- Revenue per event
- Customer acquisition cost
- Customer lifetime value

### Technical Metrics
- Page load times
- API response times
- System uptime
- Error rates

## Risk Assessment

### Technical Risks
- **High Traffic Events**: Risk of system overload during popular ticket sales
- **Payment Processing**: Security and compliance requirements
- **Data Integrity**: Preventing double-booking and overselling

### Business Risks
- **Competition**: Existing established platforms
- **Market Adoption**: User acquisition challenges
- **Regulatory**: Compliance with ticketing regulations

### Mitigation Strategies
- Load testing and performance optimization
- Robust error handling and monitoring
- Comprehensive security measures
- Gradual rollout and user feedback integration

## Compliance & Security

### Data Protection
- GDPR compliance for user data
- Data encryption at rest and in transit
- Regular security audits
- Privacy policy and terms of service

### Payment Security
- PCI DSS compliance considerations
- Secure payment processing
- Fraud prevention measures
- Transaction monitoring

## Future Enhancements

### Mobile App
- Native iOS and Android applications
- Push notifications for events
- Offline ticket access
- Mobile-first features

### API Platform
- Public API for third-party integrations
- Webhook system for real-time updates
- Developer portal and documentation
- Rate limiting and authentication

### Advanced Analytics
- Machine learning for recommendations
- Predictive analytics for pricing
- Customer behavior insights
- Market trend analysis

---

**Document Version**: 1.0  
**Last Updated**: July 18, 2025  
**Next Review**: Weekly updates based on implementation progress

## Change Log

### Version 1.0 (July 18, 2025)
- Initial PRD creation
- Comprehensive feature specification
- Technical architecture definition
- Database schema completion
- Implementation timeline establishment

### Version 1.1 (July 19, 2025)
- Updated Event interface to match new database structure with nested venue and artist objects
- Fixed React children rendering errors by properly structuring event data
- Implemented proper database joins in getEvents and getEventDetail functions
- Added server actions for secure database operations
- Enhanced event display components with rich data presentation
- Configured Next.js Image component for external image domains
- Updated dummy data to match new Event interface structure
- Resolved TypeScript errors across all event-related components

### Version 1.2 (July 22, 2025)
- Completed Phase 2: Event Management System with full CRUD operations
- Enhanced event discovery interface with advanced search and filtering
- Created responsive event cards with multiple layout options
- Implemented dedicated event edit functionality at `/events/[id]/edit`
- Installed comprehensive shadcn/ui component library (21 components)
- Created custom DatePicker component using Calendar + Popover composition
- Installed form dependencies: react-hook-form, @hookform/resolvers, zod, date-fns
- Created dedicated component refactoring tracking system (REFACTORING-TODO.md)
- Advanced to Phase 3: User Interface & Experience enhancements

### Version 1.3 (July 22, 2025 - Evening Update)
- **MAJOR**: Completed shadcn/ui refactoring of critical event forms
- **EventForm.tsx**: Full refactor with react-hook-form + zod + shadcn Form components
- **EventEditForm.tsx**: Enhanced refactor with status display, revenue calculation, capacity warnings
- **Sonner Integration**: Replaced console.log with proper toast notifications in event CRUD operations
- **Quality Assurance**: Build successful, zero compilation errors, dev server functional
- **Progress Tracking**: Updated REFACTORING-TODO.md with 21% completion (4/19 items complete)
- **Next Priorities**: Authentication forms (LoginForm, RegisterForm) identified for Week 1
- **Architecture**: Established proper form validation patterns and user feedback systems

### Version 1.4 (July 23, 2025)
- **User Personas**: Added comprehensive user persona definitions for three user types
- **Public User**: Anonymous browsing with access to unprotected event discovery pages
- **Authenticated User**: Registered customers with ticket purchasing and order management capabilities
- **Admin User**: Content managers with full CRUD operations and analytics access
- **User Stories**: Restructured user stories to align with the three persona types
- **Access Control**: Enhanced authentication section with role-based access control definitions
- **User Journey**: Defined clear conversion path from public browsing to authenticated purchasing

### Version 1.5 (July 23, 2025 - Better Auth Integration)
- **MAJOR**: Completed Better Auth integration with Drizzle adapter for robust authentication
- **Authentication System**: Implemented secure email/password authentication with session management
- **Clean Architecture Implementation**: Refactored authentication to follow Clean Architecture principles
- **Repository Pattern**: Created authentication use cases (loginUser, registerUser) that wrap Better Auth client calls
- **Database Schema**: Updated to use Better Auth compatible schema with proper field types and relationships
- **User Role System**: Implemented role-based access control with admin/organizer/user roles and granular permissions
- **Authentication Forms**: Completed shadcn/ui refactoring of login and register forms with proper validation
- **Homepage Redesign**: Implemented dynamic homepage with role-based content, featured events, and hero sections
- **Navigation System**: Integrated AppSidebar with role-based navigation and authentication state management
- **Code Cleanup**: Removed unused files, old migration files, and legacy authentication code
- **Testing**: Verified authentication flows work correctly with test users and proper credentials

### Version 1.6 (July 23, 2025 - Evening Update)
- **MAJOR**: Completed shadcn/ui refactoring of all event display components
- **Event Cards**: Refactored EventCard, EventDetailCard, and EventManagementCard with full shadcn/ui integration
- **Date Formatting**: Standardized all date formatting using date-fns across event components
- **Navigation Components**: Updated all container components to use shadcn/ui Button, Alert, and Dialog components
- **UX Improvements**: Enhanced loading states, error handling, and interactive elements
- **Component Consistency**: Achieved 100% shadcn/ui adoption for all critical event and authentication components
- **Architecture Completion**: Finished Clean Architecture implementation with Better Auth integration
- **Build Verification**: All components compile successfully with zero TypeScript errors
- **Performance**: Optimized component rendering with proper React patterns and memo usage

---

*This document will be updated regularly as development progresses. Each completed phase will be marked and new requirements will be added as needed.*
