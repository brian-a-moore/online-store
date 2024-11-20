export const getPageNumber = (val: string) => {
  const page = parseInt(val, 10);

  if (isNaN(page)) {
    throw new Error('Page must be a number');
  }

  if (page < 1 || page > 999) {
    throw new Error('Page must be between 1 and 999');
  }

  return page;
};

export const getRoleId: (val?: string) => number | undefined = (val?: string) => {
  if (!val) return undefined;
  const roleId = parseInt(val, 10);

  if (isNaN(roleId)) {
    throw new Error('Role ID must be a number');
  }

  if (![1, 2].includes(roleId)) {
    throw new Error('Role ID must be between 1 or 2');
  }

  return roleId;
};

export const getBoolean = (val: string) => {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  throw new Error('Include boolean must be true or false');
};
