module.exports.controller = function(app) {
  app.get('/login', function(req, res) {
    res.render('login', {
       title : 'login - onewordstory'
      ,description : 'Log in to your story account'
      ,author : 'adrianblp, cwinsnes, robinng'
    });
  });
}
