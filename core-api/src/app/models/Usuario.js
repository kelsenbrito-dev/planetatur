import { Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

/** Schema para negócios relacionados ao usuário **/
const UsuarioSchema = new Schema({
    nome: String,
    email: String,
    senha: String
});

//local para criação de métodos
UsuarioSchema.method({});

//local para criação de métodos estáticos
UsuarioSchema.static({

    //recupera todos os usuários
    getAll: function(){
        return this.find();
    },

    //recupera o usuário pelo identificador
    get: function(_id){
        //valida o identificador
        if(_id == null || _id == undefined){
            throw new Error('O campo identificador é obrigatório');
        }
        let usuario = this.findOne({ _id });
        if(usuario == null){
            throw new Error('Usuário inexistente.');
        }
        return this.findOne({ _id });
    },

    //realiza a autenticação do usuário
    authenticate: async function(data){
        if(data.email == null || data.senha == null || data.email == undefined || data.senha == undefined){
            throw new Error('Dados inválidos');
        }
        let usuario = await this.findOne({ email : data.email });
        if(!usuario){
            throw new Error('Usuário não encontrado.')
        }else if(bcrypt.compareSync(data.senha, usuario.senha)){
            return usuario;
        }else{
            throw new Error('Usuário não encontrado.')
        }
    },

    //realiza a manutenção dos dados do usuário
    saveAndUpdate: async function(data){
        let usuario;
        try {

            //valida os dados para gravação/alteração
            if(data.nome == null || data.email == null
                || data.nome == undefined || data.email == undefined
                || data.senha == undefined || data.senha == undefined
                ){
                throw new Error('Dados inválidos');
            }

            //cria o hash para a senha
            data.senha = await bcrypt.hash(data.senha, 8);
            if(data._id){
                usuario = await this.findOneAndUpdate({ _id : data._id }, data, { new : true });
            }else{
                usuario = await this.create(data);
            }
            return usuario;
        } catch (error) {
            throw new Error(error);
        }
    },

    //exclui o usuário pelo identificador
    destroy: async function(id){
        //valida o identificador
        if(id == null || id == undefined){
            throw new Error('O campo identificador é obrigatório');
        }

        //recupera o usuário
        let usuario = this.getById(id);
        if(!usuario){
            throw new Error('Usuário inexistente.');
        }

        //excluir o usuário
        await this.deleteOne(usuario);
    }

});

export default model('Usuario', UsuarioSchema)