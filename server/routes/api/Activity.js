const express = require('express');
const Activity = require('../../Model/Activity');
const router = express.Router();

// 添加活动
router.post('/addActivity', (req, res) =>
{
  const newActivity = new Activity(
  {
    title: req.body.title,
    time: req.body.time
  })
  newActivity.save((err, docs) =>
  {
    if (!err)
    {
      console.log(docs);
    }
  })
  return res.status(200).json(newActivity)
})
// 获取活动
router.get('/getActivity', (req, res) =>
{
  Activity.find({}, { title: 1, time: 1, _id: 0 }).then(activity =>
  {
    // console.log(activity);
    activity.sort(function (a, b)
    {
      return b.time < a.time ? -1 : 1
    })
    return res.status(200).json({ activity })
  })
})
// 删除活动 
router.post('/delActivity', (req, res) =>
{
  Activity.findOne({ title: req.body.title, time: req.body.time }, { title: 0, time: 0, _id: 1 })
          .then(id =>
        {
        Activity.deleteOne({ _id: id }).then(result =>{
            if(result.deletedCount == 1){
                return res.status(200).json({message:'删除成功'})
            }
        })
        
        })
  /* Activity.findByIdAndDelete({title:req.body.title,time:req.body.time}).then(result=>{
      console.log(result);
  }) */
})

module.exports = router