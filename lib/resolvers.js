'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const mutations = require('./mutations')
const queries = require('./queries')

module.exports = {
  Query: queries,
  Mutation: mutations

}
