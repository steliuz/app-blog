import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';

import PrivateRoute from './pravateRoute';

export interface WrapperRouteProps extends RouteProps {
  titleId: string;
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
  if (titleId) {
    document.title = titleId;
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
