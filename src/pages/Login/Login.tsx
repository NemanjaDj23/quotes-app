import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../http-services/auth';

enum LoginError {
  NO_CREDENTIALS = 'Please enter credentials.',
  WRONG_CREDENTIALS = 'Wrong credentials.',
}

type LoginProps = {
  onLogin: typeof login;
};

function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { values, handleChange } = useForm({ username: '', password: '' });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.username || !values.password) {
      setError(LoginError.NO_CREDENTIALS);
    } else {
      const { error } = await onLogin(values.username, values.password);
      if (error) {
        setError(LoginError.WRONG_CREDENTIALS);
      }
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <h1>Quotes</h1>
      <form onSubmit={handleLogin}>
        {error && <div className={styles.alert}>{error}</div>}
        <div className={styles.formGroup}>
          <label>Username</label>
          <input type='text' name='username' value={values.username} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={values.password}
              onChange={handleChange}
            />
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className={styles.passwordIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className={styles.passwordIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
