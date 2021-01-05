import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Library } from '.'

const app = () => express(apiRoot, routes)

let library

beforeEach(async () => {
  library = await Library.create({})
})

test('POST /libraries 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ book: 'test', section: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.book).toEqual('test')
  expect(body.section).toEqual('test')
})

test('GET /libraries 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /libraries/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${library.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(library.id)
})

test('GET /libraries/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /libraries/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${library.id}`)
    .send({ book: 'test', section: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(library.id)
  expect(body.book).toEqual('test')
  expect(body.section).toEqual('test')
})

test('PUT /libraries/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ book: 'test', section: 'test' })
  expect(status).toBe(404)
})

test('DELETE /libraries/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${library.id}`)
  expect(status).toBe(204)
})

test('DELETE /libraries/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
