import { db } from '../connection';
import { users } from '../schema/schema';
import { eq } from 'drizzle-orm';

const verifyCustomUsers = async () => {
  console.log('🔍 Verifying custom users...');

  try {
    const emails = [
      'dwihp.165@gmail.com',
      'dwi@admin.com',
      'dwi@organizer.com'
    ];

    for (const email of emails) {
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (user.length > 0) {
        const userInfo = user[0];
        console.log(`✅ Found user: ${userInfo.email}`);
        console.log(`   - Name: ${userInfo.name}`);
        console.log(`   - Role: ${userInfo.role}`);
        console.log(`   - Active: ${userInfo.is_active}`);
        console.log(`   - Verified: ${userInfo.is_verified}`);
        console.log(`   - Created: ${userInfo.created_at}`);
        console.log('');
      } else {
        console.log(`❌ User not found: ${email}`);
      }
    }

    console.log('🎉 Verification completed!');

  } catch (error) {
    console.error('❌ Error verifying users:', error);
    throw error;
  }
};

export default verifyCustomUsers;

// Run the verification if this file is executed directly
if (require.main === module) {
  verifyCustomUsers()
    .then(() => {
      console.log('✅ Verification completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Verification failed:', error);
      process.exit(1);
    });
}
