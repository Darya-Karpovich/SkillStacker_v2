import { createSeedClient } from '@snaplet/seed';

const main = async () => {
  const seed = await createSeedClient();

  await seed.$resetDatabase();

  const { skill } = await seed.skill([
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces.',
    },
    {
      name: 'TypeScript',
      description:
        'A typed superset of JavaScript that compiles to plain JavaScript.',
    },
    {
      name: 'Node.js',
      description:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    },
    {
      name: 'GraphQL',
      description: 'A query language for your API.',
    },
    {
      name: 'Prisma',
      description: 'A modern database toolkit.',
    },
    {
      name: 'Next.js',
      description: 'The React framework for production.',
    },
    {
      name: 'Tailwind CSS',
      description:
        'A utility-first CSS framework for rapidly building custom designs.',
    },
    {
      name: 'Vercel',
      description: 'Develop. Preview. Ship.',
    },
    {
      name: 'PostgreSQL',
      description: "The world's most advanced open source database.",
    },
    {
      name: 'Docker',
      description: 'Empowering App Development for Developers.',
    },
  ]);

  const { user } = await seed.user((x) => x(5));

  await seed.userSkill(
    (x) =>
      x(30, () => ({
        experienceValue: Math.floor(Math.random() * 11) / 2,
        likeValue: Math.floor(Math.random() * 11) / 2,
      })),
    { connect: { user, skill } },
  );

  console.log('Database seeded successfully!');

  process.exit();
};

main();
