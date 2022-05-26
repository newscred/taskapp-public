import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, IconButton, styled } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';

import { AppContext } from '../../../../contexts';

export const SignOutRoute = () => {
  const [goToLogin, setGoToLogin] = useState(false);
  const appContext = useContext(AppContext);
  const handleSignOutClick = () => {
    appContext.setUser(null);
    setGoToLogin(true)
  };

  return (
    <>
      {goToLogin && <Redirect to="/login" />}
      <StyledListItemButton onClick={handleSignOutClick}>
        <ListItemIcon>
          <IconButton size="small">
            <ExitToApp />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </StyledListItemButton>
    </>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
