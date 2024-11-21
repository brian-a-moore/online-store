import { mdiLogin } from '@mdi/js';
import Icon from '@mdi/react';
import { ButtonLink } from '../interactive';
import { H3 } from '../typography';

type Props = {};

export const Header: React.FC<Props> = () => {
  return (
      <header className='bg-sky-600 flex items-center justify-between p-4'>
        <H3 className='text-white'>Online Store</H3>
        <ButtonLink href="/login" className='flex gap-2 items-center'>
          <p className='text-sm'>Log In</p>
          <Icon path={mdiLogin} size={0.75} className='opacity-50' />
        </ButtonLink>
      </header>
  );
};
