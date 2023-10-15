const books = require('../data/books')

const getAllReadingsBooks = () => {
  return books
    .filter((book) => book.reading === true)
    .map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
}

const getAllUnreadingBooks = () => {
  return books
    .filter((book) => book.reading === false)
    .map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
}
const getAllFinishedBooks = () => {
  return books
    .filter((book) => book.finished === true)
    .map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
}
const getAllUnfinishedBooks = () => {
  return books
    .filter((book) => book.finished === false)
    .map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
}

const searchBooks = (query) => {
  return books
    .filter(
      (book) => book.name.toLowerCase().includes(query.toLowerCase()) === true
    )
    .map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
}

module.exports = {
  getAllReadingsBooks,
  getAllUnreadingBooks,
  getAllFinishedBooks,
  getAllUnfinishedBooks,
  searchBooks
}
