const Event = require('../models/EventModel');
const getEvents = async (req, res) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        data: events
    });

}
const createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        const savedEvent = await event.save();
        res.json({
            ok: true,
            message: 'Event created',
            data: savedEvent
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error creating event',
        });
    }
}
const updateEvent = async (req, res) => {
    const userId = req.uid;
    const eventId = req.params.id;

    try{
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok: false,
                message: 'Event not found'
            });
        }
        if(event.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                message: 'You do not have the privilege to edit this event'
            });
        }
        const newEvent = {
            ...req.body,
            user: userId
        }
        const eventoUpdated = await Event.findByIdAndUpdate(eventId,newEvent,{new:true});

        res.json({
            ok: true,
            message: 'Event updated',
            data: eventoUpdated
        });


    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error updating event',
        });
    }


}
const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const userId = req.uid;
    const event = await Event.findById(eventId);
    if(!event){
        return res.status(404).json({
            ok: false,
            message: 'Event not found'
        });
    }
    if(event.user.toString() !== userId){
        return res.status(401).json({
            ok: false,
            message: 'You do not have the privilege to delete this event'
        });
    }
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({
        ok: true,
        message: 'deleteEvent'
    });
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}