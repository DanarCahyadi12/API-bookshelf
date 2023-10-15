const { nanoid } = require('nanoid')
const { getCurrentDate, Response } = require('../utils/utils')
const books = require('../data/books')
const {
  getAllReadingsBooks,
  getAllUnfinishedBooks,
  getAllUnreadingBooks,
  getAllFinishedBooks,
  searchBooks
} = require('../helpers/helpers')

const addBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.payload
  const id = nanoid()

  if (!name) {
    return Response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
      code: 400,
      h
    })
  }
  if (readPage > pageCount) {
    return Response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      code: 400,
      h
    })
  }
  const isFinished = readPage === pageCount
  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: isFinished,
    reading,
    insertedAt: getCurrentDate(),
    updatedAt: getCurrentDate()
  }
  books.push(book)
  return Response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
    code: 201,
    h
  })
}

const getBooks = (req, h) => {
  const { reading } = req.query
  const { finished } = req.query
  const { name } = req.query
  if (reading === '1') {
    return Response({
      status: 'success',
      data: { books: getAllReadingsBooks() },
      code: 200,
      h
    })
  }
  if (reading === '0') {
    return Response({
      status: 'success',
      data: { books: getAllUnreadingBooks() },
      code: 200,
      h
    })
  }
  if (finished === '1') {
    return Response({
      status: 'success',
      data: { books: getAllFinishedBooks() },
      code: 200,
      h
    })
  }
  if (finished === '0') {
    return Response({
      status: 'success',
      data: { books: getAllUnfinishedBooks() },
      code: 200,
      h
    })
  }

  if (name) {
    return Response({
      status: 'success',
      data: { books: searchBooks(name) },
      code: 200,
      h
    })
  }
  const booksWithMinimProps = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }
  })
  return Response({
    status: 'success',
    data: {
      books: booksWithMinimProps
    },
    code: 200,
    h
  })
}

const getBook = (req, h) => {
  const { bookId } = req.params
  const book = books.find((book) => book.id === bookId)
  if (!book) {
    return Response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
      code: 404,
      h
    })
  }
  return Response({ status: 'success', data: { book }, code: 200, h })
}

const updateBook = (req, h) => {
  const { bookId } = req.params
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.payload
  if (!name) {
    return Response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
      code: 400,
      h
    })
  }
  if (readPage > pageCount) {
    return Response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      code: 400,
      h
    })
  }

  const index = books.findIndex((book) => book.id === bookId)
  if (index === -1) {
    return Response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
      code: 404,
      h
    })
  }
  books[index] = {
    id: books[index].id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt: books[index].insertedAt,
    finished: books[index].finished,
    updatedAt: getCurrentDate()
  }

  return Response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
    h,
    code: 200
  })
}

const deleteBook = (req, h) => {
  const { bookId } = req.params
  const index = books.findIndex((book) => book.id === bookId)
  if (index === -1) {
    return Response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
      code: 404,
      h
    })
  }

  books.splice(index, 1)
  return Response({
    status: 'success',
    message: 'Buku berhasil dihapus',
    code: 200,
    h
  })
}
module.exports = { addBook, getBooks, getBook, updateBook, deleteBook }
