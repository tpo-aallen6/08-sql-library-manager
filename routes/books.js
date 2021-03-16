const express = require('express')
const router = express.Router()
const Book = require('../models').Book

/* Handler function to wrap each route. From Treehouse Express Workshop*/
function asyncHandler (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      // Forward error to the global error handler
      next(error)
    }
  }
}

/* GET home page - redirect */
router.get('/', (req, res, next) => {
  res.redirect('/books')
})

/* GET home page */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll()
  res.render('index', { books, title: 'Books' })
}))

/* GET new book form */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book', { book: {}, title: 'New Book' })
}))

/* POST new book form */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book
  try {
    book = await Book.create(req.body)
    res.redirect('/books')
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body)
      res.render('new-book', { book, title: 'New Book', errors: error.errors })
    } else {
      throw error
    }
  }
}))

/* GET books/:id - shows detailed info */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  if (book) {
    res.render('update-book', { book: book })
  } else {
    res.render('page-not-found')
  }
}))

/* POST books/:id - Update Book */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book
  try {
    book = await Book.findByPk(req.params.id)
    if (book) {
      await book.update(req.body)
      res.redirect('/books/')
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body)
      res.render('update-book', { book, title: 'Update Book', errors: error.errors })
    } else {
      throw error
    }
  }
}))

/* DELETE books/:id - Delete Book */
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  await book.destroy()
  res.redirect('/books')
}))

/* page not found */
router.use((req, res, next) => {
  res.render('page-not-found', {
    err:
    {
      message: 'That page does not exist, please go back.',
      status: 404
    }
  })
})


module.exports = router
