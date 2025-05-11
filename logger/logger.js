const test = (res) => {
  console.log(res);
};

const register = (req, res) => {
  console.log("register");
};

module.exports = { test, register };
