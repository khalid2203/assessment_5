import express, { NextFunction, Request, Response } from 'express';
import sequelize from './src/config/database';
import Userdetails from './src/models/Userdetails';
const CORS = require('cors');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes'

dotenv.config();

const app = express();
app.use(express.json());



app.use('/', userRoutes);


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await Userdetails.sync({ force: false });

        app.listen(3000, () => {
            console.log('Server is running http://localhost:3000');
        });
    } catch (error: any) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();