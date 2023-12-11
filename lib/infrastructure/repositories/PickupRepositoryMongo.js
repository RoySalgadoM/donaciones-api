'use strict';

const Pickup = require('../../domain/pickup/Pickup');
const MongoosePickup = require('../orm/mongoose/schemas/Pickup')
const PickupRepository = require('../../domain/pickup/PickupRepository');
const objectId = require('mongoose').Types.ObjectId;
const MongooseUser = require('../orm/mongoose/schemas/User');
const MongooseChain = require('../orm/mongoose/schemas/Chain');
const Boom = require('@hapi/boom');
module.exports = class extends PickupRepository {

    constructor() {
        super();
    }

    async create(name, chain, products, user, date, role, userId) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        if(role === 'Empleado'){
            response.message = 'El usuario no tiene permisos para crear una recolección';
            response.error = true;
            return response;
        }

        const userData = await MongooseUser.findOne({ _id: objectId(user) });

        if(user.length == 0){
            response.message = 'El usuario no existe';
            response.error = true;
            return response;
        }

        userData.password = undefined;

        const chainData = await MongooseChain.findOne({ _id: objectId(chain) });

        if(chain.length === 0){
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        const mongo = new MongoosePickup({ name, chain: chainData, products, user: userData, status: "Pendiente", date: date, generalAnnexes: {}});
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['pickup'] = new Pickup(result.id, result.name, result.date, result.status, result.chain, result.products, result.generalAnnexes, result.user);
        response.message = 'Recolección creada correctamente';
        return response;
    }

    async changeStatus(id, status, role, userId) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        if(role === 'Admin'){
            response.message = 'La recolección no existe';
            response.error = true;
            return response;
        }

        const mongoResult = await MongoosePickup.findOne({ _id: objectId(id), 'user.id': objectId(userId) });

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
            $and:[
                {_id: objectId(id)}
            ]
        }

        if(role === 'Empleado'){
            filter.$and.push({'user.id': objectId(userId)});
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
            filterQuery['user.id'] = objectId(userId);
        }

        let skip = (page - 1) * rowsPerPage;
        let limit = rowsPerPage;

        const pickups = await MongoosePickup.find(filterQuery).sort(sortQuery).skip(skip).limit(limit);

        const count = await MongoosePickup.countDocuments(filterQuery);

        response.message = 'Recoleeciones recuperadas correctamente';
        response.data['pickups'] = pickups.map((pickup) => {
            return new Pickup(pickup.id, pickup.name, pickup.date, pickup.status, pickup.chain, pickup.products, pickup.generalAnnexes, pickup.user)
        });

        response.data['total'] = count;
        return response;
    }
};
