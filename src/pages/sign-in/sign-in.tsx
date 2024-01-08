import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { loginAction } from '../../store/api-actions';
import { Logo } from '../../components/logo';
import { Footer } from '../../components/footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthorizationSelector } from '../../store/authorization/selectors';

function isLoginValid(loginRef: string | null) {
  return (
    loginRef !== null &&
    loginRef !== '' &&
    loginRef.match(/^[\w/.]+@[a-z]+.[a-z]+$/i)
  );
}

function isPasswordValid(passwordRef: string | null) {
  return (
    passwordRef !== null &&
    passwordRef !== '' &&
    passwordRef.match(/[0-9]/) &&
    passwordRef.match(/[a-zA-Z]/)
  );
}

export function SingInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(AuthorizationSelector.status);

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const checkingLogin = isLoginValid(loginRef.current.value);
      const checkingPassword = isPasswordValid(passwordRef.current.value);

      if (!checkingLogin) {
        setLoginError(true);
        setMessageError('Please enter a valid email address');
      }
      if (!checkingPassword) {
        setPasswordError(true);
        setMessageError('Please enter a valid password');
      }
      if (checkingLogin && checkingPassword) {
        dispatch(
          loginAction({
            login: loginRef.current.value,
            password: passwordRef.current.value,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form" onSubmit={handleSubmit}>
          {(loginError || passwordError) && (
            <div className="sign-in__message">
              <p>{messageError}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
                data-testid="login"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
                data-testid="password"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
