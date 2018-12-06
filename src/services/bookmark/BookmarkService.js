import _ from 'lodash'
import Bookmark from './bookmark.model'
import City from "../city/city.model";

exports.deleteBookmark = (city) => {
  return new Promise((resolve, reject) => {
    City
      .find({
        name: new RegExp(city, 'i')
      })
      .lean()
      .then(cities => {
        if (!cities || _.isEmpty(cities)) {
          throw new Error('No city found');
        }
        return Bookmark
          .deleteOne({
            city: _.first(cities)._id
          })
      })
      .then(() => Bookmark.find().populate('city').lean())
      .then(results => resolve(_.map(results, item => {
        return {
          city: item.city.name,
          messages: item.messages
        }
      })))
      .catch(err => reject(err));
  })
};

exports.findBookmark = (city) => {
  return new Promise((resolve, reject) => {
    City
      .find({
        name: new RegExp(city, 'i')
      })
      .then(result => {
        if (!result || _.isEmpty(result)) {
          throw new Error(`City not found`);
        }
        const city = _.first(result);
        return Bookmark
          .find({
            city: city._id
          })
          .populate('city')
          .lean();
      })
      .then(bookmark => resolve(bookmark))
      .catch(err => reject(err));

  });
};

exports.addBookmark = (text, message) => {
  return new Promise((resolve, reject) => {
    let city = {};
    City
      .find({
        name: text
      })
      .then(result => {
        if (!result || _.isEmpty(result)) {
          throw new Error(`City ${city} not found`);
        }
        city = _.first(result);
        if (!message) {
          return Bookmark.create({
            city: city._id
          })
        }
        return Bookmark
          .findOneAndUpdate({
            city: city._id,
          }, {
            $push: {messages: {message: message}}
          }, {
            new: true,
            upsert: true
          });
      })
      .then(() => Bookmark.find().populate('city').lean())
      .then(results => resolve(_.map(results, item => {
        return {
          city: item.city.name,
          messages: item.messages
        }
      })))
      .catch(err => reject(err));
  })
};

exports.findAllBookmark = () => {
  return new Promise((resolve, reject) => {
    Bookmark.find()
      .populate('city')
      .then(bookmarks => resolve(_.map(bookmarks, item => {
        return {
          city: item.city.name,
          messages: item.messages
        }
      })))
      .catch(err => reject(err));
  })
};
