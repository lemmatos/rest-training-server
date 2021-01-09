import mongoose, { Schema } from 'mongoose'
import moment from "moment"

const states = Object.freeze({
    STATE_CREATED: "created",
    STATE_LENT: "lent",
    STATE_COMPLETED: "completed",
    STATE_OVERDUE: "overdue",
    STATE_COMPLETED_OVERDUE: "completed_overdue"
})


const lendingSchema = new Schema({
    state: {
        type: String,
        default: states.STATE_CREATED
    },
    book: {
        type: Schema.ObjectId,
        ref: "Book"
    },
    lender: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    lending_date: {
        type: Date
    },
    due_date: {
        type: Date
    },
    return_date: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (obj, ret) => { delete ret._id }
    }
})

lendingSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            state: this.state,
            book: this.book,
            lender: this.lender,
            lending_date: this.lending_date,
            due_date: this.due_date,
            return_date: this.return_date,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }

}

lendingSchema.statics = {
    createFromBook(book, lender, dueDate) {
        const bookId = book._id || book
        const Lending = this
            // console.log({...lending })
        return Lending.findOne({ book: bookId, state: { $nin: [states.STATE_COMPLETED, states.STATE_COMPLETED_OVERDUE] } }) // TODO - usar constantes
            .then((lending) => {
                // console.log({...lending })
                if (lending !== null) {
                    console.log("ja esta emprestado " + lending.id)
                    return lending
                } else {
                    console.log("nao alugado")
                    const bookDueDate = dueDate || moment().add(7, "days").endOf("day").toDate()
                    return Lending.create({
                        state: states.STATE_LENT,
                        book: bookId,
                        lender,
                        lending_date: moment().toDate(),
                        due_date: dueDate
                    })
                }
            })
    },

    returnBook(book) {
        const bookId = book._id || book
        const Lending = this
        return Lending.findOne({ book: bookId, state: { $nin: [states.STATE_COMPLETED, states.STATE_COMPLETED_OVERDUE] } })
            .then((lending) => {
                if (lending) {
                    // TODO lending.state = states.STATE_OVERDUE
                    switch (lending.state) {
                        case states.STATE_LENT:
                            return lending.set("state", states.STATE_COMPLETED)
                                .set("return_date", moment().toDate())
                                .save()
                        case states.STATE_OVERDUE:
                            return lending.set("state", states.STATE_COMPLETED_OVERDUE)
                                .set("return_date", moment().toDate())
                                .save()
                        default:
                            return Promise.reject({
                                type: "internal",
                                subtype: "lending.returnbook.unknown_state",
                                message: `cannot handle state ${lending.state} of lending ${lending._id}`
                            })
                    }
                    // return null
                } else {
                    console.log("nao pode ser devolvido")
                    return Promise.reject({
                        type: "notfound",
                        subtype: "lending.returnbook.cannot_find_lending",
                        message: `cannot return lending for book ${bookId}`
                    })
                }
            })

        // return book.set("state", states.STATE_RETURNED) //TODO
        //     .set("lender", undefined)
        //     .set("lending_date", undefined)
        //     .set("due_date", undefined)
        //     .set("return_date", moment().toDate())
        //     .save()
        // is_lent: false,
        // lending_date: "",
        // due_date: "",
        // return_date: body.return_date
    },

    findAllBookIdsLent() {
        const Lending = this
        return Lending.distinct("book", { state: { $in: [states.STATE_LENT, states.STATE_OVERDUE] } })
    }
}


const model = mongoose.model('Lending', lendingSchema)

export const schema = model.schema
export default model