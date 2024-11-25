import { Request } from 'express';

export const canUseDashboardRoutes = async (req: Request): Promise<false | string> => {
  // TODO: Remove bypass before deploying
  const bypass = true;

  if (req.user?.domain === 'admin' || bypass) {
    return false;
  } else {
    return 'You do not have permission to access this resource';
  }
};
