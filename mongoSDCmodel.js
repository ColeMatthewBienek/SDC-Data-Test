const mongoose = require ('mongoose');
const mongodb = 'mongodb://127.0.0.1/SDCdataTest';
const express = require('express');
const { Schema } = mongoose;
const app = express();
const PORT = 3000;

mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to mongoose'));
db.on('connected', console.log.bind(console, 'mongo successfuly connected'));

app.listen(PORT);

const productSchema = new Schema({
  id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: {type: Date},
  updated_at: {type: Date},
  features: [
    {
      feature: String,
      value: String,
    },
  ],
});

const Products = mongoose.model('Product', productSchema);

const styleDetailsSchema = new Schema({
  product_id: Number,
  results:[
    {
      style_id: Number,
      name: String,
      original_price: Number,
      sale_price: Number,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        }
      ],
      skus: {
        sku_id: Number,
        quantity: Number,
        size: String,
      }
    }
  ]
});

const styles = mongoose.model('Style', styleDetailsSchema);

const reviewsMetaSchema = new Schema({
  product_id: Number,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  recommended: {
    false: Number,
    true: Number,
  },
  characteristics: {
    fit: {
      id: Number,
      value: String, //TODO: check num types...values will be like: 2.4716981132075472
    }
  },
  Length: {
    id: Number,
    value: String,
  },
  Comfort: {
    id: Number,
    value: String,
  },
  Quality: {
    id: Number,
    value: String,
  }
});

const reviewsMetas = mongoose.model('Meta', reviewsMetaSchema);

const reviewsSchema = new Schema({
  product: Number,
  page: Number,
  count: Number,
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Boolean,
      response: String,
      body: String,
      date: Date,
      reviewerName: String,
      helpfulness: Number,
      photos: [
        {
          id: Number,
          url: String,
        }
      ]
    }
  ]
});

const reviewsSchemas = mongoose.model('Review', reviewsSchema);

const questionsDataSchema = new Schema({
  product_id: Number,
  results: [
    {
      question_id: Number,
      question_body: String,
      question_date: Date,
      asker_name: String,
      question_helpfulness: Number,
      reported: Boolean,
      answers: {// will have to re-map data prior to sending to client --> should be answers.{number}.body... etc
        id: Number,
        body: String,
        date: Date,
        answerer_name: String,
        helpfulness: Number,
        photos: [
          String
        ],
      },
    }
  ]
});

const questionsData = mongoose.model('QuestionData', questionsDataSchema);

module.exports = {
  Products,
  styles,
  reviewsMetas,
  reviewsSchemas,
  questionsData,
  db,
}

