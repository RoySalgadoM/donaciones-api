'use strict';

const Neighborhood = require('../../domain/neigborhood/Neighborhood');
const MongooseNeighborhood = require('../orm/mongoose/schemas/Neighborhood');
const NeigborhoodRepository = require('../../domain/neigborhood/NeigborhoodRepository');
const objectId = require('mongoose').Types.ObjectId;

module.exports = class extends NeigborhoodRepository {

    constructor() {
        super();
    }

    async create(name, reference, nameLinkPerson, phones) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongo = new MongooseNeighborhood({ name, reference, nameLinkPerson, phones, status: true });
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['neighborhood'] = new Neighborhood(result.id, result.name, result.reference, result.nameLinkPerson, result.phones, result.status);
        response.message = 'Colonia creada correctamente';
        return response;
    }


    async update(id, name, reference, nameLinkPerson, phones) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const resultMongo = await MongooseNeighborhood.findById(id);
        if (!resultMongo) {
            response.message = 'La colonia no existe';
            response.error = true;
            return response;
        }

        resultMongo.name = name;
        resultMongo.reference = reference;
        resultMongo.nameLinkPerson = nameLinkPerson;
        resultMongo.phones = phones;
        
        let result = await resultMongo.save();

        if (result.nModified === 0) {
            return null;
        }

        response.data['neighborhood'] = new Neighborhood(result.id, result.name, result.reference, result.nameLinkPerson, result.phones, result.status);
        response.message = 'Colonia actualizada correctamente';
        return response;
    }

    async changeStatus(id, status) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongooseNeighborhood.findById(id);

        if (!mongoResult) {
            response.message = 'La colonia no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status === status) {
            response.message = `La colonia ya se encuentra en el estado  ${status ? 'Activo' : 'Inactivo'}, actualiza la página para ver los cambios.`;
            response.error = true;
            return response;
        }

        let result = await MongooseNeighborhood.updateOne({ _id: objectId(id) }, { status: status });

        if (result.nModified === 0) {
            response.message = 'La colonia no existe';
            response.error = true;
            return response;
        }

        response.data['neighborhood'] = new Neighborhood(mongoResult.id, mongoResult.name, mongoResult.reference, mongoResult.nameLinkPerson, mongoResult.phones, status);
        response.message = 'Estado actualizado correctamente';
        return response;
    }

    async getById(id) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongooseNeighborhood.findById(id);

        if (!mongoResult) {
            response.message = 'La colonia no existe';
            response.error = true;
            return response;
        }

        response.data['neighborhood'] = new Neighborhood(mongoResult.id, mongoResult.name, mongoResult.reference, mongoResult.nameLinkPerson, mongoResult.phones, mongoResult.status);
        response.message = 'Colonia recuperada correctamente';
        return response;
    }

    async get(page, rowsPerPage, order, orderBy, filter, filterBy) {
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

        let skip = (page - 1) * rowsPerPage;
        let limit = rowsPerPage;

        const neighborhoods = await MongooseNeighborhood.find(filterQuery).sort(sortQuery).skip(skip).limit(limit);

        const count = await MongooseNeighborhood.countDocuments(filterQuery);

        response.message = 'Colonias recuperadas correctamente';
        response.data['neighborhoods'] = neighborhoods.map((neighborhood) => {
            return new Neighborhood(neighborhood.id, neighborhood.name, neighborhood.reference, neighborhood.nameLinkPerson, neighborhood.phones, neighborhood.status);
        });

        response.data['total'] = count;
        return response;
    }
};
