import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const TAG: string = "/AUTHENTICATED ";

export default class auth {
  public authenticated(req: Request, res: Response, next: any) {
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
}
