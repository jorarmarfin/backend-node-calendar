const express = require('express');
const {getEvents, createEvent, updateEvent, deleteEvent} = require("../controllers/eventsController");
const {validateJWT} = require("../middlewares/validateJWT");
const {checkTitle, checkNotes, checkStart, checkEnd, validateFieldsEvent} = require("../requests/eventsRequest");
const router = express.Router();

router.use(validateJWT);

router.get('/', getEvents);
router.post('/',[
    checkTitle,
    checkNotes,
    checkStart,
    checkEnd,
    validateFieldsEvent,
], createEvent);
router.put('/:id',[
    checkTitle,
    checkStart,
    checkEnd,
    validateFieldsEvent,
], updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;