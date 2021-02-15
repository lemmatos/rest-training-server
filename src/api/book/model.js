import mongoose, { Schema } from 'mongoose'
import moment from 'moment'

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: Schema.ObjectId,
    ref: 'Author',
    required: true
  }],
  year: {
    type: Date
  },
  isbn: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

bookSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      authors: this.authors,
      year: this.year,
      isbn: this.isbn,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  },

  lend (lender, dueDate) {
    const book = this
    const Lending = mongoose.model('Lending')
    return Lending.createFromBook(book, lender, dueDate)
  },

  returnBook () {
    const book = this
    const Lending = mongoose.model('Lending')
    return Lending.returnBook(book)
  }

}

bookSchema.statics = {
  available () {
    const Book = this
    const Lending = mongoose.model('Lending')
    return Lending.findAllBookIdsLent()
      .then((bookIds) => Book.find({ _id: { $nin: bookIds } }))
  },

  availableSoon () {
    const Book = this
    const Lending = mongoose.model('Lending')
    return Lending.findAllBookIdsLent()
      .then((bookIds) => Book.find({ _id: { $nin: bookIds } }))
  }
}

/** Para alterar outro modelo */
// const Author = mongoose.model("Author")
// return Author.find({
//     name: "Leandro"
// }).then((author) => {
//     console.log(author)
//     console.log(body)
//     res.status(500).json({
//         message: "not implemented yet"
//     })
// })

const model = mongoose.model('Book', bookSchema)

export const schema = model.schema
export default model
