import Usuario from '../models/Usuario';

/** Classe para controlle dos métodos do usuário **/
class UsuarioController{

    //método para visualização de todas os usuários
    async index(req, res){
        return res.json(await Usuario.index());
    }

    //método para recuperação dos dados do usuário
    async show(req, res){
        const { id } = req.params;
        return res.json(await Usuario.show( id ));
    }

    //método para autententicação e recebimento do token
    async authenticate(req, res){
        return res.json(await Usuario.authenticate(req.body));
    }

    //método para manuteção dos dados do usuário
    async store(req, res){
        return res.json(await Usuario.store(req.body));
    }

    //método para manuteção dos dados do usuário
    async update(req, res){
        return res.json(await Usuario.update(req.body));
    }

    async delete(req, res){
        const { id } = req.params;
        return res.json(await Usuario.delete(id));
    }


}

export default new UsuarioController();