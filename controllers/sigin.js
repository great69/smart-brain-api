const handleSignIn = (req, res, db, bcrypt) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission'); // need return to exit the function
  }
  db.select('email','hash').from('login')
    .where('email','=',email)
    .then(data => {
      if (data.length != 0) {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          return db.select('*').from('users')
            .where('email','=', email)
            .then(user => {
              res.json(user[0])
            })
        } else {
          throw new Error('Wrong credentials') //wrong password
        }
      } else {
        throw new Error('Wrong credentials') //wrong email
      }
    })
    .catch(err => res.status(400).json(err.message))
}

module.exports = {
  handleSignIn: handleSignIn
};