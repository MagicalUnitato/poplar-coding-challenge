module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('property', {
      userId: DataTypes.STRING ,
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

  Property.associate = (models) => {
    Property.belongsTo(models.user , { foreignKey: 'userId', as: 'property' });
  };

  return Property;
}