import { success, notFound } from '../../services/response/'
import { Library } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Library.create(body)
    .then((library) => library.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Library.find(query, select, cursor).populate({path: 'book', select: 'title'})
    .then((libraries) => libraries.map((library) => library.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Library.findById(params.id)
    .then(notFound(res))
    .then((library) => library ? library.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Library.findById(params.id)
    .then(notFound(res))
    .then((library) => library ? Object.assign(library, body).save() : null)
    .then((library) => library ? library.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Library.findById(params.id)
    .then(notFound(res))
    .then((library) => library ? library.remove() : null)
    .then(success(res, 204))
    .catch(next)
