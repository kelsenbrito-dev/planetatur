import Usuario from '../models/Usuario';
import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken'

/** Classe para controlle dos métodos do usuário **/
class UsuarioController{

    //método para visualização de todas os usuários
    async index(req, res){
        let usuarios = await Usuario.getAll();
        return res.json(usuarios);
    }

    //método para recuperação dos dados do usuário
    async get(req, res){
        let usuarios = await Usuario.get( req.params.id );
        return res.json(usuarios);
    }

    //método para autententicação e recebimento do token
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

    //método para manuteção dos dados do usuário
    async store(req, res){
        let usuarios = await Usuario.saveAndUpdate(req.body);
        return res.json(usuarios);
    }

    async destroy(req, res){
        const { id } = req.params;
        await Usuario.destroy(id);
        return res.json({ message: 'Usuário excluído com sucesso'});
    }


}

export default new UsuarioController();