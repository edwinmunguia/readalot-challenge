export const initialAuthReducer = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...prevState,
        isLoggedIn: true,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...prevState,
        isLoggedIn: false,
        user: null,
      };
    default:
      return prevState;
  }
};
