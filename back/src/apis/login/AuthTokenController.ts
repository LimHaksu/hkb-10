import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

export default (req: Request, res: Response) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Something is not right", user });
    }
    req.login(user, { sessioin: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // jwt.sign('token내용', 'JWT secretkey')
      const token = jwt.sign({ user }, process.env.JWT_SECRET!);

      const ret = {
        success: true,
        data: token,
      };

      return res.status(200).json(ret);
    });
  })(req, res);
};
