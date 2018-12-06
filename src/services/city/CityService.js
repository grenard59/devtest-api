import TeleportService from '../teleport'
import City from './city.model'

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    City
      .find()
      .lean()
      .then(cities => resolve(cities))
      .catch(err => reject(err));
  })
};

exports.find = (city) => {
  return new Promise((resolve, reject) => {
    City
      .find({name: new RegExp(city, 'i')})
      .lean()
      .then(city => resolve(city))
      .catch(err => reject(err));
  });
};

exports.fetchCity = (city) => {
  return new Promise((resolve, reject) => {
    TeleportService.fetchCity(city)
      .then(city => {
        if (city) {
          City
            .findOneAndUpdate({
              name: city.name,
            }, {
              name: city.name,
            }, {
              new: true,
              upsert: true
            }, () => {
            });
        }
        resolve(city);
      })
      .catch(err => reject(err));
  });
};

exports.fetchCities = (city) => {
  return new Promise((resolve, reject) => {
    TeleportService.fetchCities(city)
      .then(city => resolve(city))
      .catch(err => reject(err));
  })
};

exports.addCity = (city, postalCode) => {
  return new Promise((resolve, reject) => {
    City
      .findOneAndUpdate({
        name: city
      }, {
        name: city,
        postalCode: postalCode
      }, {
        upsert: true,
        new: true
      })
      .then(city => resolve(city))
      .catch(err => reject(err));
  });
};

exports.addComment = (city, message, author) => {
  return new Promise((resolve, reject) => {
    City
      .findOneAndUpdate({
        name: city,
      }, {
        $push: {
          messages: {
            message: message,
            author: author
          }
        }
      }, {
        new: true,
        upsert: true
      })
      .then(result => resolve(result))
      .catch(err => reject(err));
  })
};
