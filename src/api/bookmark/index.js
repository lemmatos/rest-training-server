import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Bookmark, { schema } from './model'

const router = new Router()
const { name, size, color } = schema.tree

/**
 * @api {post} /bookmarks Create bookmark
 * @apiName CreateBookmark
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Bookmark's name.
 * @apiParam size Bookmark's size.
 * @apiParam color Bookmark's color.
 * @apiSuccess {Object} bookmark Bookmark's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookmark not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, size, color }),
  create)

/**
 * @api {get} /bookmarks Retrieve bookmarks
 * @apiName RetrieveBookmarks
 * @apiGroup Bookmark
 * @apiUse listParams
 * @apiSuccess {Object[]} bookmarks List of bookmarks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /bookmarks/:id Retrieve bookmark
 * @apiName RetrieveBookmark
 * @apiGroup Bookmark
 * @apiSuccess {Object} bookmark Bookmark's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookmark not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /bookmarks/:id Update bookmark
 * @apiName UpdateBookmark
 * @apiGroup Bookmark
 * @apiParam name Bookmark's name.
 * @apiParam size Bookmark's size.
 * @apiParam color Bookmark's color.
 * @apiSuccess {Object} bookmark Bookmark's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookmark not found.
 */
router.put('/:id',
  body({ name, size, color }),
  update)

/**
 * @api {delete} /bookmarks/:id Delete bookmark
 * @apiName DeleteBookmark
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bookmark not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
