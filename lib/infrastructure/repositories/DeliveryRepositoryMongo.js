'use strict';

const Delivery = require('../../domain/delivery/Delivery');
const MongooseDelivery = require('../orm/mongoose/schemas/Delivery')
const DeliveryRepository = require('../../domain/delivery/DeliveryRepository');
const objectId = require('mongoose').Types.ObjectId;
const MongooseUser = require('../orm/mongoose/schemas/User');
const MongooseNeighborhood = require('../orm/mongoose/schemas/Neighborhood');
const MongooseChain = require('../orm/mongoose/schemas/Chain');

module.exports = class extends DeliveryRepository {

    constructor() {
        super();
    }

    async create(name, routes, user, date, role, userId) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Empleado') {
            response.message = 'El usuario no tiene permisos para crear una entrega';
            response.error = true;
            return response;
        }

        const userData = await MongooseUser.findOne({ _id: objectId(user) });

        if (!userData) {
            response.message = 'El usuario no existe';
            response.error = true;
            return response;
        }

        userData.password = undefined;

        let routesData = [];

        for (let i = 0; i < routes.length; i++) {
            let neighborhoodData = await MongooseNeighborhood.findOne({ _id: objectId(routes[i]) });
            if (!neighborhoodData) {
                response.message = 'La colonia ' + routes[i] + ' no existe';
                response.error = true;
                return response;
            }
            if (neighborhoodData.status === false) {
                response.message = 'La colonia ' + routes[i] + ' se encuentra deshabilitada';
                response.error = true;
                return response;
            }

            let data = {
                _id: neighborhoodData._id,
                name: neighborhoodData.name,
                reference: neighborhoodData.reference,
                nameLinkPerson: neighborhoodData.nameLinkPerson,
                phones: neighborhoodData.phones,
                status: "Pendiente",
                dateEnd: null
            }
            routesData.push(data);

        }
        const mongo = new MongooseDelivery({ name, routes: routesData, user: userData, date, generalAnnexes: {}, status: 'Pendiente', dateEnd: null });
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['delivery'] = new Delivery(result.id, name, routesData, userData, date, {}, 'Pendiente', null);
        response.message = 'Entrega creada correctamente';
        return response;
    }

    async update(id, name, routes, user, date, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Empleado') {
            response.message = 'El usuario no tiene permisos para editar una entrega';
            response.error = true;
            return response;
        }

        const mongoResult = await MongooseDelivery.findOne({ _id: objectId(id) });

        if (!mongoResult) {
            response.message = 'La entrega no existe';
            response.error = true;
            return response;
        }

        if(mongoResult.status !== "Pendiente"){
            response.message = 'Solo pueden ser editadas las entregas en estado Pendiente';
            response.error = true;
            return response;
        }

        const userData = await MongooseUser.findOne({ _id: objectId(user) });

        if (!userData) {
            response.message = 'El usuario no existe';
            response.error = true;
            return response;
        }

        userData.password = undefined;

        let routesData = [];

        for (let i = 0; i < routes.length; i++) {
            let neighborhoodData = await MongooseNeighborhood.findOne({ _id: objectId(routes[i]) });
            if (!neighborhoodData) {
                response.message = 'La colonia ' + routes[i] + ' no existe';
                response.error = true;
                return response;
            }
            if (neighborhoodData.status === false) {
                response.message = 'La colonia ' + routes[i] + ' se encuentra deshabilitada';
                response.error = true;
                return response;
            }

            let data = {
                _id: neighborhoodData._id,
                name: neighborhoodData.name,
                reference: neighborhoodData.reference,
                nameLinkPerson: neighborhoodData.nameLinkPerson,
                phones: neighborhoodData.phones,
                status: "Pendiente",
                dateEnd: null
            }
            routesData.push(data);

        }

        let result = await MongooseDelivery.updateOne({ _id: objectId(id) }, { name: name, routes: routesData, user: userData, date: date, dateEnd: null });

        if (result.nModified === 0) {
            response.message = 'La entrega no existe';
            response.error = true;
            return response;
        }

        response.data['delivery'] = new Delivery(mongoResult.id, name, routesData, userData, date, mongoResult.generalAnnexes, mongoResult.status, null);
        response.message = 'Entrega actualizada correctamente';
        return response;
    }

    async start(id, status, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Administrador') {
            response.message = 'No tiene permisos para iniciar una entrega';
            response.error = true;
            return response;
        }

        let mongoResult = await MongooseDelivery.findOne({ _id: objectId(id), 'user._id': objectId(userId) });

        if (!mongoResult) {
            response.message = 'La entrega no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status === "Finalizada" || mongoResult.status === "Cancelada") {
            response.message = 'Esta entrega ya se encuentra ' + mongoResult.status;
            response.error = true;
            return response;
        }

        await MongooseDelivery.updateOne({ _id: objectId(id) }, { status: 'En proceso' });
        mongoResult = await MongooseDelivery.findOne({ _id: objectId(id) });
        response.data['delivery'] = new Delivery(mongoResult.id, mongoResult.name, mongoResult.routes, mongoResult.user, mongoResult.date, mongoResult.generalAnnexes, mongoResult.status, mongoResult.dateEnd);
        response.message = 'Ruta iniciada correctamente';
        return response;
    }

    async getById(id, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }
        let filter = {
            $and: [
                { _id: objectId(id) }
            ]
        }

        if (role === 'Empleado') {
            filter.$and.push({ 'user._id': objectId(userId) });
        }

        const mongoResult = await MongooseDelivery.findOne(filter);

        if (!mongoResult) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        response.data['delivery'] = new Delivery(mongoResult.id, mongoResult.name, mongoResult.routes, mongoResult.user, mongoResult.date, mongoResult.generalAnnexes, mongoResult.status, mongoResult.dateEnd);
        response.message = 'Entrega recuperada correctamente';
        return response;
    }

    async get(page, rowsPerPage, order, orderBy, filter, filterBy, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        let filterQuery = {};
        let sortQuery = {};

        if (filter) {
            if (!filterBy) {
                response.message = 'Debe seleccionar un campo para filtrar';
                response.error = true;
                return response;
            }
            filterQuery[filterBy] = { $regex: filter, $options: 'i' };
        }

        if (order) {
            if (!orderBy) {
                response.message = 'Debe seleccionar un campo para ordenar';
                response.error = true;
                return response;
            }
            sortQuery[orderBy] = order === 'desc' ? -1 : 1;

        }

        if (role === 'Empleado') {
            filterQuery['user._id'] = objectId(userId);
        }

        let skip = (page - 1) * rowsPerPage;
        let limit = rowsPerPage;

        const deliveries = await MongooseDelivery.find(filterQuery).sort(sortQuery).skip(skip).limit(limit);

        const count = await MongooseDelivery.countDocuments(filterQuery);

        response.message = 'Entregas recuperadas correctamente';
        response.data['deliveries'] = deliveries.map((delivery) => {
            return new Delivery(delivery.id, delivery.name, delivery.routes, delivery.user, delivery.date, delivery.generalAnnexes, delivery.status, delivery.dateEnd)
        });

        response.data['total'] = count;
        return response;
    }
    async end(id, routes, dateEnd, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Administrador') {
            response.message = 'El usuario no tiene permisos para finalizar una recolección';
            response.error = true;
            return response;
        }

        let mongoResult = await MongooseDelivery.findOne({ _id: objectId(id), 'user._id': objectId(userId) });

        if (!mongoResult) {
            response.message = 'La entrega no existe';
            response.error = true;
            return response;
        }

        if(mongoResult.status === "Pendiente"){
            response.message = 'La entrega no puede ser finalizada, ya que se encuentra en estado Pendiente';
            response.error = true;
            return response;
        }
            
        if (mongoResult.status === "Finalizada" || mongoResult.status === "Cancelada") {
            response.message = 'Esta entrega ya se encuentra ' + mongoResult.status;
            response.error = true;
            return response;
        }

        let rts = routes.map((route) => {
            route._id = objectId(route._id);
            return route;
        });

        await MongooseDelivery.updateOne({ _id: objectId(id) }, { $set: { routes: rts, status: 'Finalizada', dateEnd: dateEnd } });

        mongoResult = await MongooseDelivery.findOne({ _id: objectId(id) });

        response.message = 'Entrega finalizada correctamente';
        response.data['delivery'] = new Delivery(mongoResult.id, mongoResult.name, mongoResult.routes, mongoResult.user, mongoResult.date, mongoResult.generalAnnexes, mongoResult.status, mongoResult.dateEnd);
        return response;
    }
    async cancel(id, generalAnnexes, dateEnd, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        let filter = {
            $and: [
                { _id: objectId(id) }
            ]
        }

        
        if (role === 'Empleado') {
            filter.$and.push({ 'user._id': objectId(userId) });
        }
        let mongoResult = await MongooseDelivery.findOne(filter);

        if (!mongoResult) {
            response.message = 'La Entrega no existe';
            response.error = true;
            return response;
        }

        if(mongoResult.status !== "En proceso"){
            response.message = 'La entrega no puede ser cancelada debe de estar en estado En proceso';
            response.error = true;
            return response;
        }

        if(mongoResult.status === "Finalizada" || mongoResult.status === "Cancelada" ){
            response.message = 'La entrega ya se encuentra ' + mongoResult.status;
            response.error = true;
            return response;
        }

        let result = await MongooseDelivery.updateOne({ _id: objectId(id) }, { $set: { status: 'Cancelada', generalAnnexes: generalAnnexes, dateEnd: dateEnd } });

        mongoResult = await MongooseDelivery.findOne({ _id: objectId(id) });

        response.message = 'Entrega cancelada correctamente';
        response.data['delivery'] = new Delivery(mongoResult.id, mongoResult.name, mongoResult.routes, mongoResult.user, mongoResult.date, mongoResult.annexes, mongoResult.status, mongoResult.dateEnds);
        return response;
    }

    async cancelRoute(id, generalAnnexes, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        let filter = {
            $and: [
                { _id: objectId(id) }
            ]
        }

        if (role === 'Empleado') {
            filter.$and.push({ 'user._id': objectId(userId) });
        }
        const mongoResult = await MongooseDelivery.findOne(filter);

        if (!mongoResult) {
            response.message = 'La Entrega no existe';
            response.error = true;
            return response;
        }

        if (role === 'Administrador') {
            if (mongoResult.status !== "Pendiente") {
                response.message = 'Solo pueden ser canceladas las recolecciones en estado Pendiente';
                response.error = true;
                return response;
            }
        }

        if (role === 'Empleado') {
            if (mongoResult.status === "Finalizada") {
                response.message = 'Solo pueden ser canceladas las recolecciones en estado Pendiente o En proceso';
                response.error = true;
                return response;
            }
        }

        if (mongoResult.status === status) {
            response.message = 'La recolección ya se encuentra cancelada';
            response.error = true;
            return response;
        }

        let result = await MongooseDelivery.updateOne({ _id: objectId(id) }, { status: status, generalAnnexes: generalAnnexes });

        if (result.nModified === 0) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        response.data['pickup'] = new Pickup(mongoResult.id, mongoResult.name, mongoResult.date, status, mongoResult.chain, mongoResult.products, generalAnnexes, mongoResult.user);
        response.message = 'Recolección cancelada correctamente';
        return response;
    }
};
