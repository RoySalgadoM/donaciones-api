'use strict';

const Product = require('../../domain/product/Product');
const MongooseProduct = require('../orm/mongoose/schemas/Product');
const ProductRepository = require('../../domain/product/ProductRepository');
const objectId = require('mongoose').Types.ObjectId;

module.exports = class extends ProductRepository {

    constructor() {
        super();
    }

    async create(name) {

        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongo = new MongooseProduct({ name, status: true });
        let result = await mongo.save();

        if (result === null) {
            return null;
        }

        response.data['product'] = new Product(result.id, result.name, result.status);
        response.message = 'Producto creado correctamente';
        return response;
    }


    async update(id, name) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const resultMongo = await MongooseProduct.findById(id);
        if (!resultMongo) {
            response.message = 'El producto no existe';
            response.error = true;
            return response;
        }

        resultMongo.name = name;

        let result = await resultMongo.save();

        if (result.nModified === 0) {
            return null;
        }

        response.data['product'] = new Product(result.id, result.name, result.status);
        response.message = 'Producto actualizado correctamente';
        return response;
    }

    async changeStatus(id, status) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongooseProduct.findById(id);

        if (!mongoResult) {
            response.message = 'El producto no existe';
            response.error = true;
            return response;
        }

        if (mongoResult.status === status) {
            response.message = 'El producto ya se encuentra en ese estado';
            response.error = true;
            return response;
        }

        let result = await MongooseProduct.updateOne({ _id: objectId(id) }, { status: status });

        if (result.nModified === 0) {
            response.message = 'El producto no existe';
            response.error = true;
            return response;
        }

        response.data['product'] = new Product(mongoResult.id, mongoResult.name, status);
        response.message = 'Estado actualizado correctamente';
        return response;
    }

    async getById(id) {
        let response = {
            data: {},
            message: null,
            error: false
        }

        const mongoResult = await MongooseProduct.findById(id);

        if (!mongoResult) {
            response.message = 'El producto no existe';
            response.error = true;
            return response;
        }

        response.data['product'] = new Product(mongoResult.id, mongoResult.name, mongoResult.status);
        response.message = 'Producto recuperado correctamente';
        return response;
    }

    async get(page, rowsPerPage, order, orderBy, filter, filterBy, status) {
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

        if (status === 'true') {
            filterQuery['status'] = true;
        }

        if (status === 'false') {
            filterQuery['status'] = false;
        }

        if (status === 'all') {
            filterQuery['status'] = { $in: [true, false] };
        }

        let skip = (page - 1) * rowsPerPage;
        let limit = rowsPerPage;

        const queryResult = await MongooseProduct.find(filterQuery).sort(sortQuery).skip(skip).limit(limit);

        const count = await MongooseProduct.countDocuments(filterQuery);

        response.message = 'Productos recuperados correctamente';
        response.data['products'] = queryResult.map((row) => {
            return new Product(row.id, row.name, row.status);
        });

        response.data['total'] = count;
        return response;
    }
};
