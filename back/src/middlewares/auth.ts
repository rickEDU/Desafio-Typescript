import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const TAG = "/AUTHENTICATED ";
const TAGIsadmin = "/ISADMIN ";
const TAGIsAdminOrLeader = "/ISADMINORLEADER ";

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
        .json({ message: "Error", data: null, error: e });
    }
  }

  public isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      // Verifica se o usuário tem permissão de administrador
      if (req.body.decoded.user.is_admin) {
        // Se o usuário for um administrador, permite o acesso à próxima rota/middleware
        next();
      } else {
        throw "Error: User is not admin.";
      }
    } catch (e) {
      console.log(TAGIsadmin, e);
      res
        .status(400)
        .json({ message: "Error", data: null, error: e });
    }
  }

  public isAdminOrLeader(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.decoded.user.is_admin && !req.body.decoded.user.is_leader) {
        throw "User is not Admin or Leader.";
      }
      next();
    } catch (e) {
      console.log(TAGIsAdminOrLeader, e);
      res
        .status(400)
        .json({ message: "Error", data: null, error: e });
    }
  }

  public isSelf(req: Request, res: Response, next: NextFunction) {
    try {
      // Verifica se o é ele mesmo ou administrador
      if (
        req.body.decoded.user.id !== req.params.user_id &&
        !req.body.decoded.user.is_admin
      ) {
        throw "Error: That user is not permission of alter register from outer user";
      } else {
        next();
      }
    } catch (e) {
      console.log("/IsSelf ", e);
      res.status(403).json({ message: "Error", data: null, error: e });
    }
  }
}
