import { Schema, model} from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';

/** Schema para negócios relacionados ao usuário **/
const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do usuário']
    },
    email: {
        type: String,
        required: [true, 'Informe o e-mail do usuário']
    },
    senha: {
        type: String,
        required: [true, 'Informe a senha do usuário']
    },
    root: {
        type: Boolean,
        default: false
    }
});

//local para criação de métodos
UsuarioSchema.method({});

//local para criação de métodos estáticos
UsuarioSchema.static({

    //recupera todos os usuários
    index: async function(){
        return await this.find();
    },

    //recupera o usuário pelo identificador
    show: async function(data){
        const { id } = data;

        //valida o identificador
        if(id == null || id == undefined){
            return { message: 'O identificador do usuário é obrigatório' };
        }

        //recupera o usuário
        return await this.findOne({ _id: id }).then((usuario) => {
            if(!usuario){
                return { message: 'Usuário não encontrado.'}
            };
            return usuario;
        }).catch((error) => {
            return error;
        });
    },

    //realiza a manutenção dos dados do usuário
    store: async function(data){
        try {
            const { email } = data;

            //valida se já existe o usuário
            const usuario = await this.findOne({ email });
            if(usuario){
                return { message: 'Usuário já cadastrado.'};
            }

            //cria o hash para a senha
            data.senha = await bcrypt.hash(data.senha, 8);

            //grava o usuário
            return await this.create(data);
        } catch (error) {
            return error;
        }
    },

    //realiza a manutenção dos dados do usuário
    update: async function(data, token){
        try {
            //cria o hash para a senha
            data.senha = await bcrypt.hash(data.senha, 8);
            if(data._id){
                //valida se o usuário é root para alterar atributo root
                if(!token.root){
                    data = {
                        _id: data._id,
                        nome: data.nome,
                        email: data.email,
                        senha: data.senha
                    };
                }

                return await this.findOneAndUpdate({ _id : data._id }, data, { new : true }).then((usuario) => {
                    if(!usuario){
                        return { message: 'Usuário não encontrado.'}
                    };
                    return usuario;
                }).catch((error) => {
                    return error;
                });
            }
            return { message: 'O identificador do usuário é obrigatório' };
        } catch (error) {
            return error;
        }
    },

    //exclui o usuário pelo identificador
    delete: async function(data){
        const { id } = data;
        //valida o identificador
        if(id == null || id == undefined){
            return { message: 'O identificador do usuário é obrigatório' };
        }

        //excluir o usuário
        return await this.findOneAndDelete({ _id: id }).then((usuario) => {
            if(!usuario){
                return { message: 'Usuário não encontrado.'}
            };
            return { message: 'Usuário excluído com sucesso.'}
        }).catch((error) => {
            return error;
        });
    },

    //realiza a autenticação do usuário
    login: async function(data){
        const { email, senha } = data;

        //valida os dados
        if(email == null || senha == null || email == undefined || senha == undefined){
            return { message: 'O e-mail e senha são obrigatórios.' };
        }

        //verifica se o usuário existe
        const usuario = await this.findOne({ email: email });
        if(!usuario){
            return { message: 'Usuário não encontrado.' };
        }else if(bcrypt.compareSync(senha, usuario.senha)){
            const { _id, nome, email } = usuario;
            return {
                usuario: {
                    _id,
                    nome,
                    email
                },
                token: jwt.sign({ usuario }, authConfig.secret, { expiresIn: authConfig.expiresIn })
            };
        }else{
            return { message: 'Senha incorreta.' };
        }
    },

});

export default model('Usuario', UsuarioSchema)