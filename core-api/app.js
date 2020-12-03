import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes';

class App{

    constructor(){
        this.server = express();

        mongoose.connect('mongodb://172.19.150.184:27017/planetatur',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const db = mongoose.connection;
        db.on('error', (err) => console.log(err));
        db.on('open', () => console.log('Database connected!'));

        this.middleware();
        this.routes();
    }

    middleware(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }

}

export default new App().server;