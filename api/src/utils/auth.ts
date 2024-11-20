import gp from 'generate-password';

const options = {
  length: 12,
  numbers: true,
  symbols: true,
  strict: true,
  exclude: `'"`,
};

export const generatePassword = () => gp.generate(options);
