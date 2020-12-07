import Empresa from '../models/Empresa';

/** Classe para controlle dos métodos do empresa **/
class EmpresaController{

    //método para visualização de todas as empresas
    async index(req, res){
        return res.json(await Empresa.index());
    }

    //método para recuperação dos dados da empresa
    async show(req, res){
        return res.json(await Empresa.show(req.params));
    }

    //método para manuteção dos dados da empresa
    async store(req, res){
        return res.json(await Empresa.store(req.body));
    }

    //método para manuteção dos dados da empresa
    async update(req, res){
        return res.json(await Empresa.update(req.body));
    }

    //método para exclusão da empresa
    async delete(req, res){
        return res.json(await Empresa.delete(req.params));
    }

}

export default new EmpresaController();