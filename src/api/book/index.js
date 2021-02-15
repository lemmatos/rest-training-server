import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'

import { create, index, show, update, destroy, lend, returnBook, available, availableSoon } from './controller'
import { schema } from './model'

import { password as passwordAuth, master, token } from '../../services/passport'
import mongoose, { Schema } from 'mongoose'

export Book, { schema } from './model'

const router = new Router()
const { title, authors, year, isbn } = schema.tree

/**
 * @api {post} /books Create book
 * @apiName CreateBook
 * @apiGroup Book
 * @apiParam title Book's title.
 * @apiParam author Book's author.
 * @apiParam year Book's year.
 * @apiParam isbn Book's isbn.
 * @apiSuccess {Object} book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 */
router.post('/',
  body({
    title,
    authors,
    year,
    isbn
  }),
  create)

router.post('/:id/lend',
  token({ required: true, roles: ['admin'] }),
  body({
    lender: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    due_date: {
      type: Date
    }
  }),
  lend)

router.post('/:id/return',
  token({ required: true, roles: ['admin'] }),
  returnBook)

/**
 * @api {get} /books Retrieve books
 * @apiName RetrieveBooks
 * @apiGroup Book
 * @apiUse listParams
 * @apiSuccess {Object[]} books List of books.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

router.get('/available', // TODO
  query(),
  available)

router.get('/available-soon', // TODO
  query(),
  availableSoon)

/**
 * @api {get} /books/:id Retrieve book
 * @apiName RetrieveBook
 * @apiGroup Book
 * @apiSuccess {Object} book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /books/:id Update book
 * @apiName UpdateBook
 * @apiGroup Book
 * @apiParam title Book's title.
 * @apiParam author Book's author.
 * @apiParam year Book's year.
 * @apiParam isbn Book's isbn.
 * @apiSuccess {Object} book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 */
router.put('/:id',
  body({
    title,
    authors,
    year,
    isbn
  }),
  update)

/**
 * @api {delete} /books/:id Delete book
 * @apiName DeleteBook
 * @apiGroup Book
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Book not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
