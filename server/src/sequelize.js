import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL ?? 'sqlite::memory:', {
  logging: false,
  dialectOptions_: process.env.DATABASE_URL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
});
sequelize;

export { sequelize };
