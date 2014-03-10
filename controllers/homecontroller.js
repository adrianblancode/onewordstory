module.exports.controller = function (app) {
  /**
   * index
   */
  app.get('/', function(req, res) {
    res.locals.loggedin = (req.session.username)? true : false;
    res.render('index', {
       title : 'onewordstory'
      ,description : 'The most epic story ever written'
      ,author : 'adrianblp, cwinsnes, robineng'
      ,loggedin : (req.session.username)?true : false
    });
  });

  app.get('/500', function(req, res) {
    res.render('500');
    throw new Error('500 error');
  });
}
