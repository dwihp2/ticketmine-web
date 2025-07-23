import { db } from '../connection';
import { users, sessions } from '../../auth-schema';
import { venues, eventCategories, artists } from '../schema/schema';

const seedBasicData = async () => {
  console.log('🌱 Starting basic database seeding...');

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Clearing existing data...');
    try {
      await db.delete(sessions);
      await db.delete(users);
      await db.delete(venues);
      await db.delete(eventCategories);
      await db.delete(artists);
      console.log('✅ Existing data cleared');
    } catch {
      console.log('ℹ️ No existing data to clear (tables may be empty)');
    }

    // 1. Seed Users with Better Auth compatible structure
    console.log('👤 Seeding users...');
    await db.insert(users).values([
      {
        id: 'user_1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        emailVerified: true,
        image: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
        phone: '+1234567890',
        bio: 'Music enthusiast and concert regular',
        location: 'San Francisco, CA',
        role: 'user',
      },
      {
        id: 'admin_1',
        email: 'admin@ticketmine.com',
        name: 'Admin User',
        emailVerified: true,
        image: 'https://api.dicebear.com/7.x/avatars/svg?seed=admin',
        phone: '+1234567894',
        bio: 'System administrator',
        location: 'San Francisco, CA',
        role: 'admin',
      },
      {
        id: 'organizer_1',
        email: 'organizer@ticketmine.com',
        name: 'Event Organizer',
        emailVerified: true,
        image: 'https://api.dicebear.com/7.x/avatars/svg?seed=organizer',
        phone: '+1234567895',
        bio: 'Professional event organizer',
        location: 'Los Angeles, CA',
        role: 'organizer',
      },
    ]);

    console.log('✅ Users seeded successfully');

    // 2. Seed Venues
    console.log('🏛️ Seeding venues...');
    await db.insert(venues).values([
      {
        name: 'Madison Square Garden',
        address: '4 Pennsylvania Plaza',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postal_code: '10001',
        capacity: 20000,
        description: 'The World\'s Most Famous Arena',
        contact_email: 'events@msg.com',
        contact_phone: '+1-212-465-6741',
        website: 'https://www.msg.com',
      },
      {
        name: 'Hollywood Bowl',
        address: '2301 Highland Avenue',
        city: 'Hollywood',
        state: 'CA',
        country: 'USA',
        postal_code: '90068',
        capacity: 17500,
        description: 'Iconic outdoor amphitheater in the Hollywood Hills',
        contact_email: 'info@hollywoodbowl.com',
        contact_phone: '+1-323-850-2000',
        website: 'https://www.hollywoodbowl.com',
      },
    ]);

    console.log('✅ Venues seeded successfully');

    // 3. Seed Event Categories
    console.log('🎭 Seeding event categories...');
    await db.insert(eventCategories).values([
      {
        name: 'Concert',
        description: 'Live music performances',
        color: '#FF6B6B',
        icon: 'music',
      },
      {
        name: 'Comedy',
        description: 'Stand-up comedy shows',
        color: '#4ECDC4',
        icon: 'comedy',
      },
      {
        name: 'Theater',
        description: 'Theatrical performances',
        color: '#45B7D1',
        icon: 'theater',
      },
    ]);

    console.log('✅ Event categories seeded successfully');

    // 4. Seed Artists
    console.log('🎤 Seeding artists...');
    await db.insert(artists).values([
      {
        name: 'The Midnight Express',
        bio: 'Alternative rock band known for their electrifying performances',
        genre: 'Alternative Rock',
        image_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=midnightexpress',
        website: 'https://www.themidnightexpress.com',
      },
      {
        name: 'Sarah Jazz Quartet',
        bio: 'Contemporary jazz ensemble with a modern twist',
        genre: 'Jazz',
        image_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarahjazz',
        website: 'https://www.sarahjazzquartet.com',
      },
    ]);

    console.log('✅ Artists seeded successfully');

    console.log('🎉 Basic database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export default seedBasicData;

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedBasicData()
    .then(() => {
      console.log('✅ Basic seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Basic seeding failed:', error);
      process.exit(1);
    });
}
