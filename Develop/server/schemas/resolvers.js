const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args) => {
      const userData = await User.findOne({})
        .select('-__v -password')
        .populate('books')
  
      return userData;
    }
  },

  Mutation: {
    login:
    addUser:
    saveBook:
    removeBook:
  },
}  
  module.exports = resolvers;