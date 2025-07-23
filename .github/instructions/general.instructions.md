---
applyTo: '**'
---
# GitHub Copilot Instructions

## Architecture Overview

This project follows Clean Architecture principles as described in "How To Achieve Agile Programming with React" by Galih Permana. The architecture emphasizes separation of concerns, dependency inversion, and testability.

## Core Principles

1. **Server-First Approach**: Always consider if data fetching or processing can be done on the server before implementing client-side solutions
2. **Clean Architecture Layers**: Maintain strict separation between Views, Use Cases, and Repositories
3. **Dependency Direction**: Dependencies should point inward (Views → Use Cases → Repositories)
4. **Framework Independence**: Business logic should not depend on React or any UI framework
5. **Type Safety**: NEVER use `any` type - always use proper TypeScript types
6. **Accessibility**: Use semantic HTML first, add ARIA only when no semantic equivalent exists
7. **Validation**: Always validate external data with Zod schemas

## Technology Stack

- **TypeScript**: Strict mode enabled - NEVER use `any` type
- **UI Components**: Shadcn/ui (primary UI library)
- **Styling**: Tailwind CSS with responsive design patterns
- **Validation**: Zod for schema validation and runtime type checking
- **Data Fetching**: TanStack Query for client state management
- **State Management**: Zustand (global state), React hooks (local state)

## Code Style Rules

- **NEVER use `any` type**: Always use proper TypeScript types with strict mode enabled
- **Function Components**: Prefer function components over class components
- **Data Validation**: Always validate external data with Zod schemas
- **Error Boundaries**: Include error and pending boundaries for all routes
- **Accessibility**: Follow accessibility best practices with ARIA attributes
- **Component Preference**: Always prefer Shadcn/ui components over custom ones

## Accessibility

Use semantic HTML first. Only add ARIA when no semantic equivalent exists:

```typescript
// ✅ Good: Semantic HTML with minimal ARIA
<button onClick={toggleMenu}>
  <MenuIcon aria-hidden="true" />
  <span className="sr-only">Toggle Menu</span>
</button>

// ✅ Good: ARIA only when needed (for dynamic states)
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  onClick={toggleMenu}
>
  Menu
</button>

// ✅ Good: Semantic form elements
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
{errors.email && (
  <p role="alert">{errors.email}</p>
)}
```

## Adding Components

Install Shadcn components when needed:

```bash
npx shadcn@latest add button card input dialog
```

## TypeScript Standards

- **Strict Mode**: Always use TypeScript strict mode with proper type definitions
- **Type Guards**: Implement proper error handling with type guards
- **Zod Integration**: Use Zod for runtime type validation and schema definitions
- **Clear Interfaces**: Define clear type definitions for all data structures
- **No Any Types**: NEVER use `any` type - always define proper types

## Tailwind CSS Guidelines

- **Responsive Design**: Use mobile-first approach with responsive utilities
- **Consistent Color Palette**: Follow design system color schemes
- **Dark Mode Support**: Implement dark mode variants where applicable
- **Semantic Structure**: Maintain semantic HTML structure with Tailwind classes
- **Container Queries**: Use container queries for component-level responsive design

## TanStack Query Integration

- **Server State**: Use for all server state management and caching
- **Query Keys**: Define consistent query key patterns
- **Error Handling**: Implement proper retry logic and error states
- **Cache Invalidation**: Implement strategic cache invalidation
- **Optimistic Updates**: Use for better user experience where appropriate

## Folder Structure

```
app/
└── src/
    └── [feature-name]/
        ├── view/
        │   ├── container/
        │   └── presentation/
        ├── usecases/
        │   └── [use-case-name].ts
        ├── repositories/
        │   └── [get/create/update/delete-feature].ts
        └── models/
            ├── interfaces/
            ├── types/
            └── dummy/
```

## Layer Descriptions

### 1. View Layer
Contains UI components divided into two sub-layers:
- **Container**: Upper layer components that wrap and orchestrate presentation components
- **Presentation**: Single, reusable components for specific UI elements

### 2. Use Cases Layer
Handles business logic through custom hooks, designed for flexibility and reusability. Handle store updates and side effects here. Avoid create store folder on feature level, use Zustand for global state management.

### 3. Repositories Layer
Middleware layer that communicates directly with backend services using React Query for state management and caching

```typescript

### 4. Models Layer
Contains all models, interfaces, types, and dummy data specific to each feature for better encapsulation

## Implementation Guidelines

### API Creation
Always use server actions when creating a new API, unless instructed to create it using the default Next.js route.

### 1. View Layer

#### Container Components
**Location**: `app/src/[feature]/view/container/`

Container components orchestrate presentation components and handle feature-level logic:

```typescript
// app/src/user/view/container/UserProfileContainer.tsx
import { useUserProfile } from "../../usecases/useUserProfile"
import { UserProfileHeader } from "../presentation/UserProfileHeader"
import { UserProfileDetails } from "../presentation/UserProfileDetails"
import { UserProfileActions } from "../presentation/UserProfileActions"
import { Skeleton } from "@/components/ui/skeleton"

export function UserProfileContainer({ userId }: { userId: string }) {
  const { data, isLoading, error } = useUserProfile(userId)
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }
  
  if (error) {
    return <div>Error loading profile</div>
  }
  
  return (
    <div className="space-y-6">
      <UserProfileHeader user={data} />
      <UserProfileDetails user={data} />
      <UserProfileActions userId={userId} />
    </div>
  )
}
```

#### Presentation Components
**Location**: `app/src/[feature]/view/presentation/`

Presentation components are single, reusable UI components:

```typescript
// app/src/user/view/presentation/UserProfileHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"
import type { UserProfile } from "../../models/interfaces/user"

interface UserProfileHeaderProps {
  user: UserProfile
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
    </Card>
  )
}
```

### 2. Use Cases Layer (Custom Hooks)

**Location**: `app/src/[feature]/usecases/`

Business logic implemented as custom hooks:

```typescript
// app/src/user/usecases/useUserProfile.ts
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '../repositories/getUserProfile'
import { useUserStore } from '@/stores/userStore'

export function useUserProfile(userId: string) {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => getUserProfile(userId),
    onSuccess: (data) => {
      // Business logic: update global state when profile is fetched
      setCurrentUser(data)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// app/src/user/usecases/useUpdateUserProfile.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserProfile } from '../repositories/updateUserProfile'
import { toast } from "@/components/ui/use-toast"
import type { UpdateUserInput } from '../models/interfaces/user'

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: UpdateUserInput) => updateUserProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', data.id] })
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

Custom hooks for Zustand state management:

// app/src/user/usecases/useUserStore.ts
import create from 'zustand'

interface UserState {
  currentUser: UserProfile | null
  setCurrentUser: (user: UserProfile | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}))

```

### 3. Repositories Layer

**Location**: `app/src/[feature]/repositories/`

CRUD operations as middleware to backend services:

```typescript
// app/src/user/repositories/getUserProfile.ts
import type { UserProfile } from '../models/interfaces/user'

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const response = await fetch(`/api/users/${userId}`, {
    next: { revalidate: 300 }, // Server-first: cache for 5 minutes
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }
  
  return response.json()
}

// app/src/user/repositories/createUser.ts
import type { CreateUserInput, User } from '../models/interfaces/user'

export async function createUser(input: CreateUserInput): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create user')
  }
  
  return response.json()
}

// app/src/user/repositories/updateUserProfile.ts
import type { UpdateUserInput, UserProfile } from '../models/interfaces/user'

export async function updateUserProfile(data: UpdateUserInput): Promise<UserProfile> {
  const response = await fetch(`/api/users/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('Failed to update user profile')
  }
  
  return response.json()
}

// app/src/user/repositories/deleteUser.ts
export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}
```

### 4. Models Layer (Feature-Specific)

**Location**: `app/src/[feature]/models/`

Feature-specific data structures for better encapsulation:

```typescript
// app/src/user/models/interfaces/user.ts
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  avatarUrl: string
  bio: string
  location: string
  isActive: boolean
}

export interface CreateUserInput {
  email: string
  name: string
  password: string
}

export interface UpdateUserInput {
  id: string
  name?: string
  bio?: string
  location?: string
  avatarUrl?: string
}

// app/src/user/models/types/user-filters.ts
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type UserRole = 'admin' | 'user' | 'guest'

export type UserFilters = {
  status?: UserStatus
  role?: UserRole
  search?: string
}

// app/src/user/models/dummy/users.ts
import type { User, UserProfile } from '../interfaces/user'

export const dummyUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // ... more dummy data
]

export const dummyUserProfile: UserProfile = {
  id: "1",
  email: "john@example.com",
  name: "John Doe",
  avatarUrl: "https://avatar.example.com/john.jpg",
  bio: "Software developer",
  location: "San Francisco, CA",
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
}
```

### 5. State Management with Zustand

Global state stores (when needed across features):

```typescript
// app/src/stores/userStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UserProfile } from '@/src/user/models/interfaces/user'

interface UserStore {
  currentUser: UserProfile | null
  isAuthenticated: boolean
  setCurrentUser: (user: UserProfile | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      setCurrentUser: (user) => set({ 
        currentUser: user, 
        isAuthenticated: !!user 
      }),
      logout: () => set({ 
        currentUser: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'user-store',
    }
  )
)
```

### 6. Server-First Implementation

Implement server-side data fetching when possible:

```typescript
// app/user/[id]/page.tsx (Next.js App Router)
import { UserProfileContainer } from '@/src/user/view/container/UserProfileContainer'
import { getUserProfile } from '@/src/user/repositories/getUserProfile'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function UserProfilePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const queryClient = new QueryClient()
  
  // Prefetch data on server
  await queryClient.prefetchQuery({
    queryKey: ['user', 'profile', params.id],
    queryFn: () => getUserProfile(params.id),
  })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileContainer userId={params.id} />
    </HydrationBoundary>
  )
}
```

## Example Feature Implementation

When implementing a new feature (e.g., "products"), create:

```
app/src/products/
├── view/
│   ├── container/
│   │   ├── ProductListContainer.tsx
│   │   └── ProductDetailContainer.tsx
│   └── presentation/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       └── ProductFilters.tsx
├── usecases/
│   ├── useProducts.ts
│   ├── useProductDetail.ts
│   ├── useCreateProduct.ts
│   └── useUpdateProduct.ts
├── repositories/
│   ├── getProducts.ts
│   ├── getProductDetail.ts
│   ├── createProduct.ts
│   ├── updateProduct.ts
│   └── deleteProduct.ts
└── models/
    ├── interfaces/
    │   └── product.ts
    ├── types/
    │   └── product-filters.ts
    └── dummy/
        └── products.ts
```

## Best Practices

### Architecture
1. **Feature Isolation**: Keep all feature-related code within its folder, including models
2. **Container/Presentation Separation**: Keep containers for orchestration and presentation for pure UI
3. **App Router**: Use server and client components appropriately
4. **Error Boundaries**: Implement error boundaries at container level
5. **React Server Components**: Use by default, client components only when needed
6. **Static Optimization**: Leverage static optimization where possible

### Development Standards
7. **Hook Composition**: Compose smaller hooks to create more complex business logic
8. **Repository Naming**: Use verb-noun pattern (getUser, createProduct, updateProfile, deleteItem)
9. **Model Organization**: Keep models close to the feature that uses them
10. **Loading States**: Always handle loading states with shadcn/ui Skeleton components
11. **Type Safety**: Import types from the feature's models folder
12. **Cross-Feature Types**: For shared types across features, consider a shared/common feature folder

### Data & State Management
13. **Server State**: Use React Server Components for direct database queries
14. **Client State**: Use React hooks for local state, Zustand for global state
15. **Optimistic Updates**: Implement where appropriate for better UX
16. **Cache Strategies**: Implement proper cache invalidation strategies
17. **React Suspense**: Use for loading states

### Security & Performance
18. **Input Validation**: All external data must be validated with Zod schemas
19. **Authentication**: Proper authentication checks on all protected routes
20. **Image Optimization**: Use next/image for all images
21. **Font Optimization**: Use next/font for custom fonts
22. **Bundle Optimization**: Implement proper code splitting
23. **Rate Limiting**: Implement on API routes where needed

### Styling & Accessibility
24. **Responsive Design**: Use Tailwind's responsive patterns consistently
25. **Dark Mode**: Support dark mode where applicable
26. **Semantic HTML**: Always use semantic HTML structure
27. **Container Queries**: Follow container queries best practices

## Implementation Process

When implementing new features, follow this systematic approach:

1. **Plan Component Hierarchy**: Design the component structure and identify server vs client components
2. **Define Types and Interfaces**: Create all necessary TypeScript types and Zod schemas
3. **Implement Server-Side Logic**: Build server actions, API routes, and database operations
4. **Build Client Components**: Create presentation components with proper TypeScript types
5. **Add Error Handling**: Implement error boundaries and proper error states
6. **Implement Responsive Styling**: Use Tailwind CSS with mobile-first approach
7. **Add Loading States**: Implement loading states with React Suspense and Skeleton components
8. **Write Tests**: Create comprehensive tests for business logic and components
9. **Validate Accessibility**: Ensure proper semantic HTML and ARIA attributes
10. **Performance Optimization**: Optimize images, fonts, and bundle size

## Import Paths

When importing within a feature:
- Use relative imports: `import { UserProfile } from '../models/interfaces/user'`
- From view to models: `../../models/interfaces/user`
- From usecases to models: `../models/interfaces/user`
- From repositories to models: `../models/interfaces/user`

When importing across features (avoid when possible):
- Use absolute imports: `import { SharedType } from '@/src/shared/models/interfaces/common'`

## Notes

- Each feature should be self-contained with its own models
- Container components should handle all data fetching and state management
- Presentation components should be pure and receive all data via props
- Use React Query for all server state management
- Implement optimistic updates for better UX
- Always consider server-side rendering for initial data
- Use Zustand only for client-side application state that needs to be shared across features