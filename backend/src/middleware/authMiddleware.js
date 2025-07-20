import { checkJwt } from "../utils/jwtMiddleware.js";

const authMiddleware = (req, res, next) => {
  // Skip auth for public routes
  const publicRoutes = ['/api/auth/test', '/', '/health'];
  
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  
  // Apply JWT verification for protected routes
  return checkJwt(req, res, next);
};

export default authMiddleware;
