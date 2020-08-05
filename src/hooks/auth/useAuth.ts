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
    console.log({ action });
    console.log({ state });
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
          console.log({ signUp: response });
          dispatch({ type: 'success', payload: response.user });
        } else {
          const response = await Auth.signIn({
            username: state.username,
            password: state.password,
          });
          console.log({ signIn: response });
          dispatch({ type: 'success', payload: response.user });
          const user = await Auth.currentAuthenticatedUser();
          console.log({ currentUser: user });
        }
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
        console.log('error', error);
      }
    }
    signUp();
  }, [state.loading]);

  useEffect(() => {
    async function getUser() {
      console.log('GET USER');
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log({ currentUser: user });
        dispatch({ type: 'setUser', payload: user });
      } catch (error) {
        console.log({ error });
        dispatch({ type: 'setUser', payload: null });
      }
    }
    getUser();
  }, []);

  const resendConfirmationCode = async (email: string) => {
    try {
      await Auth.resendSignUp(email);
      console.log('code resent successfully');
      return true;
    } catch (err) {
      console.log('error resending code: ', err);
      return false;
    }
  };

  const confirmSignUp = async (email: string, authenticationCode: string) => {
    try {
      await Auth.confirmSignUp(email, authenticationCode);
      console.log('successully signed up!');
      return true;
    } catch (err) {
      console.log('error confirming signing up: ', err);
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