import { Schema, model} from 'mongoose';

/** Schema para negócios relacionados ao perfil **/
const perfilSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do perfil']
    },
    descricao: {
        type: String,
        required: [true, 'Informe a descrição do perfil'],
        index: true,
        unique: true
    }
});

//local para criação de métodos
perfilSchema.method({});

//local para criação de métodos estáticos
perfilSchema.static({

    //recupera todos os perfis
    index: async function(){
        return await this.find();
    },

    //recupera o perfil pelo identificador
    show: async function(data){
        const { id } = data;

        //valida o identificador
        if(id == null || id == undefined){
            return { message: 'O identificador do perfil é obrigatório' };
        }

        //recupera o perfil
        return await this.findOne({ _id: id }).then((perfil) => {
            if(!perfil){
                return { message: 'Perfil não encontrado.'}
            };
            return perfil;
        }).catch((error) => {
            return { message: error.message};
        });
    },

    //realiza a manutenção dos dados do perfil
    store: async function(data){
        try {
            const { nome } = data;

            //valida se já existe o perfil
            const perfil = await this.findOne({ nome });
            if(perfil){
                return { message: 'Perfil já cadastrado.'};
            }

            //grava o perfil
            return await this.create(data).then((perfil)=>{
                return perfil;
            }).catch((error) => {
                return { message: error.message};
            });
        } catch (error) {
            return { message: error.message};
        }
    },

    //realiza a manutenção dos dados do perfil
    update: async function(data){
        try {
            const { id } = data;

            //valida o identificador
            if(id == null || id == undefined){
                return { message: 'O identificador do perfil é obrigatório' };
            }

            //realiza a atualização
            return await this.findOneAndUpdate({ _id : id }, data, { new : true }).then((perfil) => {
                if(!perfil){
                    return { message: 'Perfil não encontrado.'}
                };
                return perfil;
            }).catch((error) => {
                return { message: error.message};
            });
        } catch (error) {
            return { message: error.message};
        }
    },

    //exclui o perfil pelo identificador
    delete: async function(data){
        const { id } = data;

        //valida o identificador
        if(id == null || id == undefined){
            return { message: 'O identificador do perfil é obrigatório' };
        }

        //excluir o perfil
        return await this.findOneAndDelete({ _id: id }).then((perfil) => {
            if(!perfil){
                return { message: 'Perfil não encontrado.'}
            };
            return { message: 'Perfil excluído com sucesso.'}
        }).catch((error) => {
            return { message: error.message};
        });
    },

});

export default model('Perfil', perfilSchema)