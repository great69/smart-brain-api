const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2dbdc2a2c2d84f3aa6574f40c71c7d73'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        throw new Error('Could not get entries')
      }
  })
  .catch(err => res.status(400).json(err.message))
}

module.exports = {
  handleApiCall,
  handleImage //es6 doesn't need handleImage: handleImage
};