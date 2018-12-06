import {Router} from 'express'
import { master } from '../../services/passport'
import {find, findAll, add, removeBookmark} from './bookmark.controller'

import {middleware as body} from 'bodymen'

const router = new Router();

router.get('/:city',
  master(),
  find
);

router.get('/',
  master(),
  findAll
);

router.delete('/:city',
  master(),
  removeBookmark
  );

router.post('/',
  master(),
  body({
    city: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      trim: true
    }
  }),
  add
);

export default router
