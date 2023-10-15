const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../handlers/handlers')

module.exports = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBook
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook

  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
]
