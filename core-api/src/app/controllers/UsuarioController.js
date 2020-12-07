import Usuario from '../models/Usuario';

/** Classe para controlle dos métodos do usuário **/
class UsuarioController{

    //método para visualização de todas os usuários
    async index(req, res){
        return res.json(await Usuario.index());
    }

    //método para recuperação dos dados do usuário
    async show(req, res){
        return res.json(await Usuario.show(req.params));
    }

    //método para autententicação e recebimento do token
    async login(req, res){
        return res.json(await Usuario.login(req.body));
    }

    //método para manuteção dos dados do usuário
    async store(req, res){
        return res.json(await Usuario.store(req.body, req.token));
    }

    //método para manuteção dos dados do usuário
    async update(req, res){
        return res.json(await Usuario.update(req.body, req.token));
    }

    async delete(req, res){
        return res.json(await Usuario.delete(req.params));
    }

    async session(req, res){
        return res.json(req.token);
    }

}

export default new UsuarioController();