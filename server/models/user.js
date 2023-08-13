module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
      },
      {
        freezeTableName: true,
      }
    );
  
    user.associate = (models) => {
      user.hasMany(models.property);
    };
    return user;
}