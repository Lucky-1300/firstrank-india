const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required ❌" });
  }

  const response = authService.register({ name, email, password });

  res.send(response);
};

module.exports = { registerUser };