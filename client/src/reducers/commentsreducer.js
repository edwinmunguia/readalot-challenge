export const initialCommentsReducer = [];

export const commentsReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return action.comments;
    case "ADD_COMMENT":
      return [action.comment, ...prevState];
    case "REMOVE_COMMENT":
      return prevState.filter((comment) => comment.id !== action.comment);
    default:
      return prevState;
  }
};
