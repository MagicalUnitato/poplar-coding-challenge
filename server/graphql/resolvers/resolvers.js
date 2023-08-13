const Sequelize = require('sequelize');
const Op = Sequelize.Op;
export default {
    User: {
        property: (parent, args, context, info) => parent.getProperties(),
    },
    Property: {
        user: (parent, args, context, info) => parent.getUser(),
    },
    Query: {
      search: (parent, args, { db }, info) => {

        const shouldApplyFilter = args.input && args.input.firstName;
        if (shouldApplyFilter) {
          const nameFilter = args.input.firstName;
          return db.user.findAll({ 
            where: {
              firstName : {
                [Op.like] : `%${nameFilter}%`
              }
            }
            })
        }
        return db.user.findAll()
      },
    },
  };