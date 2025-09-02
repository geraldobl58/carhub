import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (order matters due to FKs)
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const passwordHash = await bcrypt.hash("password123", 10);
      return prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          name: faker.person.fullName(),
          phone: faker.phone.number({ style: "international" }),
          password: passwordHash,
          role: "user",
        },
      });
    })
  );

  // Create listings for users
  for (const user of users) {
    const numListings = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < numListings; i++) {
      await prisma.listing.create({
        data: {
          userId: user.id,
          title: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
          description: faker.lorem.sentences({ min: 1, max: 3 }),
          make: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          year: faker.number.int({ min: 1998, max: 2024 }).toString(),
          km: faker.number.int({ min: 0, max: 250_000 }),
          price: new Prisma.Decimal(
            faker.number.int({ min: 20000, max: 300000 })
          ),
          fuel: faker.helpers.arrayElement([
            "gasoline",
            "ethanol",
            "diesel",
            "hybrid",
            "electric",
          ]),
          gearbox: faker.helpers.arrayElement(["manual", "automatic", "cvt"]),
          color: faker.color.human(),
          city: faker.location.city(),
          state: faker.location.state(),
          status: faker.helpers.arrayElement(["draft", "active", "sold"]),
          images: Array.from({
            length: faker.number.int({ min: 1, max: 5 }),
          }).map(() => faker.image.url()),
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log("Seed completed");
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
