import { Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new Schema({
    nome: String,
    email: String,
    senha: String
});

UsuarioSchema.method({});

UsuarioSchema.static({
    getAll: function(){
        return this.find();
    },
    getById: function(_id){
        return this.findOne({ _id });
    },
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
    saveAndUpdate: async function(data){
        let usuario;
        try {
            if(data.nome == null || data.email == null
                || data.nome == undefined || data.email == undefined
                || data.senha == undefined || data.senha == undefined
                ){
                throw new Error('Dados inválidos');
            }
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
    }
});

export default model('Usuario', UsuarioSchema)