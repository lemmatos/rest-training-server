import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Library, { schema } from './model'

const router = new Router()
const { book, section } = schema.tree

/**
 * @api {post} /libraries Create library
 * @apiName CreateLibrary
 * @apiGroup Library
 * @apiParam book Library's book.
 * @apiParam section Library's section.
 * @apiSuccess {Object} library Library's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Library not found.
 */
router.post('/',
  body({ book, section }),
  create)

/**
 * @api {get} /libraries Retrieve libraries
 * @apiName RetrieveLibraries
 * @apiGroup Library
 * @apiUse listParams
 * @apiSuccess {Object[]} libraries List of libraries.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /libraries/:id Retrieve library
 * @apiName RetrieveLibrary
 * @apiGroup Library
 * @apiSuccess {Object} library Library's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Library not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /libraries/:id Update library
 * @apiName UpdateLibrary
 * @apiGroup Library
 * @apiParam book Library's book.
 * @apiParam section Library's section.
 * @apiSuccess {Object} library Library's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Library not found.
 */
router.put('/:id',
  body({ book, section }),
  update)

/**
 * @api {delete} /libraries/:id Delete library
 * @apiName DeleteLibrary
 * @apiGroup Library
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Library not found.
 */
router.delete('/:id',
  destroy)

export default router
