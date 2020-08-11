export const initialAuthReducer = {
  isLoggedIn: false,
  user: null,
  token: null,
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...prevState,
        isLoggedIn: true,
        user: action.user,
        token: action.token
      };
    case "LOGOUT":
      return {
        ...prevState,
        isLoggedIn: false,
        user: null,
        token: null,
      };
    default:
      return prevState;
  }
};
