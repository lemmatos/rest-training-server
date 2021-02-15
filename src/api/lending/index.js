import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'

import { password as passwordAuth, master, token } from '../../services/passport'
import mongoose, { Schema } from 'mongoose'

export Lending, { schema }
  from './model'

const router = new Router()
const { state, lender, lending_date, due_date, return_date } = schema.tree

/**
 * @api {post} /lendings Create lending
 * @apiName CreateLending
 * @apiGroup Lending
 * @apiParam state Lending's state.
 * @apiParam lender Lending's lender.
 * @apiParam lending_date Lending's lending_date.
 * @apiParam due_date Lending's due_date.
 * @apiParam return_date Lending's return_date.
 * @apiSuccess {Object} lending Lending's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lending not found.
 */
router.post('/',
  body({ state, lender, lending_date, due_date, return_date }),
  create)

/**
 * @api {get} /lendings Retrieve lendings
 * @apiName RetrieveLendings
 * @apiGroup Lending
 * @apiUse listParams
 * @apiSuccess {Object[]} lendings List of lendings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /lendings/:id Retrieve lending
 * @apiName RetrieveLending
 * @apiGroup Lending
 * @apiSuccess {Object} lending Lending's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lending not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /lendings/:id Update lending
 * @apiName UpdateLending
 * @apiGroup Lending
 * @apiParam state Lending's state.
 * @apiParam lender Lending's lender.
 * @apiParam lending_date Lending's lending_date.
 * @apiParam due_date Lending's due_date.
 * @apiParam return_date Lending's return_date.
 * @apiSuccess {Object} lending Lending's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lending not found.
 */
router.put('/:id',
  body({ state, lender, lending_date, due_date, return_date }),
  update)

/**
 * @api {delete} /lendings/:id Delete lending
 * @apiName DeleteLending
 * @apiGroup Lending
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Lending not found.
 */
router.delete('/:id',
  destroy)

export default router
