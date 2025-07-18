import { pgTable, serial, varchar, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

// Event Table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  date: timestamp('date'),
  time: varchar('time', { length: 20 }),
  venue: varchar('venue', { length: 255 }),
  location: varchar('location', { length: 255 }),
  genre: varchar('genre', { length: 100 }),
  artist: varchar('artist', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
});

// Ticket Type Table
export const ticketTypes = pgTable('ticket_types', {
  id: serial('id').primaryKey(),
  event_id: integer('event_id').references(() => events.id),
  type: varchar('type', { length: 100 }),
  price: integer('price'),
  available: integer('available'),
  is_vip: boolean('is_vip').default(false),
});

// User Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  password: varchar('password', { length: 255 }),
  name: varchar('name', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
});

// Order Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  event_id: integer('event_id').references(() => events.id),
  total: integer('total'),
  status: varchar('status', { length: 50 }),
  created_at: timestamp('created_at').defaultNow(),
});

// Order Item Table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id),
  ticket_type_id: integer('ticket_type_id').references(() => ticketTypes.id),
  quantity: integer('quantity'),
  price: integer('price'),
});
