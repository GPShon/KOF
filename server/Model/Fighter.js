const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const FighterSchema = new Schema(
{
  FighterName:String,//姓名
  Time:String,//参赛时间
  Type:String,//类型

  Skill:String,//特殊技
  SkillName:String,
  Super_Skill:String,//超绝技-特殊技

  Stunt:String,//绝技
  StuntName:String,
  Super_Stunt:String,//超绝技
  Ultimate_Stunt:String,//终极绝技
  Ultimate_Stunt_Name:String,

  Passive:String,//被动技
  PassiveName:String,
  Super_Passive:String,//超绝技-被动技

  General:String,//通用 
  GeneralName:String,

  Prise:Number,
  Trample:Number,

  evaluate:Array,
  
},{versionKey:false})

const Fighter = mongoose.model('fighter',FighterSchema);
module.exports = Fighter;