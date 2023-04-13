function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() || req.session.isLoggedIn) {
    return next();
  }
  res.send("not authenticated from ensureAuthenticated");
}

module.exports = {
  ensureAuthenticated,
};
