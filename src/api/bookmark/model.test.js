import { Bookmark } from '.'
import { User } from '../user'

let user, bookmark

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  bookmark = await Bookmark.create({ creator: user, name: 'test', size: 'test', color: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bookmark.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookmark.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.name).toBe(bookmark.name)
    expect(view.size).toBe(bookmark.size)
    expect(view.color).toBe(bookmark.color)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bookmark.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookmark.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.name).toBe(bookmark.name)
    expect(view.size).toBe(bookmark.size)
    expect(view.color).toBe(bookmark.color)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
