import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import authConfig from '../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(401).json({ error: 'token inválido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.token = decoded.usuario;
        return next();
    } catch (error) {
        res.status(401).json({ error: 'token inválido' });
    }

}