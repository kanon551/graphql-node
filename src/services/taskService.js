const { ExceptionResolver } = require('../middleware/ExceptionResolver');
const Event = require('../models/event');
const User = require('../models/user');
const { ConflictException, DataNotFoundException } = require('../utils/exceptions');
const logger = require("../utils/logger");
const CryptoJS = require('crypto-js');


const createTask = async(title, description, due_date, assignee) => {
    try{
           let createdEvnt = [];

            const event = new Event({
                title: title,
                description: description,
                due_date: new Date(),
                assignee: assignee,
                creator: '65e9425f976140ac30e4209f'
            });

            const result = await event.save();
            const cretor = await getUser(result._doc.creator)

            createdEvnt = { ...result._doc, _id: event._doc._id.toString(),  
                due_date: new Date(event._doc.due_date).toISOString(),
                 creator: cretor };

            const registeredUser =  await User.findById('65e9425f976140ac30e4209f');

            if(!registeredUser){
                throw new DataNotFoundException(`User not found for id: ${'65e9425f976140ac30e4209f'}`);
            }
            else {
                const newObj = registeredUser.createdTasks.push(event);
                await registeredUser.save();
                
                return createdEvnt;
                
            }



    }
    catch(err){
        logger.error(`createTask -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}

const GetAllTasks = async() => {
    try{
        const events = await Event.find();

            const tasksWithUsers = await Promise.all(
                events.map(async (event) => {
                    const obtainedUser = await getUser(event.creator);
                    return {
                        ...event._doc,
                        _id: event.id,
                        due_date: new Date(event._doc.due_date).toISOString(),
                        creator: obtainedUser,
                    };
                })
            );

            return tasksWithUsers;
    }
    catch(err){
        logger.error(`GetAllTasks -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}

const saveUser = async(email, password) => {
    try{

        const registeredEmail =  await User.findOne({email: email});

        if(registeredEmail){
            throw new ConflictException(`${email} is already registered`)
        }
        else{
            const cipherPassword = CryptoJS.AES.encrypt((password), process.env.MONGO_PASS_ENCRYPTION).toString();
            console.log(cipherPassword)
    
            const user = new User({
                email: email,
                password: cipherPassword,
            });
    
            const result = await user.save();
    
            return { ...result._doc, password: null, _id: user._doc._id.toString() };
        }

        

    }
    catch(err){
        logger.error(`saveUser -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}

const getUser = async(userID, depth = 0) => {
    try{
        if (depth >= 1) {
            // Stop recursion after one level
            return null;
        }

        const user =  await User.findById(userID);
        const newTasks = await events(user._doc.createdTasks, depth + 1)

        return { ...user._doc, 
                _id: user.id,
                createdTasks: newTasks
             };
         
    }
    catch(err){
        logger.error(`getUser -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}

const events = async(eventIDs, depth = 0) => {
    try{
        const events = await Event.find({_id: {$in: eventIDs}});

            const eventsWithUsers = await Promise.all(
                events.map(async (event) => {
                    const obtainedUser = await getUser(event.creator, depth + 1);
                    return {
                        ...event._doc,
                        _id: event.id,
                        due_date: new Date(event._doc.due_date).toISOString(),
                        creator: obtainedUser,
                    };
                })
            );

            return eventsWithUsers;
    }
    catch(err){
        logger.error(`events -> ${err.message}`);
        ExceptionResolver(err, null);
    }
}

module.exports = {createTask, GetAllTasks, saveUser};
