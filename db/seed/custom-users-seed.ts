import { db } from '../connection';
import { users } from '../schema/schema';

const seedCustomUsers = async () => {
  console.log('🌱 Starting custom user seeding...');

  try {
    console.log('👤 Seeding custom users...');

    // Main user
    const mainUser = await db.insert(users).values({
      id: 'main_user_1',
      email: 'dwihp.165@gmail.com',
      name: 'Dwi HP',
      emailVerified: true,
      image: 'https://api.dicebear.com/7.x/avatars/svg?seed=dwihp',
      role: 'user',
      phone: '+1234567890',
      bio: 'Main user account',
      location: 'Indonesia',
    }).returning();

    console.log('✅ Main user created:', mainUser[0].email);

    // Admin user
    const adminUser = await db.insert(users).values({
      id: 'admin_user_1',
      email: 'dwi@admin.com',
      name: 'Dwi Admin',
      emailVerified: true,
      image: 'https://api.dicebear.com/7.x/avatars/svg?seed=dwiadmin',
      role: 'admin',
      phone: '+1234567891',
      bio: 'System administrator',
      location: 'Indonesia',
    }).returning();

    console.log('✅ Admin user created:', adminUser[0].email);

    // Organizer user
    const organizerUser = await db.insert(users).values({
      id: 'organizer_user_1',
      email: 'dwi@organizer.com',
      name: 'Dwi Organizer',
      emailVerified: true,
      image: 'https://api.dicebear.com/7.x/avatars/svg?seed=dwiorganizer',
      role: 'organizer',
      phone: '+1234567892',
      bio: 'Event organizer',
      location: 'Indonesia',
    }).returning();

    console.log('✅ Organizer user created:', organizerUser[0].email);

    console.log('🎉 Custom user seeding completed successfully!');
    console.log('\n📝 User accounts created (use Better Auth registration/login):');
    console.log('1. Main User:');
    console.log('   Email: dwihp.165@gmail.com');
    console.log('   Role: user');
    console.log('\n2. Admin User:');
    console.log('   Email: dwi@admin.com');
    console.log('   Role: admin');
    console.log('\n3. Organizer User:');
    console.log('   Email: dwi@organizer.com');
    console.log('   Role: organizer');
    console.log('\n⚠️  Note: Use Better Auth registration flow to set passwords');

  } catch (error) {
    console.error('❌ Error seeding custom users:', error);
    throw error;
  }
};

export default seedCustomUsers;

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedCustomUsers()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}
