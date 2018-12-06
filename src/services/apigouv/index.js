import rp from 'request-promise'
import _ from 'lodash'
import { GOUV_API_URL, GOUV_ENDPOINT } from '../../constants'

export default (text) => {
  return new Promise((resolve, reject) => {
    const CP = text.match(/\b\d{5}\b/g);
    let param = '';
    if (CP && !_.isEmpty(CP)) {
      param = `codePostal=${_.first(CP)}`;
    } else {
      param = `nom=${text}`;
    }
    const options = {
      uri: `${GOUV_API_URL}${GOUV_ENDPOINT}${param}`
    };
    rp(options)
      .then(res => {
        if (!res) {
          return resolve();
        }
        const cities = JSON.parse(res);
        if (!_.isEmpty(cities) && cities.length > 1) {
          const city = _.find(cities, o => text.toLowerCase() === o.nom.toLowerCase());
          if (city) {
            return resolve([city]);
          }
        }
        return resolve(cities);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  })
}
