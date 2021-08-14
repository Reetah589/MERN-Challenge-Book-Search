const resolvers = {
    Query: {
      me: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Thought.find(params).sort({ createdAt: -1 });
      },
    }
  };
  
  module.exports = resolvers;