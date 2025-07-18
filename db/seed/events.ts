import { db } from "../connection";
import { events } from "../schema/schema";

async function seedEvents() {
  const eventData = [
    {
      name: "Rock Fest 2025",
      description: "Annual rock music festival featuring top bands.",
      start_date: new Date("2025-08-15T18:00:00Z"),
      venue_id: 1,
      location: "New York, NY",
      genre: "Rock",
      artist: "The Rolling Codes",
    },
    {
      name: "Jazz Nights",
      description: "Smooth jazz evening with renowned artists.",
      start_date: new Date("2025-09-10T20:00:00Z"),
      venue_id: 2,
      location: "Chicago, IL",
      genre: "Jazz",
      artist: "Miles Data",
    },
    {
      name: "Pop Explosion",
      description: "Pop music extravaganza for all ages.",
      start_date: new Date("2025-07-25T19:30:00Z"),
      venue_id: 3,
      location: "Los Angeles, CA",
      genre: "Pop",
      artist: "Taylor Syntax",
    },
  ];

  for (const event of eventData) {
    await db.insert(events).values(event);
  }
  console.log("Dummy events seeded!");
  process.exit(0);
}

seedEvents().catch((err) => {
  console.error(err);
  process.exit(1);
});
