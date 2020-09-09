'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {

  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)
    let db, course
    try {
      db = await connectDB()
      course = await db.collection('cursos').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error)
    }
    return newCourse
  },
  updateCourse: async (root, { id, input }) => {
    let db, course
    try {
      db = await connectDB()
      await db.collection('cursos').updateOne({ _id: ObjectID(id) }, { $set: input })
      course = await db.collection('cursos').findOne(
        { _id: ObjectID(id) }
      )
    } catch (error) {
      console.error(error)
    }
    return course
  },
  createStudent: async (root, { input }) => {
    let db, student
    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      const result = input
      result._id = student.insertedId
      return result
    } catch (error) {
      console.error(error)
    }
  },

  updateStudent: async (root, { id, input }) => {
    let db, course
    try {
      db = await connectDB()
      await db.collection('students').updateOne({ _id: ObjectID(id) }, { $set: input })
      course = await db.collection('students').findOne(
        { _id: ObjectID(id) }
      )
    } catch (error) {
      console.error(error)
    }
    return course
  }

}
