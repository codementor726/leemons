import pMinDelay from 'p-min-delay';
import { goLoginPage } from '@users/navigate';
import { useSession } from '@users/session';
import { Box, LoadingOverlay, Stack } from '@bubbles-ui/components';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import loadable from '@loadable/component';
import { getCookieToken } from '@users/session';

export default function Private() {
  const location = useLocation();
  const session = useSession({ redirectTo: goLoginPage });
  const { path } = useRouteMatch();
  const { search } = location;
  const history = useHistory();
  function cleanPath(path) {
    return path.replace('//', '/');
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(search)
    if (queryParameters.get("url") && queryParameters.get("url").length != 0 ) {
      const token = getCookieToken(true);
      window.location.href = queryParameters.get("url")+`?token=${token.userToken}`;
      return
    }

    history.push(cleanPath(`/private/dashboard`));
    return
  }, [search]);

  const HomePage = loadable(() => pMinDelay(import('./src/pages/public/library/CmsMenus'), 1000));

  return (
    <Switch>
      <Route path={`${path}/`}>
        <HomePage session={session} fallback={<LoadingOverlay visible />} />
      </Route>


    </Switch>
  );
}

