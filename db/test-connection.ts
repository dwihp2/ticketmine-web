import { db } from './connection';

console.log('Testing database connection...');

const testConnection = async () => {
  try {
    const result = await db.execute('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' ORDER BY table_name');
    console.log('✅ Database connection successful');
    console.log('Tables found:', result.rows.map(row => row.table_name));
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

testConnection().then(() => {
  console.log('Connection test completed');
  process.exit(0);
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
