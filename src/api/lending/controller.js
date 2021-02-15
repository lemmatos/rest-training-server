import { success, notFound } from '../../services/response/'
import { Lending } from '.'

import moment from 'moment'

export const create = ({ bodymen: { body } }, res, next) =>
  Lending.create(body)
    .then((lending) => lending.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Lending.find(query, select, cursor)
    .populate([{
      path: 'book',
      select: 'title'
    },
    {
      path: 'lender',
      select: 'name'
    }
    ])
    .then((lendings) => lendings.map((lending) => lending.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Lending.findById(params.id)
    .then(notFound(res))
    .then((lending) => lending ? lending.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Lending.findById(params.id)
    .then(notFound(res))
    .then((lending) => lending ? Object.assign(lending, body).save() : null)
    .then((lending) => lending ? lending.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Lending.findById(params.id)
    .then(notFound(res))
    .then((lending) => lending ? lending.remove() : null)
    .then(success(res, 204))
    .catch(next)
