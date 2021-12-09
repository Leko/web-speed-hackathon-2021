import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL ?? 'sqlite::memory:', {
  logging: false,
  dialectOptions: process.env.DATABASE_URL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
});

export { sequelize };
