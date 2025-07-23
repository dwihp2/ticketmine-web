# Custom Seed Users Documentation

This document contains information about the custom seed users created for the TicketMine application.

## Overview

Three custom users have been created with specific roles to test different user permissions and navigation experiences.

## User Accounts

### 1. Main User Account (Standard User)
- **Email**: `dwihp.165@gmail.com`
- **Password**: `password`
- **Role**: `user`
- **Name**: Dwi HP
- **Status**: Active and verified
- **Purpose**: Standard user for testing regular user features

### 2. Admin Account
- **Email**: `dwi@admin.com`
- **Password**: `password`
- **Role**: `admin`
- **Name**: Dwi Admin
- **Status**: Active and verified
- **Purpose**: Administrator testing with full system access

### 3. Organizer Account
- **Email**: `dwi@organizer.com`
- **Password**: `password`
- **Role**: `organizer`
- **Name**: Dwi Organizer
- **Status**: Active and verified
- **Purpose**: Event organizer testing with event management capabilities

## Role Permissions

Based on the Clean Architecture implementation, each role has different navigation and feature access:

### User Role (`user`)
- Access to public events discovery
- Personal profile management
- Ticket purchasing and management
- Basic user settings

### Organizer Role (`organizer`)
- All user role capabilities, plus:
- Event creation and management
- Event analytics
- Event ticket sales management
- Organizer-specific navigation sections

### Admin Role (`admin`)
- All organizer role capabilities, plus:
- Site-wide administration
- User management
- System analytics
- Admin panel access
- Full system control

## Scripts Available

### Seed Custom Users
```bash
npm run seed:custom
```
Creates the three custom users in the database.

### Verify Users
```bash
npm run verify:users
```
Verifies that the custom users exist in the database and displays their information.

### Full Database Seed
```bash
npm run seed:full
```
Runs the comprehensive seed that includes events, venues, and other test data.

## Security Notes

- All passwords are hashed using bcrypt with a salt rounds of 10
- Email verification is set to `true` for immediate testing
- All accounts are marked as active
- Last login timestamps are set to creation time

## Testing Authentication

1. Start the development server: `npm run dev`
2. Navigate to the login page: `http://localhost:3001/login`
3. Use any of the credential sets above to test different role experiences
4. Observe different navigation menus based on user roles

## Files Created

- `db/seed/custom-users-seed.ts` - Main seeding logic
- `db/seed/run-custom-users.ts` - Script runner for custom users
- `db/seed/verify-custom-users.ts` - Verification script
- `db/seed/CUSTOM-USERS.md` - This documentation file

## Integration with Better-Auth

These users are compatible with the Better-Auth implementation:
- User data structure matches Better-Auth requirements
- Session management works with the configured auth system
- Role-based navigation integrates with the AppSidebar component
- Authentication middleware properly protects routes based on roles

## Usage in Development

These users provide immediate access to test:
- Role-based navigation (implemented via AppSidebar)
- Authentication flows
- Permission-based feature access
- User profile management
- Admin and organizer specific features

## Cleanup

To remove these users, you can run a database migration or manually delete them from the `users` table where the email matches any of the custom user emails.
