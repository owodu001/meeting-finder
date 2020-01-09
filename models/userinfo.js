const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const UserInfo = sequelize.define(
    "UserInfo",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },

      days_sober: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      sponsor_first: {
        type: DataTypes.STRING,
        allowNull: true
      },

      Sponsor_last: {
        type: DataTypes.STRING,
        allowNull: true
      },

      sponsor_cell: {
        type: DataTypes.STRING,
        allowNull: true
      },

      meeting_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      types: {
        type: DataTypes.STRING,
        allowNull: true
      },

      meeting_location: {
        type: DataTypes.STRING,
        allowNull: true
      },

      directions: {
        type: DataTypes.STRING,
        allowNull: true
      },

      meeting_1: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      meeting_2: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      meeting_3: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      meeting_4: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      meeting_5: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      meeting_6: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      meeting_7: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCreate: function(userInfo) {
          userInfo.password = bcrypt.hashSync(
            userInfo.password,
            bcrypt.genSaltSync(10),
            null
          );
        }
      }
    }
  );

  // Creating a custom method for our User model.
  //This will check if an unhashed password entered by the
  //user can be compared to the hashed password stored in our database
  UserInfo.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  /*
        User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        });
        */
  return UserInfo;
};
