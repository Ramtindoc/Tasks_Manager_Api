// Error handller by trycatch in user controller
exports.tryCatchHandller = (handller) => {
  return async (req, res, next) => {
    try {
      await handller(req, res);
    } catch (error) {
      next(error);
    }
  };
};
