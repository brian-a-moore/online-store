import { useCallback, useEffect, useRef, useState } from 'react';
import { apiCall } from '../config/axios';
import { Params } from '../types';

function useApi<D = undefined, P = undefined, R = undefined>(
  args: Params<D, P>,
  opts?: {
    isAutoTriggered?: boolean;
    isPrivateEndpoint?: boolean;
    reTrigger?: string;
  },
) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<R | null>(null);

  const isAutoTriggered =
    opts?.isAutoTriggered !== undefined ? opts?.isAutoTriggered : true;
  const reTrigger = opts?.reTrigger;

  const argsRef = useRef(args);
  if (JSON.stringify(argsRef.current) !== JSON.stringify(args)) {
    argsRef.current = args;
  }

  const _getData = useCallback(
    async (controller: AbortController) => {
      try {
        const data = await apiCall<D, P, R>(
          argsRef.current,
          controller,
          opts?.isPrivateEndpoint,
        );
        setResponse(data);
        setError(null);
      } catch (err: any | unknown) {
        if (err.name === 'AbortError') return;
        setError(
          err.response?.data?.message ||
            'Unknown Error: Please try again later.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [JSON.stringify(args), opts?.reTrigger],
  );

  useEffect(() => {
    const controller = new AbortController();

    if (isAutoTriggered || reTrigger) _getData(controller);
    else setIsLoading(false);

    return () => {
      // TODO: This is causing all requests to get aborted, may be due to duplicate requests being made?
      // controller.abort();
    };
  }, [_getData, isAutoTriggered, reTrigger]);

  return { error, isLoading, response };
}

export default useApi;
