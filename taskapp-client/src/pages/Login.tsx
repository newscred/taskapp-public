import { useContext, useState, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

import { Alert, Box, Button, FormControl, IconButton, TextField, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Helmet } from 'react-helmet';

import { AppContext } from '../contexts';
import { loginUser } from '../services/auth';
import { APP_TITLE } from '../utils/constants';

type LoginState = {
  username: string;
  password: string;
  showPassword: boolean;
}

export const Login = () => {
  const context = useContext(AppContext);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [values, setValues] = useState<LoginState>({
    username: '', password: '', showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  }

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, username: event.target.value });
  }

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, password: event.target.value });
  }

  const onButtonClick = async () => {
    const userOrNull = await loginUser({
      username: values.username, password: values.password
    });
    if (userOrNull !== null) {
      context.setUser(userOrNull);
      setSuccess('Logged in!');
    } else {
      setError('Username or password was invalid');
    }
  }

  return (
    <>
      <Helmet>
        <title>
          Login | {APP_TITLE}
        </title>
      </Helmet>
      <Box sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}>
        <FormControl variant="standard">
          {success !== '' && <Alert severity="success">{success}</Alert>}
          {success !== '' && <Redirect to="/" />}
          {error !== '' && <Alert severity="error">{error}</Alert>}
          <TextField
            error={error !== ''}
            id="username"
            label="Username"
            onChange={onUsernameChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }}
          />
          <TextField
            error={error !== ''}
            id="password"
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            onChange={onPasswordChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }}
          />
          <Button variant="contained" onClick={onButtonClick}>Log in</Button>
        </FormControl>
      </Box>
    </>
  );
}
