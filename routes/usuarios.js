/*

        Ruta: /api/usuarios

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario,deleteUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/',validarJWT, getUsuarios);

router.post( '/',validarJWT, [
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('password','La password es obligatoria.').not().isEmpty(),
    check('email','El email es obligatorio.').isEmail(),
    validarCampos,
],crearUsuario);

router.delete( '/:id',validarJWT,borrarUsuario);

router.delete('/deleteUsuario/:id',validarJWT,deleteUsuario);

router.put( '/:id',validarJWT,[
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('email','El email es obligatorio.').isEmail(),
    check('role','El role es obligatorio.').not().isEmpty(),
    validarCampos,
], actualizarUsuario);

module.exports = router;