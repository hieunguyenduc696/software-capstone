import React, { useLayoutEffect, useState, useTransition } from "react";
import { BrowserRouterProps, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const SuspenseRouter = ({ ...rest }: BrowserRouterProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  const [, startTransition] = useTransition();

  useLayoutEffect(() => {
    history.listen((update) => {
      startTransition(() => {
        setState(update);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <Router
      {...rest}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
