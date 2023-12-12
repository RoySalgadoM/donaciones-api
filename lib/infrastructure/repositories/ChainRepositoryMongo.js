'use strict';

const Chain = require('../../domain/chain/Chain');
const MongooseChain = require('../orm/mongoose/schemas/Chain');
const ChainRepository = require('../../domain/chain/ChainRepository');
const objectId = require('mongoose').Types.ObjectId;

module.exports = class extends ChainRepository {

    constructor() {
        super();
    }

    async create(name, address, nameLinkPerson, phones) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongo = new MongooseChain({ name, address, nameLinkPerson, phones, status: true });
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['chain'] = new Chain(result.id, result.name, result.address, result.nameLinkPerson, result.phones, result.status);
        response.message = 'Cadena creada correctamente';
        return response;
    }


    async update(id, name, address, nameLinkPerson, phones) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const resultMongo = await MongooseChain.findById(id);
        if (!resultMongo) {
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        resultMongo.name = name;
        resultMongo.address = address;
        resultMongo.nameLinkPerson = nameLinkPerson;
        resultMongo.phones = phones;
        
        let result = await resultMongo.save();

        if (result.nModified === 0) {
            return null;
        }

        response.data['chain'] = new Chain(result.id, result.name, result.address, result.nameLinkPerson, result.phones, result.status);
        response.message = 'Cadena actualizada correctamente';
        return response;
    }

    async changeStatus(id, status) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongooseChain.findById(id);

        if (!mongoResult) {
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status === status) {
            response.message = `La cadena ya se encuentra en el estado  ${status ? 'Activo' : 'Inactivo'}, actualiza la página para ver los cambios.`;
            response.error = true;
            return response;
        }

        let result = await MongooseChain.updateOne({ _id: objectId(id) }, { status: status });

        if (result.nModified === 0) {
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        response.data['chain'] = new Chain(mongoResult.id, mongoResult.name, mongoResult.address, mongoResult.nameLinkPerson, mongoResult.phones, status);
        response.message = 'Estado actualizado correctamente';
        return response;
    }

    async getById(id) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongooseChain.findById(id);

        if (!mongoResult) {
            response.message = 'La cadena no existe';
            response.error = true;
            return response;
        }

        response.data['chain'] = new Chain(mongoResult.id, mongoResult.name, mongoResult.address, mongoResult.nameLinkPerson, mongoResult.phones, mongoResult.status);
        response.message = 'Cadena recuperada correctamente';
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

        const queryResult = await MongooseChain.find(filterQuery).sort(sortQuery).skip(skip).limit(limit);

        const count = await MongooseChain.countDocuments(filterQuery);

        response.message = 'Cadenas recuperadas correctamente';
        response.data['chains'] = queryResult.map((row) => {
            return new Chain(row.id, row.name, row.address, row.nameLinkPerson, row.phones, row.status);
        });

        response.data['total'] = count;
        return response;
    }
};
