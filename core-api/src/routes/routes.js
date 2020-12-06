import {Router} from 'express';
import UsuarioController from '../app/controllers/UsuarioController';
import authMiddleware from '../middlewares/authorize'

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'bem-vindo ao planetatur' });
});

//Usuário
routes.post('/usuario/login', UsuarioController.login);
routes.use(authMiddleware); //obrigatório a validação do token a partir daqui
routes.get('/usuario/session', UsuarioController.session);
routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.show);
routes.post('/usuario', UsuarioController.store);
routes.put('/usuario', UsuarioController.update);
routes.delete('/usuario/:id', UsuarioController.delete);

//Perfil


export default routes;