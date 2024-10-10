import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('assessment', 'root', 'khalid@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export default sequelize;