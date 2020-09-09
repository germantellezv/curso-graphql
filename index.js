'use strict'
// Express req
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// GraphQl req
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')

// Utils
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

// Definiendo el schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
)

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}/api`)
})

// Ejecutar el query de graphql
// graphql(schema, '{hello}', resolvers).then((data) => {
//   console.log(data)
// })
