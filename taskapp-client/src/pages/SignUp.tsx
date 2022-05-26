import { useContext, useState, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AxiosError } from 'axios';
import {
  Alert, Box, Button, FormControl, IconButton,
  InputAdornment, MenuItem, Select, SelectChangeEvent, TextField
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Role, UserSignUpInput, signUpUser } from '../services/auth';
import { AppContext } from '../contexts';
import { APP_TITLE } from '../utils/constants';

type RoleOption = {
  label: string;
  role: Role;
};

const ROLE_OPTIONS: RoleOption[] = [
  { label: 'Worker', role: 'worker' },
  { label: 'Requester', role: 'requester' },
  { label: 'Admin', role: 'admin' }
];
const DEFAULT_ROLE_OPTION: RoleOption = ROLE_OPTIONS[0];

type Errors = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  backend: string;
}

export const SignUp = () => {
  const context = useContext(AppContext);
  const [success, setSuccess] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    username: '', password: '', firstName: '', lastName: '',
    backend: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [values, setValues] = useState<UserSignUpInput>({
    username: '', password: '', firstName: '', lastName: '', role: DEFAULT_ROLE_OPTION.role
  });

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length < 6) {
      setErrors({ ...errors, username: 'Username must be >6 characters' });
    } else {
      setErrors({ ...errors, username: '' });
    }
    setValues({ ...values, username: value });
  }

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length < 6) {
      setErrors({ ...errors, password: 'Password must be >6 characters' });
    } else {
      setErrors({ ...errors, password: '' });
    }
    setValues({ ...values, password: value });
  }

  const onFirstNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, firstName: event.target.value });
  }

  const onLastNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, lastName: event.target.value });
  }

  const onRoleSelect = (event: SelectChangeEvent) => {
    setValues({ ...values, role: event.target.value as Role });
  };

  const onButtonClick = async () => {
    try {
      const user = await signUpUser(values);
      setSuccess('Logged in !');
      context.setUser(user);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response && error.response.status === 400) {
        setErrors({ ...errors, backend: 'Duplicate username, try a different username' });
      } else {
        setErrors({ ...errors, backend: error.message as string });
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>
          Sign Up | {APP_TITLE}
        </title>
      </Helmet>
      <Box sx={{
        '& .MuiTextField-root, & .MuiSelect-root': { m: 1, width: '50ch' },
      }}>
        <FormControl variant="standard">
          {success !== '' && <Alert severity="success">{success}</Alert>}
          {success !== '' && <Redirect to="/" />}
          {Object.values(errors).filter(Boolean).length !== 0 &&
            Object.values(errors).filter(Boolean).map(e => <Alert key={e} severity="error">{e}</Alert>)
          }
          <TextField
            error={errors.username !== ''}
            id="username"
            label={errors.username ? 'Error' : 'Username'}
            helperText={errors.username}
            onChange={onUsernameChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }}
          />
          <TextField
            error={errors.password !== ''}
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={onPasswordChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }}
          />
          <TextField
            id="first-name"
            label="First name"
            onChange={onFirstNameChange}
          />
          <TextField
            id="last-name"
            label="Last name"
            onChange={onLastNameChange}
          />
          <Select
            labelId="role-select-label"
            id="role"
            value={values.role}
            label="Role"
            onChange={onRoleSelect}
          >
            {ROLE_OPTIONS.map(r => <MenuItem key={r.role} value={r.role}>{r.label}</MenuItem>)}
          </Select>
          <Button variant="contained" onClick={onButtonClick}>Sign up</Button>
        </FormControl>
      </Box>
    </>
  )
}
