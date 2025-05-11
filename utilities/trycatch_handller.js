exports.tryCatchHandller = (handller) => {
  return async (req, res, next) => {
    try {
      await handller(req, res);
    } catch (error) {
      next(error);
    }
  };
};
