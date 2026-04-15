const register = (userData) => {
  const { password, ...safeData } = userData;

  return {
    message: "User registered successfully ✅",
    data: safeData,
  };
};

module.exports = { register };

