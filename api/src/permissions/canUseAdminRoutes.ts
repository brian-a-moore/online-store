import { Request } from 'express';

export const canUseAdminRoutes = async (req: Request): Promise<false | string> => {
  if (req.user?.isAdmin) {
    return false;
  } else {
    return 'You do not have permission to access this resource';
  }
};
