const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '3e507f749cfa4015afa4854812165b38'
   });

const handleAPICall = (req,res) => {
  app.models
            .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json("API connection failed"))
}

const handleImages = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log(entries[0]);
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json("Unable to get entries"))
}

module.exports = {
     handleImages,
     handleAPICall
}