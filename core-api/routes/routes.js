import {Router} from 'express';
import UsuarioController from '../bin/controllers/UsuarioController';
import authMiddleware from '../middlewares/auth' 

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

//Usuário
routes.post('/usuario/authenticate', UsuarioController.authenticate);
routes.use(authMiddleware);
routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);
routes.get('/usuario/:id', UsuarioController.get);

//Perfil


export default routes;