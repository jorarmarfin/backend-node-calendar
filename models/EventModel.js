const {model,Schema} = require("mongoose");


const EventSchema = Schema({
    title:{
        type:String,
        required:[true,'The title is required']
    },
    notes:{
        type:String
    },
    start:{
        type:Date,
        required:[true,'The start date is required']
    },
    end:{
        type:Date,
        required:[true,'The end date is required']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});
//la respuesta de las acciones es
/*{
    "_id": "667b553bf60725b01e1159ef",
    "title": "titulo de evento",
    "user": "667a5328c1e9d58fe48633d0",
    "__v": 0
}
Para poder modificarlo realizo lo siguiente
*/
EventSchema.method('toJSON',function(){
    const {__v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Event',EventSchema);