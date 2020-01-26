
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = function (dbs) {

    var eventSchema = mongoose.Schema({
        name: {
            type: String, required: true
        },
        category: {
            type: String, enum: ['Conferencia', 'Seminario', 'Curso', 'Congreso'], required: true, default: 'Conferencia'
        },
        place: {
            type: String, required: true
        },
        address: {
            type: String, required: true
        },
        start_date: {
            type: Date, required: true
        },
        end_date: {
            type: Date, required: true
        },
        user: {
            type: Schema.Types.ObjectId, ref: 'User', required: true
        }

    }, {timestamps: true});

    if (dbs.dbMaster.models.Event) {
        return dbs.dbMaster.models.Event;
    }
    var event = dbs.dbMaster.model("Event", eventSchema);

    return event;
};
