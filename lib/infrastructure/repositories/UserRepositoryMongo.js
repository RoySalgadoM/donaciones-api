'use strict';

const User = require('../../domain/User');
const MongooseUser = require('../orm/mongoose/schemas/User');
const UserRepository = require('../../domain/UserRepository');
const objectId = require('mongoose').Types.ObjectId;

module.exports = class extends UserRepository {

  constructor() {
    super();
  }

  async create(name, lastname, secondSurname, email, password, role, phone) {

    let response = {
      data: {},
      message: null,
      error: false
    }

    const exists = await MongooseUser.find({ email: email });

    if (exists.length > 0) {
      response.message = 'El correo ya ha sido registrado anteriormente';
      response.error = true;
      return response;
    }

    const user = new MongooseUser({ name, lastname, secondSurname, email, password, role, phone, status: true });
    let result = await user.save();

    if (result === null) {
      return null;
    }

    response.data['user'] = new User(user.id, user.name, user.lastname, user.secondSurname, user.email, null, user.role, null, user.phone, user.status);
    response.message = 'Usuario creado correctamente';
    return response;
  }


  async update(id, name, lastname, secondSurname, role, phone) {
    let response = {
      data: {},
      message: null,
      error: false
    }

    const user = await MongooseUser.findById(id);
    console.log(user);
    if (!user) {
      response.message = 'El usuario no existe';
      response.error = true;
      return response;
    }

    user.name = name;
    user.lastname = lastname;
    user.secondSurname = secondSurname;
    user.role = role;
    user.phone = phone;

    let result = await user.save();

    if (result.nModified === 0) {
      return null;
    }

    response.data['user'] = new User(user.id, user.name, user.lastname, user.secondSurname, user.email, null, user.role, null, user.phone, user.status);
    response.message = 'Usuario actualizado correctamente';
    return response;
  }

  async changeStatus(id, status) {
    let response = {
      data: {},
      message: null,
      error: false
    }

    const user = await MongooseUser.findById(id);

    if (!user) {
      response.message = 'El usuario no existe';
      response.error = true;
      return response;
    }

    if(user.status === status) {
      response.message = 'El usuario ya se encuentra en ese estado';
      response.error = true;
      return response;
    }

    let result = await MongooseUser.updateOne({ _id: objectId(id) }, { status: status });

    if (result.nModified === 0) {
      response.message = 'El usuario no existe';
      response.error = true;
      return response;
    }

    response.data['user'] = new User(user.id, user.name, user.lastname, user.secondSurname, user.email, null, user.role, null, user.phone, user.status);
    response.message = 'Estado actualizado correctamente';
    return response;
  }

  async getById(id) {
    let response = {
      data: {},
      message: null,
      error: false
    }

    const user = await MongooseUser.findById(id);

    if (!user) {
      response.message = 'El usuario no existe';
      response.error = true;
      return response;
    }

    response.data['user'] = new User(user.id, user.name, user.lastname, user.secondSurname, user.email, null, user.role, null, user.phone, user.status);
    response.message = 'Usuario recuperado correctamente';
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
      filterQuery = { filterBy: { $regex: filter, $options: 'i' } };
    }

    if (order) {
      if (!orderBy) {
        response.message = 'Debe seleccionar un campo para ordenar';
        response.error = true;
        return response;
      }
      sortQuery = { orderBy: order };
    }

    let skip = (page - 1) * rowsPerPage;
    let limit = rowsPerPage;

    const users = await MongooseUser.find(filterQuery).sort(sortQuery).skip(skip).limit(limit).projection({ password: 0, recoverCode: 0 });

    if (users.length === 0) {
      response.message = 'No se encontraron usuarios';
      response.error = true;
      return response;
    }

    const count = await MongooseUser.countDocuments(filterQuery);

    response.message = 'Usuarios recuperados correctamente';
    response.data['users'] = users.map(user => new User(user.id, user.name, user.lastname, user.secondSurname, user.email, null, user.role, null, user.phone, user.status));
    response.data['count'] = count;
    return response;
  }

  async getByEmail(userEmail) {
    const user = await MongooseUser.find({ email: userEmail });
    if (user.length === 0) {
      return null;
    }
    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode, user[0].phone, user[0].status);
  }

  async getByEmailAndPassword(email, password) {
    const user = await MongooseUser.find({
      $and: [
        { email: email },
        { password: password },
        { status: true}
      ]
    });

    if (user.length === 0) {
      return null;
    }
    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode, user[0].phone, user[0].status);
  }

  async updateRecoverCode(email, recoverCode) {
    return await MongooseUser.updateOne({ email: email }, { recoverCode: recoverCode });
  }

  async getByCodeAndUpdate(recoverCode, password) {
    const user = await MongooseUser.find({
      $and: [
        { recoverCode: recoverCode }
      ]
    });

    if (user.length === 0) {
      return null;
    }

    let result = await MongooseUser.updateOne({ email: user[0].email }, { password: password, recoverCode: null });

    if (result.nModified === 0) {
      return null;
    }

    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode, user[0].phone, user[0].status);
  }

  async getByEmailAndPasswordAndUpdate(email, password, newPassword) {
    const user = await MongooseUser.find({
      $and: [
        { email: email },
        { password: password }
      ]
    });

    if (user.length === 0) {
      return null;
    }

    let result = await MongooseUser.updateOne({ email: user[0].email }, { password: newPassword });

    if (result.nModified === 0) {
      return null;
    }

    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode, user[0].phone, user[0].status);
  }
};
