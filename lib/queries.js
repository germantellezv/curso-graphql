'use strict'

const connectDB = require('./db.js')
const { ObjectID } = require('mongodb')

module.exports = {
  getCourses: async () => {
    let db, courses
    try {
      db = await connectDB()
      courses = await db.collection('cursos').find().toArray()
      return courses
    } catch (error) {
      console.error(error)
    }
  },
  getCourse: async (root, { id }) => {
    // console.log("id -->",id);
    let db, course
    try {
      db = await connectDB()
      course = await db.collection('cursos').findOne({ _id: ObjectID(id) })
      return course
    } catch (error) {
      console.error(error)
    }
  },
  getStudents: async () => {
    try {
      let db, students
      db = await connectDB()
      students = await db.collection('students').find().toArray()
      return students
    } catch (error) {
      console.error(error)
    }
  }
}
