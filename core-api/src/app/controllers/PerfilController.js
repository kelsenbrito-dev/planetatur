import Perfil from '../models/Perfil';

/** Classe para controlle dos métodos do perfil **/
class PerfilController{

    //método para visualização de todas os perfils
    async index(req, res){
        return res.json(await Perfil.index());
    }

    //método para recuperação dos dados do perfil
    async show(req, res){
        return res.json(await Perfil.show(req.params));
    }

    //método para manuteção dos dados do perfil
    async store(req, res){
        return res.json(await Perfil.store(req.body));
    }

    //método para manuteção dos dados do perfil
    async update(req, res){
        return res.json(await Perfil.update(req.body));
    }

    //método para exclusão do perfil
    async delete(req, res){
        return res.json(await Perfil.delete(req.params));
    }

}

export default new PerfilController();