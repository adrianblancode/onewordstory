module.exports.controller = function (app) {
  /**
   * index
   */
  app.get('/', function(req, res) {
    if(req.session.user) {
      res.locals.loggedin = true;
    } else {
      res.locals.loggedin = false;
    }
    res.render('index', {
       title : 'onewordstory'
      ,description : 'The most epic story ever written'
      ,author : 'adrianblp, cwinsnes, robineng'
    });
  });

  app.get('/500', function(req, res) {
    res.render('500');
    throw new Error('500 error');
  });
}
