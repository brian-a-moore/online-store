import { Request } from 'express';

export const canAccessDefault = async (req: Request): Promise<false | string> => {
  if (typeof req === 'object') {
    return false;
  } else {
    return 'You do not have permission to access this resource';
  }
};
