import { useContext, useState } from 'react';
import { List, Divider, Collapse } from '@mui/material';

import { RouteItem } from './RouteItem';
import { SignOutRoute } from './SignOutRoute';

import { routes } from '../../../config';
import { Route } from '../../../types';
import { AppContext } from '../../../contexts';

export const Routes = () => {
  const appContext = useContext(AppContext);
  const [routesState, setRoutesStage] = useState<Route[]>(routes);

  const handleMenuClick = (route: Route) => {
    const items = routesState.map((item) => {
      if (item.key === route.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setRoutesStage(items);
  };

  return (
    <>
      <List component="nav" sx={{ height: '100%' }}>
        {routesState.filter(r => r.shouldDisplay(appContext.user)).map((route: Route) => (
          <div key={route.key}>
            {route.subRoutes && route.subRoutes.filter(r => r.shouldDisplay(appContext.user)) ? (
              <>
                <RouteItem key={`${route.key}`} route={route} hasChildren handleMenuClick={handleMenuClick} />
                <Collapse in={route.expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.subRoutes?.filter(r => r.shouldDisplay(appContext.user)).map((sRoute: Route) => (
                      <RouteItem key={`${sRoute.key}`} route={sRoute} nested />
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <RouteItem key={route.key} route={route} nested={false} />
            )}
            {route.appendDivider && <Divider />}
          </div>
        ))}
      </List>
      {appContext.user !== null && <SignOutRoute />}
    </>
  );
};
