import {Router} from 'express';
import UsuarioController from '../app/controllers/UsuarioController';
import authMiddleware from '../middlewares/authorize'

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'bem-vindo ao planetatur' });
});

//Usuário
routes.post('/usuario/authenticate', UsuarioController.authenticate);
routes.use(authMiddleware); //obrigatório a validação do token a partir daqui
routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);
routes.get('/usuario/:id', UsuarioController.get);
routes.delete('/usuario/:id', UsuarioController.destroy);

//Perfil


export default routes;