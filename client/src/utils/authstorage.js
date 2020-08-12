export const authStorage = (() => {
  const appAuthKey = "_@ral_acklen_user";
  return {
    save: (user, token) =>
      localStorage.setItem(appAuthKey, JSON.stringify({ user, token })),
    get: () => JSON.parse(localStorage.getItem(appAuthKey)),
    delete: () => localStorage.removeItem(appAuthKey),
  };
})();
