const {model,Schema} = require('mongoose');


const UserSchema = Schema({
    name:{
        type:String,
        required:[true,'The name is required']
    },
    email:{
        type:String,
        required:[true,'The email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'The password is required']
    }
});

UserSchema.method('toJSON',function(){
    const {__v,_id,password,...object} = this.toObject();
    object.uid = _id;
    return object;

});

module.exports = model('User',UserSchema);