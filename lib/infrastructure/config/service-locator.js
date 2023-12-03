'use strict';


const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');

const UserSerializer = require('../../interfaces/serializers/UserSerializer');
const NeighborhoodSerializer = require('../../interfaces/serializers/NeighborhoodSerializer');

const UserRepositoryMongo = require('../repositories/UserRepositoryMongo');
const NeighborhoodRepositoryMongo = require('../repositories/NeighborhoodRepositoryMongo');
const ChainRepositoryMongo = require('../repositories/ChainRepositoryMongo');
const ProductRepositoryMongo = require('../repositories/ProductRepositoryMongo');
function buildBeans() {

  const beans = {
    accessTokenManager: new JwtAccessTokenManager(),
    userSerializer: new UserSerializer(),
    neighborhoodSerializer: new NeighborhoodSerializer(),
  };

 
  beans.userRepository = new UserRepositoryMongo();
  beans.neighborhoodRepository = new NeighborhoodRepositoryMongo();
  beans.chainRepository = new ChainRepositoryMongo();
  beans.productRepository = new ProductRepositoryMongo();
  return beans;
}

module.exports = buildBeans();
