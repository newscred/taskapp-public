import { styled, Typography } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import { TasksList } from '../components/TasksList';

export const Home = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      {context.user && <Typography variant="h4">{`Hello, ${context.user.firstName} ${context.user.lastName}, ${context.user.role} 🎃`}</Typography>}
      {context.user && <TasksList user={context.user} />}
    </>
  );
};
