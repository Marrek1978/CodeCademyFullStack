

const basicAuthentication = (req, res, next) => {
  console.log('in basicAuthentication')
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
  console.log('in req.isAuthenticated() is ', req.isAuthenticated())
  console.log('in req.isAuthenticated() is ', req.session)
  if(req.isAuthenticated()) {
    console.log('in ensureAuthenticated')
    next();
  } 
  res.redirect('/skis')

  // if(req.isAuthenticated()  ){
  //   return next();
  // }

  // if (req.session.passport?.user) {
  //   next();
  // } 
  
  
    // let error = new Error({error: " You are not Authorized to access this page"});
    // next(error);
  

}



module.exports = {
  basicAuthentication,
  matchIdAuthentication,
  ensureAuthenticated
}