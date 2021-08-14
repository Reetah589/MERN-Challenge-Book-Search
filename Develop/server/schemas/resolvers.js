const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },


    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user};
    },


    saveBook: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { saveBook: } },
          { new: true }
        );  
    
        return userData;
      }
    
      throw new AuthenticationError('You need to be logged in');
    },


    removeBook: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findByIdAndRemove(
          {_id: context.user._id },
          { $push: {removeBook: } },
          { new: true }
        );

        return userData;
      }
    },
  },
}  
  module.exports = resolvers;