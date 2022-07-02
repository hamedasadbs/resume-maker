module.exports = {
  getData: (app, con) => {
    app.get("/education", (req, res) => {
      con.query(
        `SELECT * FROM education WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result) {
            res.send({
              university: result[0].university,
              lastGrade: result[0].last_grade,
              thesis: result[0].thesis,
              year: result[0].year,
            });
          }
        }
      );
    });
  },
  updateData: (app, con) => {
    app.post("/education", (req, res) => {
      con.query(
        `UPDATE education SET 
        university='${req.body.university}',
        last_grade='${req.body.lastGrade}',
        thesis='${req.body.thesis}',
        year='${req.body.year}' 
        WHERE username='${req.body.username}'`,
        (err) => {
          if (err) {
            res.sendStatus(405);
          } else {
            res.sendStatus(200);
          }
        }
      );
    });
  },
};
