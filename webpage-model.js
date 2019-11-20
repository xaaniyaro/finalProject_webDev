let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

///////////// EVENTOS ////////////////
let eventsSchema = mongoose.Schema({
    ID : {type : String, require : true},
    Title : {type : String, require : true},
    Description : {type : String, require : true},
    Image_URL : {type : String, require : true},
    Date : {type : String, require : true}
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
        return Events.findOneAndDelete({ID: ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    },
    updateEvent: async function(newEvent) {
        return Events.findOneAndUpdate({ID: newEvent.ID}, {$set: newEvent})
                    .then(Event => Event)
                    .catch(err => { throw Error(err) });
    }
};

/////////// CONVOCATORIAS /////////////
let tournamentsSchema = mongoose.Schema({
    ID : {type : String, require : true},
    Title : {type : String, require : true},
    Description : {type: String, require : true},
    Image_URL : {type: String, require : true},
    Date : {type : String, require : true},
    Link : {type : String, require : true}
});

let tournaments = mongoose.model('Convocatorias', tournamentsSchema);

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
        return Tournaments.findOneAndDelete({ID: ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    },
    getTournamentsByName: async function(searchTerm) {
        return Tournaments.find({Title : {$regex : searchTerm}})
                    .then(Tournaments => Tournaments)
                    .catch(err => { throw Error(err) });
    },
};

/////////////// EVALUACIONES /////////////
let evaluationsSchema = mongoose.Schema({
    ID : {type : String, require : true},
    Name : {type : String, require : true},
    Grade : {type : String, require : true},
    Group : {type : String, require : true}
});

let evaluations = mongoose.model('Evaluaciones', evaluationsSchema);

let EvaluationList = {
    getEvaluationsByGroup: async function(Group) {
        return Evaluations.find({Group : Group})
                    .then(Evaluations => Evaluations)
                    .catch(err => { throw Error(err) });
    },
    createEvaluation: async function(Evaluation) {
        return Evaluations.create(Evaluation)
                    .then(newEvaluation => newEvaluation)
                    .catch(err => { throw Error(err) });
    },
    deleteEvaluation: async function(ID) {
        return Evaluations.findOneAndDelete({ID: ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    }
};

////////////// MATERIALES //////////////
let materialsSchema = mongoose.Schema({
    ID : {type : String, require : true},
    Title : {type : String, require : true},
    Description : {type : String, require : true},
    Subject : {type : String, require : true},
    Link : {type : String, require : true}
    UserID : {type : String, require : true}
});

let materials = mongoose.model('Materiales', materialsSchema);

let MaterialList = {
    getAllMaterials: async function() {
        return Tournaments.find()
                    .then(Tournaments => Tournaments)
                    .catch(err => { throw Error(err) });
    },
    getMaterialsBySubject: async function(Subject) {
        return Materials.find({Subject : Subject})
                    .then(Materials => Materials)
                    .catch(err => { throw Error(err) });
    },
    createMaterial: async function(Material) {
        return Materials.create(Material)
                    .then(newMaterial => newMaterial)
                    .catch(err => { throw Error(err) });
    },
    deleteMaterial: async function(ID) {
        return Materials.findOneAndDelete({ID: ID})
                    .then(deleted => deleted)
                    .catch(err => { throw Error(err) });
    }
};

/////////////// CONTACT /////////////////
let contactSchema = mongoose.Schema({
    Title : {type : String, require : true},
    Phone : {type : String, require : true},
    Email : {type : String, require : true},
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
    ID : {type : String, require : true},
    Name : {type : String, require : true},
    Email : {type : String, require : true},
    Password : {type : String, require : true},
    Principal : {type : Boolean, require : true}
});

let Users = mongoose.model('Usuarios', usersSchema);

let UserList = {
    getUserWithEmail: async function(mail) {
        return Users.findOne({Email: mail})
                    .then(Users => Users)
                    .catch(err => { throw Error(err) });
    },
    createUser: async function(User) {
        return Users.create(User)
                    .then(newUser => newUser)
                    .catch(err => { throw Error(err) });
    }
};


module.exports = {UserList, EventList, TournamentList, EvaluationList, MaterialList, ContactList};
