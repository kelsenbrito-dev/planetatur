import Usuario from '../models/Usuario';
import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken'

class UsuarioController{

    async index(req, res){
        let usuarios = await Usuario.getAll();
        return res.json(usuarios);
    }

    async get(req, res){
        let usuarios = await Usuario.getById( req.params.id );
        return res.json(usuarios);
    }

    async authenticate(req, res){
        let usuario = await Usuario.authenticate(req.body);
        const { _id, nome, email } = usuario;
        return res.json({
            usuario:{
                _id,
                nome,
                email
            },
            token: jwt.sign({ _id }, authConfig.secret, { expiresIn: authConfig.expiresIn })
        });
    }

    async store(req, res){
        let usuarios = await Usuario.saveAndUpdate(req.body);
        return res.json(usuarios);
    }

}

export default new UsuarioController();