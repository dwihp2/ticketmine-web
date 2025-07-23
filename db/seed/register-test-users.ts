import { authClient } from '../../src/lib/auth-client';

const registerTestUsers = async () => {
  console.log('🔐 Registering test users through Better Auth...');

  const testUsers = [
    {
      email: 'admin@ticketmine.com',
      password: 'password', // Plain password - Better Auth will hash it
      name: 'Admin User',
    },
    {
      email: 'john.doe@example.com',
      password: 'password', // Plain password - Better Auth will hash it
      name: 'John Doe',
    },
    {
      email: 'organizer@ticketmine.com',
      password: 'password', // Plain password - Better Auth will hash it
      name: 'Event Organizer',
    },
  ];

  for (const user of testUsers) {
    try {
      console.log(`📝 Registering ${user.email}...`);

      const { error } = await authClient.signUp.email({
        email: user.email,
        password: user.password, // Now using plain password
        name: user.name,
      });

      if (error) {
        console.log(`⚠️  ${user.email}: ${error.message}`);
      } else {
        console.log(`✅ ${user.email} registered successfully`);
      }
    } catch (err) {
      console.error(`❌ Error registering ${user.email}:`, err);
    }
  }

  console.log('🎉 Test user registration completed!');
};

export default registerTestUsers;

// Run the registration if this file is executed directly
if (require.main === module) {
  registerTestUsers()
    .then(() => {
      console.log('✅ Test users registered');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Registration failed:', error);
      process.exit(1);
    });
}
