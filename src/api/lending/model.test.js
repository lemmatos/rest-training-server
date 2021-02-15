import { Lending } from '.'

let lending

beforeEach(async () => {
  lending = await Lending.create({ state: 'test', lender: 'test', lending_date: 'test', due_date: 'test', return_date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = lending.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(lending.id)
    expect(view.state).toBe(lending.state)
    expect(view.lender).toBe(lending.lender)
    expect(view.lending_date).toBe(lending.lending_date)
    expect(view.due_date).toBe(lending.due_date)
    expect(view.return_date).toBe(lending.return_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = lending.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(lending.id)
    expect(view.state).toBe(lending.state)
    expect(view.lender).toBe(lending.lender)
    expect(view.lending_date).toBe(lending.lending_date)
    expect(view.due_date).toBe(lending.due_date)
    expect(view.return_date).toBe(lending.return_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
