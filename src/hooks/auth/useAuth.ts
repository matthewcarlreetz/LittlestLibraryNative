import { Auth } from 'aws-amplify';
import { useEffect, useReducer } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';

type UserInfo = { username: string; password: string };
enum AuthType {
  SignIn,
  SignUp,
}
type State = UserInfo & {
  error: unknown;
  user: CognitoUser | null | undefined;
  loading: boolean;
  type: AuthType;
};
type Action =
  | { type: 'signUp'; payload: UserInfo }
  | { type: 'signIn'; payload: UserInfo }
  | { type: 'success'; payload: CognitoUser }
  | { type: 'setUser'; payload: CognitoUser | null }
  | { type: 'reset'; payload: null }
  | { type: 'failure'; payload: string };

const initialState = {
  username: '',
  password: '',
  error: '',
  user: undefined,
  loading: false,
  type: AuthType.SignIn,
};

const useAuth = () => {
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'signUp':
        return {
          ...state,
          username: action.payload.username,
          password: action.payload.password,
          error: '',
          loading: true,
          type: AuthType.SignUp,
        };
      case 'signIn':
        return {
          ...state,
          username: action.payload.username,
          password: action.payload.password,
          error: '',
          loading: true,
          type: AuthType.SignIn,
        };
      case 'setUser':
        return { ...state, user: action.payload };
      case 'success':
        return { ...state, user: action.payload, loading: false };
      case 'failure':
        return { ...state, error: action.payload, loading: false };
      case 'reset':
        return initialState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const signIn = (username: string, password: string) => {
    dispatch({ type: 'signIn', payload: { username, password } });
  };
  const signUp = (username: string, password: string) => {
    dispatch({ type: 'signUp', payload: { username, password } });
  };
  const reset = () => {
    dispatch({ type: 'reset', payload: null });
  };

  useEffect(() => {
    async function signUp() {
      if (!state.loading) return;
      try {
        if (state.type === AuthType.SignUp) {
          const response = await Auth.signUp({
            username: state.username,
            password: state.password,
            attributes: {
              email: state.username,
            },
          });
          dispatch({ type: 'success', payload: response.user });
        } else {
          const response = await Auth.signIn({
            username: state.username,
            password: state.password,
          });
          dispatch({ type: 'success', payload: response.user });
        }
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
      }
    }
    signUp();
  }, [state.loading]);

  useEffect(() => {
    async function getUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        dispatch({ type: 'setUser', payload: user });
      } catch (error) {
        dispatch({ type: 'setUser', payload: null });
      }
    }
    getUser();
  }, []);

  const resendConfirmationCode = async (email: string) => {
    try {
      await Auth.resendSignUp(email);
      return true;
    } catch (err) {
      return false;
    }
  };

  const confirmSignUp = async (email: string, authenticationCode: string) => {
    try {
      await Auth.confirmSignUp(email, authenticationCode);
      return true;
    } catch (err) {
      return false;
    }
  };

  const needsConfirmation = state?.error?.code === 'UserNotConfirmedException';

  return {
    signUp,
    signIn,
    ...state,
    needsConfirmation,
    resendConfirmationCode,
    confirmSignUp,
    reset,
  };
};

export default useAuth;
