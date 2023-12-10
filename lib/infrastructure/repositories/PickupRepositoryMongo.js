'use strict';

const Pickup = require('../../domain/pickup/Pickup');
const MongoosePickup = require('../orm/mongoose/schemas/Pickup')
const PickupRepository = require('../../domain/pickup/PickupRepository');
const objectId = require('mongoose').Types.ObjectId;

module.exports = class extends PickupRepository {

    constructor() {
        super();
    }

    async create(name, reference, nameLinkPerson, phones) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongo = new MongoosePickup({ name, reference, nameLinkPerson, phones, status: true });
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['neighborhood'] = new Pickup(result.id, result.name, result.reference, result.nameLinkPerson, result.phones, result.status);
        response.message = 'Colonia creada correctamente';
        return response;
    }

    async changeStatus(id, status) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongoosePickup.findById(id);

        if (!mongoResult) {
            response.message = 'La colonia no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status === status) {
            response.message = 'La colonia ya se encuentra en ese estado';
            response.error = true;
            return response;
        }

        let result = await MongoosePickup.updateOne({ _id: objectId(id) }, { status: status });

        if (result.nModified === 0) {
            response.message = 'La colonia no existe';
            response.error = true;
            return response;
        }

        response.data['neighborhood'] = new Pickup(mongoResult.id, mongoResult.name, mongoResult.reference, mongoResult.nameLinkPerson, mongoResult.phones, status);
        response.message = 'Estado actualizado correctamente';
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
