const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');



ModelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ModelSchema);
