import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Author } from '.'

const app = () => express(apiRoot, routes)

let author

beforeEach(async () => {
  author = await Author.create({})
})

test('POST /authors 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ first_name: 'test', last_name: 'test', birth_date: 'test', death_date: 'test', country: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.first_name).toEqual('test')
  expect(body.last_name).toEqual('test')
  expect(body.birth_date).toEqual('test')
  expect(body.death_date).toEqual('test')
  expect(body.country).toEqual('test')
})

test('GET /authors 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /authors/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${author.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(author.id)
})

test('GET /authors/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /authors/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${author.id}`)
    .send({ first_name: 'test', last_name: 'test', birth_date: 'test', death_date: 'test', country: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(author.id)
  expect(body.first_name).toEqual('test')
  expect(body.last_name).toEqual('test')
  expect(body.birth_date).toEqual('test')
  expect(body.death_date).toEqual('test')
  expect(body.country).toEqual('test')
})

test('PUT /authors/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ first_name: 'test', last_name: 'test', birth_date: 'test', death_date: 'test', country: 'test' })
  expect(status).toBe(404)
})

test('DELETE /authors/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${author.id}`)
  expect(status).toBe(204)
})

test('DELETE /authors/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
