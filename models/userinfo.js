module.exports = function (sequelize, DataTypes) {
    const userInfo = sequelize.define("user_info", {
        first_name: {
           type: DataTypes.STRING,
            allowNull: false
        },

        last_name: {
           type: DataTypes.STRING,
           allowNull: false
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
           allowNull: false
        },
        
        types: {
            type: DataTypes.STRING,
            allowNull: false
         },
         
        meeting_location: {
            type: DataTypes.STRING,
            allowNull: false
         },
            
        
        directions: {
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: true,
        },
        meeting_7: {
            
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
return userInfo;
};