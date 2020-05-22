const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        throw new Error('Could not find the user')
      }
  })
  .catch(err => res.status(400).json(err.message))
}

module.exports = {
  handleProfileGet: handleProfileGet
};