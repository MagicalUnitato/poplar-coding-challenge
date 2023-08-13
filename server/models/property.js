module.exports = (sequelize, DataTypes) => {
    const property = sequelize.define('property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        rent: DataTypes.INTEGER,
      },
      {
        freezeTableName: true,
      }
    );
  
    property.associate = (models) => {
      property.belongsTo(models.user);
    };
  
    return property;
  }