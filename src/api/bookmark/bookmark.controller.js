import BookMarkService from '../../services/bookmark/BookmarkService'

export const removeBookmark = (({params}, res) => {
  BookMarkService.deleteBookmark(params.city)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

export const find = ({params}, res, next) => {
  BookMarkService.findBookmark(params.city)
    .then(bookmarks => {
      if (!bookmarks) {
        new Error(`No bookmark for "${body.city}" found`);
      }
      res.json(bookmarks)
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      return res.json(err);
    })
};

export const findAll = ({params}, res, next) => {
  BookMarkService.findAllBookmark()
    .then(bookmarks => res.json(bookmarks))
    .catch(err => res.json(err));
};

export const add = ({bodymen: {body}}, res, next) => {
  BookMarkService.addBookmark(body.city, body.message)
    .then(result => res.json(result))
    .catch(err => res.json(err));
};
