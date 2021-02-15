import { success, notFound } from '../../services/response/'
import { Book } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Book.create(body)
    .then((book) => book.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Book.find(query, select, cursor).populate('authors')
    .then((books) => books.map((book) => book.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => book ? book.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => book ? Object.assign(book, body).save() : null)
    .then((book) => book ? book.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => book ? book.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const lend = ({ bodymen: { body }, params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => book.lend(body.lender, body.due_date))
    .then((lending) => lending ? lending.view(true) : null)
    .then(success(res))
    .catch(next)

export const returnBook = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => book.returnBook())
    .then((lending) => lending ? lending.view(true) : null)
    .then(success(res))
    .catch(next)

export const available = (req, res, next) =>
  Book.available()
    .then(success(res))
    .catch(next)

// TODO
export const availableSoon = (req, res, next) =>
  Book.availableSoon()
    .then(success(res))
    .catch(next)
