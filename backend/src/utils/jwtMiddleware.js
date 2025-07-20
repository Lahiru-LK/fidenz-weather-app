import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { authConfig } from "../config/auth0Config.js";

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  algorithms: ['RS256'],
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
});