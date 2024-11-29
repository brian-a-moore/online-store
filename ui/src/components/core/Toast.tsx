import { mdiAlertCircle, mdiCheckCircle, mdiInformation } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ToastContext, ToastProps } from '../../context/ToastContext';

const WAIT_TIME = 5000;
const CLOSE_TIME = 333;

const ANIMATION = {
  open: 'animate-toastOpen',
  closing: 'animate-toastClose',
};

const ICON = {
  error: mdiAlertCircle,
  info: mdiInformation,
  success: mdiCheckCircle,
};

const COLORS = {
  error: {
    background: 'bg-red-500 hover:bg-red-600',
    text: 'text-red-50',
    icon: '#FEF2F2',
  },
  info: {
    background: 'bg-white hover:bg-[#efefef]',
    text: 'text-[var(--text-color)]',
    icon: 'var(--text-color)',
  },
  success: {
    background: 'bg-green-600 hover:bg-green-600',
    text: 'text-green-50',
    icon: '#F0FDFA',
  },
};

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert '0' hour to '12'
  const formattedHours = String(hours).padStart(2, '0');

  return `${month}/${day}/${year} ${formattedHours}:${minutes}${ampm}`;
};

type Props = {
  toast: ToastProps;
};

export const Toast: React.FC<Props> = ({ toast }) => {
  const { setToast } = useContext(ToastContext);
  const [status, setStatus] = useState<'open' | 'closing'>('open');
  const waitTimer = useRef<NodeJS.Timeout | undefined>();
  const closeTimer = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    waitTimer.current = setTimeout(() => {
      setStatus('closing');
    }, WAIT_TIME);

    return () => {
      clearTimeout(waitTimer.current);
    };
  }, [toast.message]);

  useEffect(() => {
    if (status === 'closing') {
      closeTimer.current = setTimeout(() => {
        setToast(null);
      }, CLOSE_TIME);
    }
  }, [setToast, status]);

  return (
    <div className="fixed flex bottom-0 left-0 w-full p-4 items-center justify-center pointer-events-none z-40">
      <button
        style={{
          transition: 'opacity, transform 0.3s ease',
        }}
        className={`
          ${ANIMATION[status]} ${COLORS[toast.type].background}
          flex items-center justify-stretch min-w-[300px] max-w-[460px] pointer-events-auto
          rounded shadow-md active:scale-95
        `}
        onClick={() => setStatus('closing')}
      >
        <div className="bg-[rgba(100,100,100,0.1)] flex items-center justify-center px-4">
          <Icon path={ICON[toast.type]} size={1.25} color={COLORS[toast.type].icon} />
        </div>
        <div className="flex flex-col flex-1 gap-2 p-4">
          <p className={`${COLORS[toast.type].text} h-full text-left line-clamp-3 text-sm`}>{toast.message}</p>
          <p className={`text-xs opacity-70 text-left ${COLORS[toast.type].text}`}>{formatDate(new Date())}</p>
        </div>
      </button>
    </div>
  );
};
