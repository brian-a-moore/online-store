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
    background: 'bg-red-200',
    text: 'text-red-800',
    icon: '#991B1B',
  },
  info: {
    background: 'bg-sky-200',
    text: 'text-sky-800',
    icon: '#075985',
  },
  warn: {
    background: 'bg-yellow-200',
    text: 'text-yellow-800',
    icon: '#854D0E',
  },
  success: {
    background: 'bg-green-200',
    text: 'text-green-800',
    icon: '#166534',
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
