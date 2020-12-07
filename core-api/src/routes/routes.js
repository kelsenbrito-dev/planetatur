import {Router} from 'express';
import UsuarioController from '../app/controllers/UsuarioController';
import EmpresaController from '../app/controllers/EmpresaController';
import PerfilController from '../app/controllers/PerfilController';
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

//Empresa
routes.get('/empresa', EmpresaController.index);
routes.get('/empresa/:id', EmpresaController.show);
routes.post('/empresa', EmpresaController.store);
routes.put('/empresa', EmpresaController.update);
routes.delete('/empresa/:id', EmpresaController.delete);

//Perfil
routes.get('/perfil', PerfilController.index);
routes.get('/perfil/:id', PerfilController.show);
routes.post('/perfil', PerfilController.store);
routes.put('/perfil', PerfilController.update);
routes.delete('/perfil/:id', PerfilController.delete);


export default routes;