const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ActivitySchema = new Schema(
{
  title: String,
  time : String,
  
})

const Activity = mongoose.model('activity',ActivitySchema);
module.exports = Activity;