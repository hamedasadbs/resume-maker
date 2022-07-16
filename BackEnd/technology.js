module.exports = {
  getTitle: (app, con) => {
    app.get("/techTitle", (req, res) => {
      con.query(
        `SELECT * FROM technology_title WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            res.send({
              dataset: result,
            });
          } else {
            res.send({
              dataset: [],
            });
          }
        }
      );
    });
  },
  getTech: (app, con) => {
    app.get("/technology", (req, res) => {
      con.query(
        `SELECT * FROM technology WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            res.send({
              dataset: result,
            });
          } else {
            res.send({
              dataset: [],
            });
          }
        }
      );
    });
  },
};
