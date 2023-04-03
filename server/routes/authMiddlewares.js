

const basicAuthentication = (req, res, next) => {
  if (req.session.passport?.user) {
    next();
  } else {
    let error = new Error({error: " You are not Authorized to access this page"});
    next(error);
  }
};

const matchIdAuthentication = (req, res, next) => {
  //! can only see own profile
  if (req.results?.id === req.session.passport.user) {
    next();
  } else {
    let error = new Error({error: " You are not Authorized to access this page"});
    next(error);
  }
};

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}



module.exports = {
  basicAuthentication,
  matchIdAuthentication,
  ensureAuthenticated
}