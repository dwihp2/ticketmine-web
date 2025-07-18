import { db } from "../connection";
import { events } from "../schema/schema";

async function seedEvents() {
  await db.insert(events).values([
    {
      name: "Rock Fest 2025",
      description: "Annual rock music festival featuring top bands.",
      date: new Date("2025-08-15T18:00:00Z"),
      time: "18:00",
      venue: "Stadium A",
      location: "New York, NY",
      genre: "Rock",
      artist: "The Rolling Codes",
    },
    {
      name: "Jazz Nights",
      description: "Smooth jazz evening with renowned artists.",
      date: new Date("2025-09-10T20:00:00Z"),
      time: "20:00",
      venue: "Jazz Club B",
      location: "Chicago, IL",
      genre: "Jazz",
      artist: "Miles Data",
    },
    {
      name: "Pop Explosion",
      description: "Pop music extravaganza for all ages.",
      date: new Date("2025-07-25T19:30:00Z"),
      time: "19:30",
      venue: "Arena C",
      location: "Los Angeles, CA",
      genre: "Pop",
      artist: "Taylor Syntax",
    },
  ]);
  console.log("Dummy events seeded!");
  process.exit(0);
}

seedEvents().catch((err) => {
  console.error(err);
  process.exit(1);
});
