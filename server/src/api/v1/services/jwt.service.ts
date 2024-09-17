import {sign, verify, JwtPayload} from "jsonwebtoken"

export class JwtService {
  /**
   * Generate a JWT token
   * @param payload
   * @returns
   */
  generateToken(payload: any) {
    return sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  verifyToken(token: string) : string | JwtPayload {
    return verify(token, process.env.JWT_SECRET || '', {
        ignoreExpiration: false,
    });
  }
}