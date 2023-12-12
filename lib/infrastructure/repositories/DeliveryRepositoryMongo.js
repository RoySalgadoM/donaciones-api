'use strict';

const Delivery = require('../../domain/delivery/Delivery');
const MongooseDelivery = require('../orm/mongoose/schemas/Delivery')
const DeliveryRepository = require('../../domain/delivery/DeliveryRepository');
const objectId = require('mongoose').Types.ObjectId;
const MongooseUser = require('../orm/mongoose/schemas/User');
const MongooseChain = require('../orm/mongoose/schemas/Chain');

module.exports = class extends DeliveryRepository {

    constructor() {
        super();
    }

    async create(name, chain, products, user, date, role, userId) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Empleado') {
            response.message = 'El usuario no tiene permisos para crear una recolección';
            response.error = true;
            return response;
        }

        const userData = await MongooseUser.findOne({ _id: objectId(user) });

        if (user.length == 0) {
            response.message = 'El usuario no existe';
            response.error = true;
            return response;
        }

        userData.password = undefined;

        const chainData = await MongooseChain.findOne({ _id: objectId(chain) });

        if (chain.length === 0) {
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        const mongo = new MongoosePickup({ name, chain: chainData, products, user: userData, status: "Pendiente", date: date, generalAnnexes: {} });
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['pickup'] = new Pickup(result.id, result.name, result.date, result.status, result.chain, result.products, result.generalAnnexes, result.user);
        response.message = 'Recolección creada correctamente';
        return response;
    }

    async update(id, name, chain, products, user, date, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Empleado') {
            response.message = 'El usuario no tiene permisos para editar una recolección';
            response.error = true;
            return response;
        }

        const userData = await MongooseUser.findOne({ _id: objectId(user) });

        if (user.length == 0) {
            response.message = 'El usuario no existe';
            response.error = true;
            return response;
        }

        userData.password = undefined;

        const chainData = await MongooseChain.findOne({ _id: objectId(chain) });

        if (chain.length === 0) {
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        const mongoResult = await MongoosePickup.findOne({ _id: objectId(id) });

        if (!mongoResult) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        let result = await MongoosePickup.updateOne({ _id: objectId(id) }, { name: name, chain: chainData, products: products, user: userData, date: date });

        if (result.nModified === 0) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        response.data['pickup'] = new Pickup(mongoResult.id, name, date, mongoResult.status, chainData, products, mongoResult.generalAnnexes, userData);
        response.message = 'Recolección actualizada correctamente';
        return response;
    }

    async changeStatus(id, status, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        if (role === 'Administrador') {
            response.message = 'No tiene permisos para iniciar una recolección';
            response.error = true;
            return response;
        }

        const mongoResult = await MongoosePickup.findOne({ _id: objectId(id), 'user._id': objectId(userId) });

        if (!mongoResult) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status !== "Pendiente") {
            response.message = 'Solo pueden ser iniciadas las recolecciones en estado pendiente';
            response.error = true;
            return response;
        }

        if (mongoResult.status === status) {
            response.message = 'La recolección ya se encuentra iniciada';
            response.error = true;
            return response;
        }

        let result = await MongoosePickup.updateOne({ _id: objectId(id) }, { status: status });

        if (result.nModified === 0) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        response.data['pickup'] = new Pickup(mongoResult.id, mongoResult.name, mongoResult.date, status, mongoResult.chain, mongoResult.products, mongoResult.generalAnnexes, mongoResult.user);
        response.message = 'Recolección iniciada correctamente';
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
            filter.$and.push({ 'user.id': objectId(userId) });
        }

        const mongoResult = await MongoosePickup.findOne(filter);

        if (!mongoResult) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        response.data['pickup'] = new Pickup(mongoResult.id, mongoResult.name, mongoResult.date, mongoResult.status, mongoResult.chain, mongoResult.products, mongoResult.generalAnnexes, mongoResult.user);
        response.message = 'Recolección recuperada correctamente';
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
            return new Delivery(delivery.id, delivery.name, delivery.routes, delivery.user, delivery.date, delivery.generalAnnexes, delivery.status)
        });

        response.data['total'] = count;
        return response;
    }
    async end(id, products, role, userId, status) {
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

        const mongoResult = await MongoosePickup.findOne({ _id: objectId(id), 'user._id': objectId(userId) });

        if (!mongoResult) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status !== "En proceso") {
            response.message = 'Solo pueden ser finalizadas las recolecciones en estado En proceso';
            response.error = true;
            return response;
        }

        if (mongoResult.status === status) {
            response.message = 'La recolección ya se encuentra finalizada';
            response.error = true;
            return response;
        }

        let result = await MongoosePickup.updateOne({ _id: objectId(id) }, { status: status, products: products });

        if (result.nModified === 0) {
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        response.data['pickup'] = new Pickup(mongoResult.id, mongoResult.name, mongoResult.date, status, mongoResult.chain, products, mongoResult.generalAnnexes, mongoResult.user);
        response.message = 'Recolección finalizada correctamente';
        return response;
    }
    async cancel(id, generalAnnexes, status, role, userId) {
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
        const mongoResult = await MongoosePickup.findOne(filter);

        if (!mongoResult) {
            response.message = 'La recolección no existe';
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

        let result = await MongoosePickup.updateOne({ _id: objectId(id) }, { status: status, generalAnnexes: generalAnnexes });

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
