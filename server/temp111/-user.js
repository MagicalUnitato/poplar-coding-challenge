module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
      },
      {
        freezeTableName: true,
      }
    );
  
    User.associate = (models) => {
      User.hasMany(models.property , { foreignKey: 'userId', as: 'property' });
    };
    return User;
}