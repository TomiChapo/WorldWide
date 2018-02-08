const Sequelize= require('sequelize')
const db = new Sequelize('postgres://localhost:5432/whiteboard',{
	logging:false
})

const Tablero = db.define('tablero',{
	'start':{
		 type: Sequelize.STRING,
          // get: function () {
          //      return JSON.parse(this.getDataValue('value'));
          //  },
          //  set: function (value) {
          //      this.setDataValue('value', JSON.stringify(value));
          //  },
	},
	'end':{
		 type: Sequelize.STRING,
          // get: function () {
          //      return JSON.parse(this.getDataValue('value'));
          //  },
          //  set: function (value) {
          //      this.setDataValue('value', JSON.stringify(value));
          //  },
	},
	'color':{
		type:Sequelize.STRING,
	},
})
module.exports={
	Tablero,
	db,
}