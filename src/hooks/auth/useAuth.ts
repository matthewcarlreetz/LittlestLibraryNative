import { Auth } from 'aws-amplify';
import { useEffect, useReducer } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';

type UserInfo = { username: string; password: string };
type State = UserInfo & {
  error: string;
  user: CognitoUser | null | undefined;
  loading: boolean;
  type: 'signIn' | 'signUp';
};
type Action =
  | { type: 'signUp'; payload: UserInfo }
  | { type: 'signIn'; payload: UserInfo }
  | { type: 'success'; payload: CognitoUser }
  | { type: 'setUser'; payload: CognitoUser | null }
  | { type: 'failure'; payload: string };

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
          type: 'signUp',
        };
      case 'signIn':
        return {
          ...state,
          username: action.payload.username,
          password: action.payload.password,
          error: '',
          loading: true,
          type: 'signUp',
        };
      case 'setUser':
        return { ...state, user: action.payload };
      case 'success':
        return { ...state, user: action.payload, loading: false };
      case 'failure':
        return { ...state, error: action.payload, loading: false };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    error: '',
    user: undefined,
    loading: false,
    type: 'signIn',
  });

  const signIn = async (username: string, password: string) => {
    dispatch({ type: 'signIn', payload: { username, password } });
  };
  const signUp = async (username: string, password: string) => {
    dispatch({ type: 'signUp', payload: { username, password } });
  };

  useEffect(() => {
    async function signUp() {
      if (!state.loading) return;
      try {
        const op = state.type === 'signIn' ? Auth.signIn : Auth.signUp;
        const user = await op({
          username: state.username,
          password: state.password,
        });
        dispatch({ type: 'success', payload: user });
        console.log({ user });
      } catch (error) {
        dispatch({ type: 'failure', payload: error });
        console.log('error signIng up:', error);
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

  return { signUp, signIn, ...state };
};

export default useAuth;
