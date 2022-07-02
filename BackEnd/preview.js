module.exports = {
  getData: (app, con) => {
    var profile = [];
    var learning = [];
    var education = [];
    var general = [];
    var interests = [];
    var skills = [];
    app.get("/preview", async (req, res) => {
      con.query(
        `SELECT * FROM profile WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            profile = result;
          } else {
            console.log("failed");
          }
        }
      );
      con.query(
        `SELECT * FROM learning WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            learning = result;
          }
        }
      );
      con.query(
        `SELECT * FROM education WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            education = result;
          }
        }
      );
      con.query(
        `SELECT * FROM general WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            general = result;
          }
        }
      );
      con.query(
        `SELECT * FROM interests WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            interests = result;
          }
        }
      );
      con.query(
        `SELECT * FROM skills WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result.length) {
            skills = result;
          }
        }
      );
      var dataset = {
        profile,
        learning,
        education,
        general,
        skills,
        interests,
      };
      await res.send({ dataset });
    });
  },
};