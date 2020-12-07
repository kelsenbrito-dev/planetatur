import { Schema, model} from 'mongoose';

/** Schema para negócios relacionados a empresa **/
const EmpresaSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome da empresa']
    },
    cnpj: {
        type: String,
        required: [true, 'Informe o cnpj da empresa']
    },
});

//local para criação de métodos
EmpresaSchema.method({});

//local para criação de métodos estáticos
EmpresaSchema.static({

    //recupera todas as empresas
    index: async function(){
        return await this.find();
    },

    //recupera a empresa pelo identificador
    show: async function(data){
        const { id } = data;

        //valida o identificador
        if(id == null || id == undefined){
            return { message: 'O identificador da empresa é obrigatório' };
        }

        //recupera o empresa
        return await this.findOne({ _id: id }).then((empresa) => {
            if(!empresa){
                return { message: 'Empresa não encontrada.'}
            };
            return empresa;
        }).catch((error) => {
            return error;
        });
    },

    //realiza a manutenção dos dados da empresa
    store: async function(data){
        try {
            const { cnpj } = data;

            //valida se já existe o empresa
            const empresa = await this.findOne({ cnpj: cnpj });
            if(empresa){
                return { message: 'Empresa já cadastrada.'};
            }

            //grava o empresa
            return await this.create(data);
        } catch (error) {
            return error;
        }
    },

    //realiza a manutenção dos dados da empresa
    update: async function(data){
        try {
            const { _id } = data;
            if(_id){
                return await this.findOneAndUpdate({ _id: _id }, data, { new : true }).then((empresa) => {
                    if(!empresa){
                        return { message: 'Empresa não encontrada.'}
                    };
                    return empresa;
                }).catch((error) => {
                    return error;
                });
            }
            return { message: 'O identificador da empresa é obrigatório' };
        } catch (error) {
            return error;
        }
    },

    //exclui a empresa pelo identificador
    delete: async function(data){
        try {
            const { id } = data;

            //valida o identificador
            if(id == null || id == undefined){
                return { message: 'O identificador da empresa é obrigatório' };
            }

            //excluir o empresa
            return await this.findOneAndDelete({ _id: id }).then((empresa) => {
                if(!empresa){
                    return { message: 'Empresa não encontrada.'}
                };
                return { message: 'Empresa excluída com sucesso.'}
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    },

});

export default model('Empresa', EmpresaSchema)