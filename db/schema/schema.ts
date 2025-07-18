import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  index,
  uniqueIndex
} from 'drizzle-orm/pg-core';

// Users Table - Enhanced with profile information
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  avatar_url: varchar('avatar_url', { length: 500 }),
  bio: text('bio'),
  location: varchar('location', { length: 255 }),
  date_of_birth: timestamp('date_of_birth'),
  is_active: boolean('is_active').default(true),
  is_verified: boolean('is_verified').default(false),
  email_verified_at: timestamp('email_verified_at'),
  last_login_at: timestamp('last_login_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
  phoneIdx: index('users_phone_idx').on(table.phone),
}));

// Venues Table - Separate venue management
export const venues = pgTable('venues', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }),
  country: varchar('country', { length: 100 }).notNull(),
  postal_code: varchar('postal_code', { length: 20 }),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  capacity: integer('capacity'),
  description: text('description'),
  amenities: text('amenities'), // JSON string of amenities
  contact_email: varchar('contact_email', { length: 255 }),
  contact_phone: varchar('contact_phone', { length: 20 }),
  website: varchar('website', { length: 500 }),
  image_url: varchar('image_url', { length: 500 }),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  nameIdx: index('venues_name_idx').on(table.name),
  cityIdx: index('venues_city_idx').on(table.city),
  locationIdx: index('venues_location_idx').on(table.latitude, table.longitude),
}));

// Event Categories Table
export const eventCategories = pgTable('event_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  color: varchar('color', { length: 7 }), // Hex color code
  icon: varchar('icon', { length: 50 }),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
});

// Artists Table
export const artists = pgTable('artists', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  bio: text('bio'),
  genre: varchar('genre', { length: 100 }),
  image_url: varchar('image_url', { length: 500 }),
  website: varchar('website', { length: 500 }),
  social_media: text('social_media'), // JSON string of social media links
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  nameIdx: index('artists_name_idx').on(table.name),
  genreIdx: index('artists_genre_idx').on(table.genre),
}));

// Events Table - Enhanced with more fields
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  short_description: varchar('short_description', { length: 500 }),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date'),
  doors_open: timestamp('doors_open'),
  venue_id: integer('venue_id').references(() => venues.id).notNull(),
  category_id: integer('category_id').references(() => eventCategories.id),
  primary_artist_id: integer('primary_artist_id').references(() => artists.id),
  age_restriction: varchar('age_restriction', { length: 10 }), // '18+', '21+', 'All Ages'
  dress_code: varchar('dress_code', { length: 255 }),
  image_url: varchar('image_url', { length: 500 }),
  banner_url: varchar('banner_url', { length: 500 }),
  status: varchar('status', { length: 50 }).default('draft'), // draft, published, cancelled, postponed
  is_featured: boolean('is_featured').default(false),
  max_tickets_per_user: integer('max_tickets_per_user').default(10),
  sale_start_date: timestamp('sale_start_date'),
  sale_end_date: timestamp('sale_end_date'),
  total_capacity: integer('total_capacity'),
  sold_tickets: integer('sold_tickets').default(0),
  created_by: integer('created_by').references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  nameIdx: index('events_name_idx').on(table.name),
  venueIdx: index('events_venue_idx').on(table.venue_id),
  categoryIdx: index('events_category_idx').on(table.category_id),
  statusIdx: index('events_status_idx').on(table.status),
  startDateIdx: index('events_start_date_idx').on(table.start_date),
  featuredIdx: index('events_featured_idx').on(table.is_featured),
}));

// Event Artists Table - Many-to-many relationship
export const eventArtists = pgTable('event_artists', {
  id: serial('id').primaryKey(),
  event_id: integer('event_id').references(() => events.id).notNull(),
  artist_id: integer('artist_id').references(() => artists.id).notNull(),
  role: varchar('role', { length: 50 }).default('performer'), // headliner, support, guest
  order: integer('order').default(0),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  eventArtistIdx: index('event_artists_event_artist_idx').on(table.event_id, table.artist_id),
}));

// Ticket Types Table - Enhanced with more pricing options
export const ticketTypes = pgTable('ticket_types', {
  id: serial('id').primaryKey(),
  event_id: integer('event_id').references(() => events.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  base_price: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
  fees: decimal('fees', { precision: 10, scale: 2 }).default('0.00'),
  total_available: integer('total_available').notNull(),
  remaining_available: integer('remaining_available').notNull(),
  min_purchase: integer('min_purchase').default(1),
  max_purchase: integer('max_purchase').default(10),
  is_vip: boolean('is_vip').default(false),
  perks: text('perks'), // JSON string of VIP perks
  sale_start_date: timestamp('sale_start_date'),
  sale_end_date: timestamp('sale_end_date'),
  is_active: boolean('is_active').default(true),
  sort_order: integer('sort_order').default(0),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  eventIdx: index('ticket_types_event_idx').on(table.event_id),
  activeIdx: index('ticket_types_active_idx').on(table.is_active),
}));

// Promotional Codes Table
export const promotionalCodes = pgTable('promotional_codes', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  discount_type: varchar('discount_type', { length: 20 }).notNull(), // percentage, fixed_amount
  discount_value: decimal('discount_value', { precision: 10, scale: 2 }).notNull(),
  minimum_purchase: decimal('minimum_purchase', { precision: 10, scale: 2 }),
  maximum_discount: decimal('maximum_discount', { precision: 10, scale: 2 }),
  usage_limit: integer('usage_limit'),
  used_count: integer('used_count').default(0),
  valid_from: timestamp('valid_from').notNull(),
  valid_until: timestamp('valid_until').notNull(),
  applicable_events: text('applicable_events'), // JSON array of event IDs
  is_active: boolean('is_active').default(true),
  created_by: integer('created_by').references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  codeIdx: uniqueIndex('promo_codes_code_idx').on(table.code),
  validityIdx: index('promo_codes_validity_idx').on(table.valid_from, table.valid_until),
}));

// Orders Table - Enhanced with more details
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  order_number: varchar('order_number', { length: 50 }).notNull().unique(),
  user_id: integer('user_id').references(() => users.id).notNull(),
  event_id: integer('event_id').references(() => events.id).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  fees: decimal('fees', { precision: 10, scale: 2 }).default('0.00'),
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0.00'),
  discount: decimal('discount', { precision: 10, scale: 2 }).default('0.00'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  promo_code_id: integer('promo_code_id').references(() => promotionalCodes.id),
  status: varchar('status', { length: 50 }).default('pending'), // pending, confirmed, cancelled, refunded
  payment_method: varchar('payment_method', { length: 50 }),
  payment_status: varchar('payment_status', { length: 50 }).default('pending'),
  payment_reference: varchar('payment_reference', { length: 255 }),
  billing_address: text('billing_address'), // JSON string
  confirmed_at: timestamp('confirmed_at'),
  cancelled_at: timestamp('cancelled_at'),
  refunded_at: timestamp('refunded_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  orderNumberIdx: uniqueIndex('orders_order_number_idx').on(table.order_number),
  userIdx: index('orders_user_idx').on(table.user_id),
  eventIdx: index('orders_event_idx').on(table.event_id),
  statusIdx: index('orders_status_idx').on(table.status),
  createdAtIdx: index('orders_created_at_idx').on(table.created_at),
}));

// Order Items Table - Enhanced with ticket details
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id).notNull(),
  ticket_type_id: integer('ticket_type_id').references(() => ticketTypes.id).notNull(),
  quantity: integer('quantity').notNull(),
  unit_price: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  total_price: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  orderIdx: index('order_items_order_idx').on(table.order_id),
  ticketTypeIdx: index('order_items_ticket_type_idx').on(table.ticket_type_id),
}));

// Tickets Table - Individual ticket instances
export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  ticket_number: varchar('ticket_number', { length: 50 }).notNull().unique(),
  order_item_id: integer('order_item_id').references(() => orderItems.id).notNull(),
  holder_name: varchar('holder_name', { length: 255 }),
  holder_email: varchar('holder_email', { length: 255 }),
  qr_code: varchar('qr_code', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('valid'), // valid, used, cancelled, transferred
  used_at: timestamp('used_at'),
  transferred_to: integer('transferred_to').references(() => users.id),
  transferred_at: timestamp('transferred_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  ticketNumberIdx: uniqueIndex('tickets_ticket_number_idx').on(table.ticket_number),
  qrCodeIdx: uniqueIndex('tickets_qr_code_idx').on(table.qr_code),
  orderItemIdx: index('tickets_order_item_idx').on(table.order_item_id),
  statusIdx: index('tickets_status_idx').on(table.status),
}));

// Waitlists Table - For sold-out events
export const waitlists = pgTable('waitlists', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id).notNull(),
  event_id: integer('event_id').references(() => events.id).notNull(),
  ticket_type_id: integer('ticket_type_id').references(() => ticketTypes.id),
  quantity: integer('quantity').notNull(),
  status: varchar('status', { length: 50 }).default('waiting'), // waiting, notified, expired
  notified_at: timestamp('notified_at'),
  expires_at: timestamp('expires_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userEventIdx: index('waitlists_user_event_idx').on(table.user_id, table.event_id),
  eventIdx: index('waitlists_event_idx').on(table.event_id),
  statusIdx: index('waitlists_status_idx').on(table.status),
}));

// Resale Listings Table - Ticket resale marketplace
export const resaleListings = pgTable('resale_listings', {
  id: serial('id').primaryKey(),
  ticket_id: integer('ticket_id').references(() => tickets.id).notNull(),
  seller_id: integer('seller_id').references(() => users.id).notNull(),
  asking_price: decimal('asking_price', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).default('active'), // active, sold, cancelled, expired
  expires_at: timestamp('expires_at'),
  sold_to: integer('sold_to').references(() => users.id),
  sold_at: timestamp('sold_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  ticketIdx: uniqueIndex('resale_listings_ticket_idx').on(table.ticket_id),
  sellerIdx: index('resale_listings_seller_idx').on(table.seller_id),
  statusIdx: index('resale_listings_status_idx').on(table.status),
}));

// Analytics Events Table - For tracking user behavior
export const analyticsEvents = pgTable('analytics_events', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  event_type: varchar('event_type', { length: 100 }).notNull(),
  event_data: text('event_data'), // JSON string of event data
  page_url: varchar('page_url', { length: 500 }),
  user_agent: varchar('user_agent', { length: 500 }),
  ip_address: varchar('ip_address', { length: 45 }),
  session_id: varchar('session_id', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  eventTypeIdx: index('analytics_events_event_type_idx').on(table.event_type),
  userIdx: index('analytics_events_user_idx').on(table.user_id),
  createdAtIdx: index('analytics_events_created_at_idx').on(table.created_at),
}));

// Support Tickets Table - Customer support system
export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  ticket_number: varchar('ticket_number', { length: 50 }).notNull().unique(),
  user_id: integer('user_id').references(() => users.id).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  description: text('description').notNull(),
  priority: varchar('priority', { length: 20 }).default('medium'), // low, medium, high, urgent
  status: varchar('status', { length: 50 }).default('open'), // open, in_progress, resolved, closed
  category: varchar('category', { length: 100 }),
  assigned_to: integer('assigned_to').references(() => users.id),
  resolved_at: timestamp('resolved_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  ticketNumberIdx: uniqueIndex('support_tickets_ticket_number_idx').on(table.ticket_number),
  userIdx: index('support_tickets_user_idx').on(table.user_id),
  statusIdx: index('support_tickets_status_idx').on(table.status),
  priorityIdx: index('support_tickets_priority_idx').on(table.priority),
}));

// Support Messages Table - Support ticket conversation
export const supportMessages = pgTable('support_messages', {
  id: serial('id').primaryKey(),
  ticket_id: integer('ticket_id').references(() => supportTickets.id).notNull(),
  user_id: integer('user_id').references(() => users.id).notNull(),
  message: text('message').notNull(),
  is_internal: boolean('is_internal').default(false),
  attachments: text('attachments'), // JSON array of file URLs
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  ticketIdx: index('support_messages_ticket_idx').on(table.ticket_id),
  userIdx: index('support_messages_user_idx').on(table.user_id),
}));
