let express = require("express");
let bodyparser = require("body-parser");
let morgan = require("morgan");
let uuidv4 = require('uuid/v4');
let mongoose = require('mongoose');

let {UserList} = require('./webpage-model');
let {EventList} = require('./webpage-model');
let {TournamentList} = require('./webpage-model');
let {EvaluationList} = require('./webpage-model');
let {MaterialList} = require('./webpage-model');
let {ContactList} = require('./webpage-model');

const {DATABASE_URL, PORT} = require('./config');

let app = express();
let jsonParser = bodyparser.json();
mongoose.Promise = global.Promise;  

app.use(express.static('public'));
app.use(morgan('combined'));

////////////// EVENTOS ////////////
//despliega todos los eventos
app.get("/eventos", (req, res, next) => {
    EventList.getAllEvents()
        .then(events => {
            res.statusMessage = "todos los eventos mostrados";
			return res.status(200).json(events);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos, favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//agrega un evento nuevo
app.post("/eventos", jsonParser, (req, res, next) => {
	let title = req.body.Title;
	let description = req.body.Description;
	let imageUrl = req.body.Image_URL;
	let date = req.body.Date;

	if(!title || !description || !imageUrl || !date){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : "uno de los campos esta vacio",
			status : 406
		});
	}

	let id = uuidv4();
	let returnedEvent = {
		ID : id,
		Title : title,
		Description : description,
		Image_URL : imageUrl,
		Date : date
	};

    PostList.post(returnedEvent)
            .then(event => 
				res.statusMessage = "evento añadido con exito",
            	res.status(201).json(returnedEvent))
            .catch(err => { throw Error(err); })
});

//borra un evento
app.delete("/eventos/:id", (req, res, next) => {
	let id = req.params.ID;    
    EventList.deleteEvent(id)
        .then(deleted => {
            if(deleted) {
                return res.status(200).json({
                    message: "Evento borrado con exito",
                    status: 200
                });
            }
            res.statusMessage = "El evento no existe";
            return res.status(404).json({
                message: res.statusMessage,
                status: 404
            });
        })
        .catch(err => { throw Error(err) });
});

//edita un evento
app.put("/eventos/:id", jsonParser, (req, res, next) => {
	let bodyID = req.body.ID;
	let title = req.body.Title;
	let description = req.body.Description;
	let imageUrl = req.body.Image_URL;
	let date = req.body.Date;
	let paramsID = req.params.ID;

    if (!bodyId) {
        res.statusMessage = "no se paso el ID";
        return res.status(406).json({message: res.statusMessage, status: 406});
    }

    if (paramsId != bodyId) {
        res.statusMessage = "No son iguales los IDs del cuerpo y del parametro";
        return res.status(409).json({message: res.statusMessage, status: 409});
    }

    EventList.updateEvent(req.body)
        .then(newEvent => {
            if(!newEvent) {
                res.statusMessage = "No se encontro el evento que se queria editar";
                return res.status(404).json({
                    message: res.statusMessage,
                    status: 404
                });
            }
            return res.status(202).json({
                message: "Evento editado con exito",
                status: 202
            });
        })
        .catch(err => { throw Error(err) });
});

//////////// CONVOCATORIAS //////////////
//despliega todas las convocatorias
app.get("/convocatorias", (req, res, next) => {
    TournamentList.getAllTournaments()
        .then(tournaments => {
            res.statusMessage = "Todas las convocatorias han sido mostradas";
			return res.status(200).json(tournaments);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//despliega convocatorias por nombre
app.get("/convocatorias?nombre=value", (req, res, next) => {
	let name = req.body.name;
	if(!name){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : res.statusMessage,
			status : 406
		});
	}
	TournamentList.getTournamentsByName(name)
        .then(tournaments => {
            res.statusMessage = "Todas las convocatorias han sido mostradas";
			return res.status(200).json(tournaments);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//agrega una nueva convocatorias
app.post("/convocatorias", jsonParser, (req, res, next) => {
	let title = req.body.Title;
	let description = req.body.Description;
	let imageUrl = req.body.Image_URL;
	let date = req.body.Date;
	let link = req.body.Link;

	if(!title || !description || !imageUrl || !date | !link){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : "uno de los campos esta vacio",
			status : 406
		});
	}

	let id = uuidv4();
	let returnedTournament = {
		ID : id,
		Title : title,
		Description : description,
		Image_URL : imageUrl,
		Date : date,
		Link : link
	};

    PostList.post(returnedTournament)
            .then(event => 
				res.statusMessage = "convocatoria añadida con exito",
            	res.status(201).json(returnedTournament))
            .catch(err => { throw Error(err); })
});

//borra una convocatoria
app.delete("/convocatorias/:id", (req, res, next) => {
	let id = req.params.ID;    
    TournamentList.deleteTournament(id)
        .then(deleted => {
            if(deleted) {
                return res.status(200).json({
                    message: "Convocatoria borrada con exito",
                    status: 200
                });
            }
            res.statusMessage = "La convocatoria no existe";
            return res.status(404).json({
                message: res.statusMessage,
                status: 404
            });
        })
        .catch(err => { throw Error(err) });
});

//////////////// EVALUACIONES ////////
//despliega evaluaciones filtradas por grupo
app.get("/evaluaciones?grupo=value", (req, res, next) => {
	let group = req.body.group;
	if(!group){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : res.statusMessage,
			status : 406
		});
	}
    EvaluationList.getEvaluationsByGroup(group)
        .then(evaluations => {
            res.statusMessage = "Todas las evaluaciones filtradas han sido mostradas";
			return res.status(200).json(evaluations);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//agrega una nueva evaluacion
app.post("/evaluaciones", jsonParser, (req, res, next) => {
	let name = req.body.name;
	let grade = req.body.grade;
	let group = req.body.group;

	if(!name || !grade || !group){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : "uno de los campos esta vacio",
			status : 406
		});
	}

	let id = uuidv4();
	let returnedEvaluation = {
		ID : id,
		Name : name,
		Grade : grade,
		Group : group
	};

    EvaluationList.createEvaluation(returnedEvaluation)
            .then(event => 
				res.statusMessage = "evaluacion añadida con exito",
            	res.status(201).json(returnedEvaluation))
            .catch(err => { throw Error(err); })
});

//borra una evalucion
app.delete("/evaluaciones/:id", (req, res, next) => {
	let id = req.params.ID;    
    EvaluationList.deleteEvaluation(id)
        .then(deleted => {
            if(deleted) {
                return res.status(200).json({
                    message: "Evaluacion borrada con exito",
                    status: 200
                });
            }
            res.statusMessage = "La evaluacion no existe";
            return res.status(404).json({
                message: res.statusMessage,
                status: 404
            });
        })
        .catch(err => { throw Error(err) });
});

///////////// MATERIAL /////////////
//despliega todos los materiales
app.get("/materiales", (req, res, next) => {
    MaterialList.getAllMaterials()
        .then(materials => {
            res.statusMessage = "Todos los materiales han sido mostrados";
			return res.status(200).json(materials);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//despliega evaluaciones filtradas por materia
app.get("/materiales?materia=value", (req, res, next) => {
	let subject = req.body.subject;
	if(!subject){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : res.statusMessage,
			status : 406
		});
	}
    MaterialList.getMaterialsBySubject(subject)
        .then(materials => {
            res.statusMessage = "Todos los materiales han sido mostrados";
			return res.status(200).json(materials);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//agrega un nuevo material
app.post("/materiales", jsonParser, (req, res, next) => {
	let title = req.body.Title;
	let description = req.body.Description;
	let subject = req.body.Subject;
	let link = req.body.Link;
    let userID = req.body.UserID;

	if(!title || !description || !imageUrl || !date){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : "uno de los campos esta vacio",
			status : 406
		});
	}

	let id = uuidv4();
	let returnedMaterial = {
		ID : id,
		Title : title,
		Description : description,
		Subject : subject,
		Link : link,
        UserID : userID
	};

    PostList.post(returnedMaterial)
            .then(event => 
				res.statusMessage = "evento añadido con exito",
            	res.status(201).json(returnedMaterial))
            .catch(err => { throw Error(err); })
});

//borra un material
app.delete("/materiales/:id", (req, res, next) => {
	let id = req.params.ID;    
    MaterialList.deleteMaterial(id)
        .then(deleted => {
            if(deleted) {
                return res.status(200).json({
                    message: "Material borrado con exito",
                    status: 200
                });
            }
            res.statusMessage = "El Material no existe";
            return res.status(404).json({
                message: res.statusMessage,
                status: 404
            });
        })
        .catch(err => { throw Error(err) });
});

/////////// CONTACTO ////////////
//despliega el contacto
app.get("/contacto", (req, res, next) => {
	ContactList.getContact()
        .then(contact => {
            res.statusMessage = "El contacto ha sido mostrados";
			return res.status(200).json(contact);
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//edita la info de contact
app.put("/contacto", jsonParser, (req, res, next) => {
	let title = req.body.Title;
	let phone = req.body.Phone;
	let email = req.body.Email;
	if(!title || !phone || !email){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : "uno de los campos esta vacio",
			status : 406
		});
	}

	ContactList.updateContact(req.body)
        .then(newContact => {
            if(!newContact) {
				let newContact = {
					Title : title,
					Phone : phone,
					Email : email
				};
                ContactList.createContact(newContact)
            	.then(event => 
					res.statusMessage = "evaluacion añadida con exito",
            		res.status(201).json(returnedEvaluation))
            	.catch(err => { throw Error(err); })
            }
            return res.status(202).json({
                message: "Contacto editado con exito",
                status: 202
            });
        })
        .catch(err => { throw Error(err) });
});

///////////// USUARIOS //////////////////
//obten un usario con el mail y valida la contrasena
app.get("/usuario?mail=value", (req, res, next) => {
	let mail = req.body.mail;
	let password = req.params.password;
	if(!mail || !password){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : res.statusMessage,
			status : 406
		});
	}
	UserList.getUserWithEmail(mail)
        .then(userFound => {
        	if(userFound){
        		if(userFound.password == password){
		            res.statusMessage = "mail y contrasena correctos";
					return res.status(200).json(userFound);
				}
				else{
					res.statusMessage = "El correo y la contraseña no coinciden";
	            	return res.status(403).json({
		                message: res.statusMessage,
		                status: 403
	            	});
				}
			}
			else{
				res.statusMessage = "El correo no fue encontrado en la base de datos";
	            return res.status(404).json({
	                message: res.statusMessage,
	                status: 404
	            });
			}
        })
        .catch(() => {
            res.statusMessage = "Algo salio mal con la base de datos, favor de intentar mas tarde";
            return res.status(500).json({
                message: res.statusMessage,
                status: 500
            });
        });
});

//agrega un usuario nuevo
app.post("/usuario", jsonParser, (req, res, next) => {
	let name = req.body.Name;
	let email = req.body.Email;
	let password = req.body.Password;
	let principal = req.body.Principal;

	if(!name || !email || !password || !principal){
		res.statusMessage = "uno de los campos esta vacio";
		return res.status(406).json({
			message : "uno de los campos esta vacio",
			status : 406
		});
	}

	let id = uuidv4();
	let returnedUser = {
		ID : id,
		Name : name,
		Email : email,
		Password : password,
		Principal : principal
	};

    PostList.post(returnedUser)
            .then(event => 
				res.statusMessage = "evento añadido con exito",
            	res.status(201).json(returnedUser))
            .catch(err => { throw Error(err); })
});


////////////CORRER SERVIDOR////////////
let server;
function runServer(port, databaseURL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseURL, err => {
            if(err) {
                return reject(err);
            }
            else {
                server = app.listen(port, () => {
                    console.log(`App esta corriendo en puerto:  ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    return reject(err);
                });
            }
        });
    });
}
function closeServer(){
    return mongoose.disconnect()
                   .then(() => {
                       return new Promise((resolve, reject) => {
                           console.log('Cerrando servidor');
                           server.close( err => {
                               if (err){
                                   return reject(err);
                               }
                               else{
                                   resolve();
                               }
                           });
                       });
                   });
}
runServer(PORT, DATABASE_URL)
    .catch(err => {
        console.log(err);
    });
module.exports = { app, runServer, closeServer };