
module.exports = (app) => {

  const basicAuthentication = (req, res, next ) => {
    if(req.session.passport?.user) {
      next();
    }else{
      let error = new Error('You are not Authorized to access this page');
      next(error)
    }  
  }

  //*--- TEST ROUTES --------------------------------

  app.get('/', (req, res) => {
    res.json({test: 'Test Route Works!'})
  });

//test middleware folder structure
  app.get('/testauth', basicAuthentication, (req, res, next) => {
    res.json({authed: true})
  });

};