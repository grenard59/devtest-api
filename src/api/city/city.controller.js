import CityService from '../../services/city/CityService'


export const findAll = ({params}, res, next) => {
  CityService.findAll()
    .then(cities => res.json(cities))
    .catch(err => res.json(err));
};

export const find = ({params}, res, next) => {
  CityService.find(params.city)
    .then(city => res.json(city))
    .catch(err => res.json(err));
};

export const fetchCity = ({params}, res) => {
  CityService.fetchCity(params.city)
    .then(cities => {
      res.json(cities)
    })
    .catch(err => res.json(err));
};

export const fetchCities = ({params}, res) => {
  CityService.fetchCities(params.city)
    .then(cities => res.json(cities))
    .catch(err => res.json(err));
};

export const addCity = ({bodymen: {body}}, res, next) => {
  CityService.addCity(body.city, body.postalCode)
    .then(result => res.json(result))
    .catch(err => res.json(err));
};

export const addComment = ({bodymen: {body}}, res, next) => {
CityService.addComment(body.city, body.message, body.author)
    .then(result => {
      res.json(result)
    })
    .catch(err => res.json(err));
};

