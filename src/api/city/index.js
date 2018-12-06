import {Router} from 'express'
import {middleware as body} from 'bodymen'
import { master } from '../../services/passport'

import {fetchCity, findAll, find, addCity, addComment, fetchCities} from './city.controller'

const router = new Router()

router.get('/',
  master(),
  findAll
);

router.get('/fetch/city/:city',
  master(),
  fetchCity
);

router.get('/fetch/cities/:city',
  master(),
  fetchCities
);

router.get('/:city',
  master(),
  find
);

router.post('/',
  master(),
  body({
    city: {
      type: String,
      required: true,
      trim: true,
    }
  }),
  addCity
);

router.post('/comment',
  master(),
  body({
    city: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    }
  }),
  addComment
);

export default router
