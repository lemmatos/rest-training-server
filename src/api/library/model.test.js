import { Library } from '.'

let library

beforeEach(async () => {
  library = await Library.create({ book: 'test', section: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = library.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(library.id)
    expect(view.book).toBe(library.book)
    expect(view.section).toBe(library.section)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = library.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(library.id)
    expect(view.book).toBe(library.book)
    expect(view.section).toBe(library.section)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
