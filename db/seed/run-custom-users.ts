import seedCustomUsers from './custom-users-seed';

// Run the custom user seeding function
seedCustomUsers()
  .then(() => {
    console.log('Custom user seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Custom user seeding failed:', error);
    process.exit(1);
  });
