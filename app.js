const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Recipe = require('./models/recipe');

app.use(bodyParser.json());


//chyyXbEWKfdveHzE
//mongodb+srv://popson:@fullstackthing-muarq.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://popson:chyyXbEWKfdveHzE@fullstackthing-muarq.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

app.use('/api/stuff', (req, res, next) => {
  Recipe.find().then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
/*app.use('/api/recipes', (req, res, next) => {
    const recipes = [
      {
        title: 'the first Recipe',
        ingredients: 'maggi,cassava and palm oil',
        instructions:'mixing',
        difficulty: 5,
        time: 80,
        _id: 'nvbgdljhbf',
      },
      {
        _title: 'the first Recipe',
        ingredients: 'sugar,cassava and palm oil',
        instructions:'',
        difficulty: 9,
        time: 80,
        _id: 'nvbgdljhbf',
      },
    ];
    res.status(200).json(recipes);
  });*/
  app.post('/api/stuff', (req, res, next) => {
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      difficulty: req.body.difficulty,
      time: req.body.time,
      _id: req.body._id
    });
    recipe.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
      _id: req.params.id
    }).then(
      (recipe) => {
        res.status(200).json(recipe);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

  app.put('/api/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      difficulty: req.body.difficulty,
      time: req.body.time,
      _id: req.body._id
    });
    Recipe.updateOne({_id: req.params.id}, recipe).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
app.delete('/api/recipesf/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  module.exports = app