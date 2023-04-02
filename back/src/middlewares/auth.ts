import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const TAG = "/AUTHENTICATED ";
const TAGIsadmin = "/ISADMIN ";

export default class auth {
  public authenticated(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.cookies.session == undefined) {
        throw "Error: User is not logged in.";
      }

      const secretKey: string | undefined = process.env.JWTSECRET;
      if (!secretKey) {
        throw "Error: SecretKey is not a string.";
      }

      const decodedJwt = jwt.verify(req.cookies.session, secretKey);
      req.body.decoded = decodedJwt;

      return next();
    } catch (e) {
      console.log(TAG, e);
      res
        .status(400)
        .json({ message: "Error", code: 400, data: null, error: e });
    }
  }

  public isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      // Verifica se o usuário tem permissão de administrador
      if (req.body.decoded.user.is_admin) {
        // Se o usuário for um administrador, permite o acesso à próxima rota/middleware
        next();
      } else {
        // Se o usuário não for um administrador, retorna um erro 403 Forbidden
        // res.status(403).json({ error: 'Não autorizado', isAdmin: false });
        // res.json({ isAdmin: false });
        throw "Error: User is not admin.";
      }
    } catch (e) {
      console.log(TAGIsadmin, e);
      res
        .status(400)
        .json({ message: "Error", code: 400, data: null, error: e });
    }
  }
}
