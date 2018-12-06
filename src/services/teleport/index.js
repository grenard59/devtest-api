import rp from 'request-promise'
import _ from 'lodash'

import { TELEPORT_API_URL, TELEPORT_CITIES_ENDPOINT, TELEPORT_NAMEID_ENDPOINT} from '../../constants'

exports.fetchCities = (city) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${TELEPORT_API_URL}${TELEPORT_CITIES_ENDPOINT}${city}`
    };
    rp(options)
      .then(res => {
        const result = _.get(JSON.parse(res), '_embedded.city:search-results');
        // let cities = _.map(_)
        return resolve(result);
      })
      .catch(err => reject(err));
  });
};

exports.fetchCity = (city) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${TELEPORT_API_URL}${TELEPORT_NAMEID_ENDPOINT}${city}`
    };
    rp(options)
      .then(res => {
        const result = JSON.parse(res);
        return resolve(result);
      })
      .catch(err => reject(err));
  });
};
