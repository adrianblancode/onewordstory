module.exports.controller = function(app) {
  app.get('/settings', function(req, res) {
    res.render('settings', {
       title : 'settings - onewordstory'
      ,description : 'Account settings'
      ,author : 'adrianblp, cwinsnes, robineng'
    });
  });
}
