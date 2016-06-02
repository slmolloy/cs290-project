var db = require('../../db');

app.get('/reset-table',function(req,res,next){
  var context = {};
  db.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
      "id INT PRIMARY KEY AUTO_INCREMENT,"+
      "name VARCHAR(255) NOT NULL,"+
      "reps INT,"+
      "weight INT,"+
      "date DATE,"+
      "lbs BOOLEAN)";
    db.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});