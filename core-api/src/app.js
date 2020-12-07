import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import routes from './routes/routes';

dotenv.config();

class App{

    constructor(){
        this.server = express();

        //conexão com o banco de dados
        mongoose.connect(process.env.DATABASE_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        const db = mongoose.connection;
        db.on('error', (err) => console.log(err));
        db.on('open', () => console.log('Database connected!'));

        this.middleware();
        this.routes();
    }

    middleware(){
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }

}

export default new App().server;