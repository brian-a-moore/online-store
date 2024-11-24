import { useEffect, useRef, useState } from 'react';

export default function useDebounce(text: string, delay: number = 1000) {
  const timeout: any = useRef();
  const [updatedText, setUpdatedText] = useState<string>('');

  useEffect(() => {
    timeout.current = setTimeout(() => setUpdatedText(text), delay);
    return () => clearTimeout(timeout.current);
  }, [text, delay]);

  return updatedText;
}
