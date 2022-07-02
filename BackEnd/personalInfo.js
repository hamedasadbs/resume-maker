module.exports = {
  getData: (app, con) => {
    app.get("/profile", (req, res) => {
      con.query(
        `SELECT * FROM profile WHERE username='${req.query.username}'`,
        (err, result) => {
          if (err) throw err;
          if (result) {
            res.send({
              fname: result[0].fname,
              lname: result[0].lname,
              title: result[0].title,
              city: result[0].city,
              state: result[0].state,
              mobile: result[0].mobile,
              email: result[0].email,
              website: result[0].website,
              image: result[0].image,
            });
          }
        }
      );
    });
  },
  updateData: (app, con) => {
    app.post("/profile", (req, res) => {
      con.query(
        `UPDATE profile SET 
        fname='${req.body.fname}',
        lname='${req.body.lname}',
        title='${req.body.title}',
        city='${req.body.city}',
        state='${req.body.state}',
        mobile='${req.body.mobile}',
        email='${req.body.email}',
        website='${req.body.website}',
        image='${req.body.image}' 
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
