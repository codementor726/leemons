import { Box, createStyles, Stack, LoadingOverlay } from '@bubbles-ui/components';
import HeroBgLayout from '@users/layout/heroBgLayout';
import {
  getRememberLoginRequest,
} from '@users/request';
import { getCookieToken, useSession } from '@users/session';
import Cookies from 'js-cookie';
import hooks from 'leemons-hooks';
import _ from 'lodash';
import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserCenterProfileTokenRequest, getUserCentersRequest } from '../../../request';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import useCommonTranslate from '@multilanguage/helpers/useCommonTranslate';
const PageStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing[7],
  },
  content: {
    maxWidth: 330,
  },
}));

export default function LoginApi() {
  useSession({
    redirectTo: (history) => {
      history.push(
        _.isString(getCookieToken(true)) ? '/private/users/select-profile' : '/private/dashboard'
      );
    },
    redirectIfFound: true,
  });
  const { t: tCommon } = useCommonTranslate('forms');
  const history = useHistory();
  let { token } = useParams();
  // ····················································································
  // HANDLERS
  useEffect(() => {console.log('params',token);
    const apiLogin = async () => {
      
      if (!isEmpty(token)) {
        window.sessionStorage.setItem('boardMessagesModalId', null);
        const { profile, center } = await getRememberLoginRequest(token);

        if (profile && center) {
          // ES: Si lo tiene sacamos el token para dicho centro y perfil
          // EN: If has, get the token for that center and profile
          const { jwtToken } = await getUserCenterProfileTokenRequest(
            center.id,
            profile.id,
            token
          );

          await hooks.fireEvent('user:change:profile', profile);
          token = jwtToken;
        } else {
          // ES: Si no lo tiene sacamos todos los perfiles a los que tiene acceso para hacer login
          // EN: If not has, get all the profiles that has access to do login
          const { centers } = await getUserCentersRequest(token);
          // Si solo tiene un perfil hacemos login automaticamente con ese
          if (centers.length === 1 && centers[0].profiles.length === 1) {
            const { jwtToken } = await getUserCenterProfileTokenRequest(
              centers[0].id,
              centers[0].profiles[0].id,
              token
            );

            await hooks.fireEvent('user:change:profile', centers[0].profiles[0]);
            token = jwtToken;
          }
        }

        // Finalmente metemos el token
        Cookies.set('token', token);
        hooks.fireEvent('user:cookie:session:change');
        
        history.push(
          _.isString(token) ? '/private/users/select-profile' : '/private/dashboard'
        );
      }
    }
    apiLogin();
  }, [token]);

  const errorMessages = useMemo(
    () => ({
      username: {
        required: tCommon('required') || 'Required field',
        invalidFormat: tCommon('email') || 'Invalid format',
      },
      password: { required: tCommon('required') || 'Required field' },
    }),
    [tCommon]
  );

  // ····················································································
  // STYLES

  const { classes } = PageStyles();

  return (
    <HeroBgLayout>
      <Stack className={classes.root} direction="column" justifyContent="center" fullHeight>
        <Box className={classes.content}>
          <LoadingOverlay visible='true' overlayOpacity={0} />
        </Box>
      </Stack>
    </HeroBgLayout>
  );
}
