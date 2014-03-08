module.exports.controller = function (app) {
  /**
   * index
   */
  app.get('/', function(req, res) {
    res.render('index', {
       title : 'onewordstory'
      ,description : 'The most epic story ever written'
      ,author : 'adrianblp, cwinsnes, robineng'
    });
  });

  app.get('/500', function(req, res) {
    throw new Error('This is a 500 error');
  });
}
