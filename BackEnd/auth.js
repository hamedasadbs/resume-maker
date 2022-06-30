module.exports = function auth(app, con) {
  app.post("/", (req, res) => {
    //query to get user info
    con.query(
      `SELECT * FROM user WHERE username='${req.body.username}' AND password='${req.body.password}'`,
      (err, result, fields) => {
        if (err) throw err;
        if (result.length) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      }
    );
  });
};
