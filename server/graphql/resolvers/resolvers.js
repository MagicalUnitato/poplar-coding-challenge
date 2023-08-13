export default {
    User: {
        property: (parent, args, context, info) => parent.getProperties(),
    },
    Property: {
        user: (parent, args, context, info) => parent.getUser(),
    },
    Query: {
      properties: (parent, args, { db }, info) => db.property.findAll(),
      users: (parent, args, { db }, info) => db.user.findAll(),
      property: (parent, { id }, { db }, info) => db.property.findByPk(id),
      user: (parent, { id }, { db }, info) => db.user.findByPk(id),
      /*search: (parent, { firstName }, { db }, info) => {
        console.log("ID TYPE" + "." + firstName);
        db.user.findAll({
        where : { firstName }
        })},*/
      search: (parent, args, { db }, info) => {

        const shouldApplyFilter = args.input && args.input.firstName;
        console.log("INPUT"+"."+args.input)
        console.log("EINPUT"+"."+args.input.firstName)
        if (shouldApplyFilter) {
          const nameFilter = args.input.firstName;
          console.log("NINPUT"+"."+nameFilter)
          return db.user.findAll({ 
            where: {
              firstName : nameFilter}
            })
        }
      },
    },
  };