export const authAPI = {
  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, user: userData });
      }, 500);
    });
  },

  login: async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, user: credentials });
      }, 500);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },
};
