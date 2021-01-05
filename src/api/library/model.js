import mongoose, { Schema } from 'mongoose'

const librarySchema = new Schema({
    book: {
        type: Schema.ObjectId,
        ref: 'Book',
        required: true
    },
    section: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => { delete ret._id }
    }
})

librarySchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            book: this.book,
            section: this.section,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Library', librarySchema)

export const schema = model.schema
export default model