import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL ? `${process.env.DATABASE_URL}?sslmode=require` : 'sqlite::memory:',
  {
    logging: false,
    dialectOptions: process.env.DATABASE_URL
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
  },
);
sequelize;

export { sequelize };
