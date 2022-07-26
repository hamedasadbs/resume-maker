module.exports = {
  auth: (app, con) => {
    app.post("/auth", (req, res) => {
      //query to get user info
      con.query(
        `SELECT * FROM user WHERE username='${req.body.username}' AND password='${req.body.password}'`,
        (err, result, fields) => {
          if (err) throw err;
          if (result.length) {
            res.send({
              superUser: result[0].super_user,
            });
          } else {
            res.sendStatus(405);
          }
        }
      );
    });
  },
  getUsers: (app, con) => {
    app.get("/users", (req, res) => {
      //query to get user info
      con.query(
        "SELECT * FROM user WHERE super_user=0",
        (err, result, fields) => {
          if (err) throw err;
          if (result) {
            res.send({
              users: result,
            });
          }
        }
      );
    });
  },
  addUser: (app, con) => {
    app.post("/users", (req, res) => {
      //query to get user info
      con.query(
        `INSERT INTO user (username,password) VALUES ('${req.body.username}','${req.body.password}')`,
        (err) => {
          if (err) {
            res.sendStatus(405);
          } else {
            con.query(
              `INSERT INTO profile (username) VALUES ('${req.body.username}')`,
              (err) => {
                if (err) {
                  res.sendStatus(405);
                } else {
                  con.query(
                    `INSERT INTO education (username) VALUES ('${req.body.username}')`,
                    (err) => {
                      if (err) {
                        res.sendStatus(405);
                      } else {
                        res.sendStatus(200);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
  removeUser: (app, con) => {
    app.delete("/users", (req, res) => {
      con.query(
        `DELETE FROM user WHERE username='${req.query.item}'`,
        (err) => {
          if (err) throw err;
          if (err) {
            res.sendStatus(405);
          } else {
            con.query(
              `DELETE FROM profile WHERE username='${req.query.item}'`,
              (err) => {
                if (err) throw err;
                if (err) {
                  res.sendStatus(405);
                } else {
                  con.query(
                    `DELETE FROM education WHERE username='${req.query.item}'`,
                    (err) => {
                      if (err) throw err;
                      if (err) {
                        res.sendStatus(405);
                      } else {
                        res.sendStatus(200);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
};
