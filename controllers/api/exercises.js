var db = require('../../db');
var router = require('express').Router();
var websockets = require('../../websockets');
var moment = require('moment');

router.get('/', function (req, res, next) {
  db.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.json(rows);
  });
});

router.post('/', function(req, res, next) {
  db.pool.query('INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)',
      [req.body.name, req.body.reps, req.body.weight, moment().format('YYYY-MM-DD'), req.body.lbs], function(err, result) {
    if (err) {
       next(err);
      return;
    }
    db.pool.query('SELECT * FROM workouts WHERE id=?', [result.insertId], function(err, result) {
      if (err) {
        next(err);
        return;
      }
      websockets.broadcast('new_exercise', result[0]);
      res.status(201).json(result);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  var exerciseid = req.params.id;
  db.pool.query('DELETE FROM workouts WHERE id=?', [exerciseid], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    websockets.broadcast('delete_exercise', exerciseid);
    res.sendStatus(200);
  });
});

router.put('/:id', function(req, res, next) {
  var exerciseid = req.params.id;
  db.pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
    [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, exerciseid], function(err, result) {
      if (err) {
        next(err);
        return;
      }
      db.pool.query('SELECT * FROM workouts WHERE id=?', [exerciseid], function(err, result) {
        if (err) {
          next(err);
          return;
        }
        res.status(201).json(result[0]);
      });
    });
});

module.exports = router;
