var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB);

// Movie schema
// var ReviewSchema = new Schema({

// });

const ReviewSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    username: String,
    review: String,
    rating: { type: Number, min: 0, max: 5 },
    comment: String,
  });

  const aggregate = [
    {
      $match: { _id: movieId }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'movieId',
        as: 'movieReviews'
      }
    },
    {
      $addFields: {
        avgRating: { $avg: '$movieReviews.rating' }
      }
    },
    {
      $sort: { avgRating: -1 }
    }
  ];
  Movie.aggregate(aggregate).exec(function(err, docs) {});
  
  

// return the model
module.exports = mongoose.model('Review', ReviewSchema);