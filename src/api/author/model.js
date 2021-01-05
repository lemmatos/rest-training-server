import mongoose, { Schema } from 'mongoose'

const authorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    death_date: {
        type: Date
    },
    country: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => { delete ret._id }
    }
})

authorSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            birth_date: this.birth_date,
            death_date: this.death_date,
            country: this.country,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Author', authorSchema)

export const schema = model.schema
export default model