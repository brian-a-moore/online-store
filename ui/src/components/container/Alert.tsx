import {
  mdiAlertCircle,
  mdiCheckCircle,
  mdiInformation,
  mdiLightbulb,
} from '@mdi/js';
import Icon from '@mdi/react';

const ICON = {
  error: mdiAlertCircle,
  info: mdiLightbulb,
  warn: mdiInformation,
  success: mdiCheckCircle,
};

const COLORS = {
  error: {
    background: 'bg-red-100',
    text: 'text-red-800',
    icon: '#B91C1C',
  },
  info: {
    background: 'bg-white',
    text: 'text-slate-700',
    icon: '#334155',
  },
  warn: {
    background: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: '#A16207',
  },
  success: {
    background: 'bg-green-100',
    text: 'text-green-800',
    icon: '#15803D',
  },
};

type Props = {
  type: 'error' | 'info' | 'warn' | 'success';
  children: React.ReactNode;
};

export const Alert: React.FC<Props> = ({ type, children }) => {
  return (
    <div
      className={`flex ${COLORS[type].background} rounded border-[1px] border-[${COLORS[type].text}]`}
    >
      <div className="bg-[rgba(100,100,100,0.1)] flex items-center justify-center px-4">
        <Icon path={ICON[type]} size={1.25} color={COLORS[type].icon} />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-4">
        <p className={`${COLORS[type].text} text-left line-clamp-3 text-sm`}>
          {children}
        </p>
      </div>
    </div>
  );
};
