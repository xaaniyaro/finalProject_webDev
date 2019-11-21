let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

///////////// EVENTOS ////////////////
let eventsSchema = mongoose.Schema({
    id : {type : String, require : true},
    title : {type : String},
    description : {type : String},
    img : {type : String},
    date : {type : String}
});

let Events = mongoose.model('Eventos', eventsSchema);

let EventList = {
    getAllEvents: async function() {
        return Events.find()
                    .then(Events => Events)
                    .catch(err => { throw Error(err) });
    },
    createEvent: async function(Event) {
        return Events.create(Event)
                    .then(newEvent => newEvent)
                    .catch(err => { throw Error(err) });
    },
    deleteEvent: async function(ID) {
        return Events.findOneAndDelete({id : ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    },
    updateEvent: async function(newEvent) {
        return Events.findOneAndUpdate({id: newEvent.id}, {$set: newEvent})
                    .then(Event => Event)
                    .catch(err => { throw Error(err) });
    }
};

/////////// CONVOCATORIAS /////////////
let tournamentsSchema = mongoose.Schema({
    id : {type : String, require : true},
    title : {type : String},
    description : {type: String},
    img : {type: String},
    link : {type : String},
    date : {type : String}
});

let Tournaments = mongoose.model('Convocatorias', tournamentsSchema);

let TournamentList = {
    getAllTournaments: async function() {
        return Tournaments.find()
                    .then(Tournaments => Tournaments)
                    .catch(err => { throw Error(err) });
    },
    createTournament: async function(Tournament) {
        return Tournaments.create(Tournament)
                    .then(newTournament => newTournament)
                    .catch(err => { throw Error(err) });
    },
    deleteTournament: async function(ID) {
        return Tournaments.findOneAndDelete({id : ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    },
    getTournamentsByName: async function(searchTerm) {
        return Tournaments.find({title : {$regex : searchTerm}})
                    .then(Tournaments => Tournaments)
                    .catch(err => { throw Error(err) });
    },
};

/////////////// EVALUACIONES /////////////
let evaluationsSchema = mongoose.Schema({
    id : {type : String, require : true},
    nombre : {type : String, require : true},
    grade : {type : String, require : true},
    grupo : {type : String, require : true}
});

let Evaluations = mongoose.model('Evaluaciones', evaluationsSchema);

let EvaluationList = {
    getEvaluationsByGroup: async function(Group) {
        return Evaluations.find({grupo : Group})
                    .then(Evaluations => Evaluations)
                    .catch(err => { throw Error(err) });
    },
    createEvaluation: async function(Evaluation) {
        return Evaluations.create(Evaluation)
                    .then(newEvaluation => newEvaluation)
                    .catch(err => { throw Error(err) });
    },
    deleteEvaluation: async function(ID) {
        return Evaluations.findOneAndDelete({id : ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    }
};

////////////// MATERIALES //////////////
let materialsSchema = mongoose.Schema({
    id : {type : String, require : true},
    title : {type : String, require : true},
    description : {type : String, require : true},
    tipo : {type : String, require : true},
    userID : {type : String, require : true},
    name : {type : String, require : true}
});

let Materials = mongoose.model('Materiales', materialsSchema);

let MaterialList = {
    getAllMaterials: async function() {
        return Materials.find()
                    .then(Tournaments => Tournaments)
                    .catch(err => { throw Error(err) });
    },
    getMaterialsBySubject: async function(Subject) {
        return Materials.find({tipo : Subject})
                    .then(Materials => Materials)
                    .catch(err => { throw Error(err) });
    },
    createMaterial: async function(Material) {
        return Materials.create(Material)
                    .then(newMaterial => newMaterial)
                    .catch(err => { throw Error(err) });
    },
    deleteMaterial: async function(ID) {
        return Materials.findOneAndDelete({id: ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    }
};

/////////////// CONTACT /////////////////
let contactSchema = mongoose.Schema({
    title : {type : String, require : true},
    tel : {type : String, require : true},
});

let Contacts = mongoose.model('Contacto', contactSchema);

let ContactList = {
    getContact: async function() {
        return Contacts.findOne()
                    .then(Contacts => Contacts)
                    .catch(err => { throw Error(err) });
    },
    updateContact: async function(newContact) {
        return Contacts.findOneAndUpdate({$set: newContact})
                    .then(Contact => Contact)
                    .catch(err => { throw Error(err) });
    },
    createContact: async function(Contact) {
        return Contacts.create(Contact)
                    .then(newContact => newContact)
                    .catch(err => { throw Error(err) });
    }
};

////////////// USUARIOS /////////////////
let usersSchema = mongoose.Schema({
    id : {type : String, require : true},
    name : {type : String, require : true},
    email : {type : String, require : true},
    pass : {type : String, require : true},
    principal : {type : Boolean, require : true}
});

let Users = mongoose.model('Usuarios', usersSchema);

let UserList = {
    getUserWithEmail: async function(mail) {
        return Users.findOne({email: mail})
                    .then(Users => Users)
                    .catch(err => { throw Error(err) });
    },
    emailExists: async function(mail) {
        return Users.findOne({email: mail})
                    .then(function(result){
                    return result !== null;});
    },
    createUser: async function(User) {
        return Users.create(User)
                    .then(newUser => newUser)
                    .catch(err => { throw Error(err) });
    },
    deleteAll: async function() {
        return Users.remove()
                    .then(User => User)
                    .catch(err => { throw Error(err) });
    }
};


module.exports = {UserList, EventList, TournamentList, EvaluationList, MaterialList, ContactList};
