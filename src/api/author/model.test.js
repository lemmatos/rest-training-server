import { Author } from '.'

let author

beforeEach(async () => {
  author = await Author.create({ first_name: 'test', last_name: 'test', birth_date: 'test', death_date: 'test', country: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = author.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(author.id)
    expect(view.first_name).toBe(author.first_name)
    expect(view.last_name).toBe(author.last_name)
    expect(view.birth_date).toBe(author.birth_date)
    expect(view.death_date).toBe(author.death_date)
    expect(view.country).toBe(author.country)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = author.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(author.id)
    expect(view.first_name).toBe(author.first_name)
    expect(view.last_name).toBe(author.last_name)
    expect(view.birth_date).toBe(author.birth_date)
    expect(view.death_date).toBe(author.death_date)
    expect(view.country).toBe(author.country)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
