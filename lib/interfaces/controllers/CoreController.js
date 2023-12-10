'use strict';

const Boom = require('@hapi/boom');
const Login = require('../../application/use_cases/core/Login');
const ReqRecoverPassword = require('../../application/use_cases/core/ReqRecoverPassword');
const RecoverPassword = require('../../application/use_cases/core/RecoverPassword');
const AuthorizationController = require('./AuthorizationController');
const SendEmail = require('../../application/use_cases/nodemailer/SendEmail');
const ChangePassword = require('../../application/use_cases/core/ChangePassword');
module.exports = {
    async login(request, h) {
        const serviceLocator = request.server.app.serviceLocator;
        const { email, password } = request.payload;

        let result = await Login({ email, password }, serviceLocator);

        if (!result) {
            throw Boom.badRequest('Correo o contraseña incorrectos');
        }

        let token = await AuthorizationController.getToken({ id:result.id, email: email, role: result.role })
        delete result.password;

        
        let response = {
            statusCode: 200,
            message: "Acceso correcto",
            data: {
                token: token,
                user: result
            }
        }
        return h.response(response);
    },
    async reqRecoverPassword(request, h) {
        const serviceLocator = request.server.app.serviceLocator;
        const { email } = request.payload;

        let recoverCode = await ReqRecoverPassword({ email }, serviceLocator);

        if (recoverCode) {
            let sendEmailResult = await SendEmail({
                email: email,
                subject: "Solicitud de cambio de contraseña",
                html: `<!DOCTYPE html>
                <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <meta name="x-apple-disable-message-reformatting">
                    <title></title>
                    <style>
                        table,
                        td,
                        div,
                        h1,
                        p {
                            font-family: Arial, sans-serif;
                        }
                    </style>
                </head>
                
                <body style="margin:0;padding:0;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                        <tr>
                            <td align="center" style="padding:0;">
                                <table role="presentation"
                                    style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                                    <tr>
                                        <td align="center" style="padding:40px 0 30px 0;">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png" alt=""
                                                width="300" style="height:auto;display:block;" />
                                        </td>
                                    </tr>
                
                                    <tr>
                                        <td style="padding:36px 30px 42px 30px;background-color: #042b61;">
                                            <table role="presentation"
                                                style="width:100%;border-collapse:collapse;border:0;border-spacing:0;align-content: center;">
                                                <tr>
                                                    <td style="padding:0 0 25px 0;color:white;">
                                                        <h1 align="center"
                                                            style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                                                            Recupera Tu contraseña</h1>
                                                        <p align="center"
                                                            style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                            Hemos recibido una reciente solicitud para recuperar su contraseña</p>
                                                        <h1 align="center"
                                                            style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Tu
                                                            código de recuperación es:</h1>
                                                        <h1 align="center"
                                                            style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${recoverCode}</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:30px;background:#049474;">
                                            <table role="presentation"
                                                style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                                <tr>
                                                    <td style="padding:0;width:50%;" align="center">
                                                        <p
                                                            style="margin:0;font-size:16px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                                            Hotel Tu Descanso Emiliano Zapata<br />
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                
                </html>`
            });

            if (!sendEmailResult) {
                throw Boom.badRequest('No se pudo enviar el correo de confirmación');
            }
        }

        let response = {
            statusCode: 200,
            message: "Se ha enviado un correo con las instrucciones para recuperar la contraseña",
            data: {}
        }
        return h.response(response);
    },
    async recoverPassword(request, h) {
        const serviceLocator = request.server.app.serviceLocator;
        const { recoverCode, password } = request.payload;

        let result = await RecoverPassword({ recoverCode, password }, serviceLocator);

        if (!result) {
            throw Boom.badRequest('Código de recuperación incorrecto');
        }

        let response = {
            statusCode: 200,
            message: "Contraseña actualizada correctamente, ahora puedes iniciar sesión",
            data: {}
        }

        return h.response(response);
    },
    async changePassword(request, h) {
        const serviceLocator = request.server.app.serviceLocator;
        const { password, newPassword } = request.payload;
        const email = request.auth.credentials;
        let result = await ChangePassword({ email, password, newPassword }, serviceLocator);

        if (!result) {
            throw Boom.badRequest('Contraseña anterior incorrecta');
        }

        let response = {
            statusCode: 200,
            message: "Contraseña actualizada correctamente",
            data: {}
        }

        return h.response(response);
    },
    async verifyToken(request, h) {
        try{
            const { token } = request.query;
            let result = await AuthorizationController.verifyToken(token);
            let response = {
                statusCode: 200,
                message: "Token verificado correctamente",
                data: {
                    email: result.email
                }
            }
            return h.response(response);
        }catch(error){
            return Boom.boomify(error, { statusCode: 401, message: 'Token invalido' });
        }
    }
};
