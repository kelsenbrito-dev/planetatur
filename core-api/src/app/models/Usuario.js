import { Schema, model} from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';

/** Schema para negócios relacionados ao usuário **/
const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do usuário']
    },
    email: {
        type: String,
        required: [true, 'Informe o e-mail do usuário'],
        index: true,
        unique: true
    },
    senha: {
        type: String,
        required: [true, 'Informe a senha do usuário']
    },
    perfil: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Perfil',
            required: [true, 'Informe perfil do usuário']
        },
        nome: {
            type: String
        },
    },
    //no caso de parceiro a empresa é obrigatória
    parceiro: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Empresa'
        },
        nome: String
    },
    tenant: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Empresa',
            required: [true, 'Informe a tenant do usuário']
        },
        nome: String
    },
    root: {
        type: Boolean,
        default: false
    }
});

//local para criação de métodos
usuarioSchema.method({});

//local para criação de métodos estáticos
usuarioSchema.static({

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
            return { message: error.message};
        });
    },

    //realiza a manutenção dos dados do usuário
    store: async function(data, token){
        try {
            const { email } = data;

            //valida se já existe o usuário
            const usuario = await this.findOne({ email });
            if(usuario){
                return { message: 'Usuário já cadastrado.'};
            }

            //cria o hash para a senha
            data.senha = await bcrypt.hash(data.senha, 8);

            //recupera o tenant do cadastrador
            data.tenant = token.tenant;

            //grava o usuário
            return await this.create(data).then((usuario)=>{
                return usuario;
            }).catch((error) => {
                return { message: error.message};
            });
        } catch (error) {
            return { message: error.message};
        }
    },

    //realiza a manutenção dos dados do usuário
    update: async function(data, token){
        try {
            const { id } = data;

            //valida o identificador
            if(id == null || id == undefined){
                return { message: 'O identificador do usuário é obrigatório' };
            }

            //verificar se o usuário da ação é root
            if(!token.root){
                data = {
                    _id: data.id,
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha,
                    tipo: data.tipo
                };
            }

            //cria o hash para a senha
            data.senha = await bcrypt.hash(data.senha, 8);

            //realiza a atualização
            return await this.findOneAndUpdate({ _id : data.id }, data, { new : true }).then((usuario) => {
                if(!usuario){
                    return { message: 'Usuário não encontrado.'}
                };
                return usuario;
            }).catch((error) => {
                return { message: error.message};
            });
        } catch (error) {
            return { message: error.message};
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
            return { message: error.message};
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
            const { _id, nome, email, tenant } = usuario;
            return {
                usuario: {
                    _id,
                    nome,
                    email,
                    tenant
                },
                token: jwt.sign({ usuario }, authConfig.secret, { expiresIn: authConfig.expiresIn })
            };
        }else{
            return { message: 'Senha incorreta.' };
        }
    },

});

export default model('Usuario', usuarioSchema)