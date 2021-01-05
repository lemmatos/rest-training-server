import mongoose, { Schema } from 'mongoose'

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
    view(full) {
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
    }
}

const model = mongoose.model('Book', bookSchema)

export const schema = model.schema
export default model