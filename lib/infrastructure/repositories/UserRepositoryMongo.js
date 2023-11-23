'use strict';

const User = require('../../domain/User');
const MongooseUser = require('../orm/mongoose/schemas/User');
const UserRepository = require('../../domain/UserRepository');

module.exports = class extends UserRepository {

  constructor() {
    super();
  }

  async persist(userEntity) {
    const { firstName, lastName, email, password } = userEntity;
    const mongooseUser = new MongooseUser({ firstName, lastName, email, password });
    await mongooseUser.save();
    return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
  }

  async merge(userEntity) {
    const { id, firstName, lastName, email, password } = userEntity;
    const mongooseUser = MongooseUser.findByIdAndUpdate(id, { firstName, lastName, email, password });
    return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
  }

  async remove(userId) {
    return MongooseUser.findOneAndDelete(userId);
  }

  async get(userId) {
    const mongooseUser = await MongooseUser.findById(userId);
    return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
  }

  async getByEmail(userEmail) {
    const user = await MongooseUser.find({ email: userEmail });
    if (user.length === 0) {
      return null;
    }
    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode);

  }

  async find() {
    const mongooseUsers = await MongooseUser.find();
    return mongooseUsers.map((mongooseUser) => {
      console.log(mongooseUser);
      return new User(mongooseUser.id, mongooseUser.name, mongooseUser.lastname, mongooseUser.secondSurname, mongooseUser.email, mongooseUser.password, mongooseUser.role);
    });
  }

  async getByEmailAndPassword(email, password) {
    const user = await MongooseUser.find({
      $and: [
        { email: email },
        { password: password }
      ]
    });

    if (user.length === 0) {
      return null;
    }
    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode);
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

    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode);
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

    return new User(user[0].id, user[0].name, user[0].lastname, user[0].secondSurname, user[0].email, user[0].password, user[0].role, user[0].recoverCode);
  }
};
