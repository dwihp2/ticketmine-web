import { db } from '../connection';
import { users, sessions, accounts } from '../../auth-schema';

const clearUsers = async () => {
  console.log('🧹 Starting user data cleanup...');

  try {
    // Clear data in order of dependencies (child tables first)
    console.log('🗑️  Clearing sessions...');
    const deletedSessions = await db.delete(sessions);
    console.log(`✅ Cleared ${deletedSessions.rowCount || 0} sessions`);

    console.log('🗑️  Clearing accounts...');
    const deletedAccounts = await db.delete(accounts);
    console.log(`✅ Cleared ${deletedAccounts.rowCount || 0} accounts`);

    console.log('🗑️  Clearing users...');
    const deletedUsers = await db.delete(users);
    console.log(`✅ Cleared ${deletedUsers.rowCount || 0} users`);

    console.log('🎉 User data cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Error clearing user data:', error);
    throw error;
  }
};

export default clearUsers;

// Run the cleanup if this file is executed directly
if (require.main === module) {
  clearUsers()
    .then(() => {
      console.log('✅ User cleanup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ User cleanup failed:', error);
      process.exit(1);
    });
}
