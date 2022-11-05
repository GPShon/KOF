const express = require('express');
const Fighter = require('../../Model/Fighter');
const router = express.Router();
// 测试接口
router.get('/text',(req,res)=>{
    res.json({ok:'1'})
})

router.post('/addFighter',(req,res)=>{
    const {
        FighterName,Time,Type,
        Skill,SkillName,Super_Skill,
        Stunt,StuntName,Super_Stunt,Ultimate_Stunt,Ultimate_Stunt_Name,
        Passive,PassiveName,Super_Passive,
        General,GeneralName
            } = req.body
            const Prise = 0;
            const Trample = 0;
            const evaluate = [
                {
                    "username": "admin",
                    "date": "2022-11-02 13:14",
                    "text": "请畅所欲言吧！"
                }
            ]
            console.log(FighterName,Time,Type,
                Skill,SkillName,Super_Skill,
                Stunt,StuntName,Super_Stunt,Ultimate_Stunt,Ultimate_Stunt_Name,
                Passive,PassiveName,Super_Passive,
                General,GeneralName,Prise,Trample,evaluate);
    const newFighter = new Fighter({
        FighterName,Time,Type,
        Skill,SkillName,Super_Skill,
        Stunt,StuntName,Super_Stunt,Ultimate_Stunt,Ultimate_Stunt_Name,
        Passive,PassiveName,Super_Passive,
        General,GeneralName,
        Prise,Trample,evaluate
    })
    console.log(new Fighter);
    newFighter.save((err,docs)=>{
        if(!err){
            console.log(docs);
        }
    })
    return res.status(200).json(newFighter)
})

router.get('/getAllFighter',(req,res)=>{
    Fighter.find().then(FighterList=>{
        
        // console.log(FighterList);
        res.status(200).json({FighterList})
    }) 

})

router.get('/getFighter/:FighterName',(req,res)=>{
    console.log(req.params);
    Fighter.findOne({FighterName:req.params.FighterName}).then(Fighter=>{
        Fighter.evaluate.sort(function (a, b)
    {
      return b.date < a.date ? -1 : 1
    })
        res.status(200).json({Fighter})
    })
})

router.get('/pushTrample/:FighterName',(req,res)=>{
    Fighter.findOne({FighterName:req.params.FighterName}).then(fighter=>{
        const Trample = fighter.Trample
        Fighter.findOneAndUpdate({FighterName:req.params.FighterName},{$set:{'Trample':Trample + 1 }},{new:true}).then(Fighter=>{
            return res.status(200).json({Fighter})
    })
    })
    
})

router.get('/pushPrise/:FighterName',(req,res)=>{
    Fighter.findOne({FighterName:req.params.FighterName}).then(fighter=>{
        const Prise = fighter.Prise
        Fighter.findOneAndUpdate({FighterName:req.params.FighterName},{$set:{'Prise':Prise + 1 }},{new:true}).then(Fighter=>{
            return res.status(200).json({Fighter})
    })
    })
    
})

router.post('/addEvaluate/:FighterName',(req,res)=>{
    
    Fighter.findOne({FighterName:req.params.FighterName}).then(fighter=>{
        const evaluate = req.body
        console.log(evaluate);
        // console.log(evaluate.username);
        Fighter.findOneAndUpdate({FighterName:req.params.FighterName},
                                {$push:{'evaluate':{username:evaluate.username,date:evaluate.date,text:evaluate.text}}},
                                {new:true}).then(Fighter=>{
                                    res.status(200).json({Evaluate:Fighter.evaluate})
                                })
    })
})




module.exports = router