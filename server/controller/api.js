const express = require('express');
const router = express.Router();
const Candidate = require('../Models/candidate')

router.get('/', (req, res) => {
    res.send('api is running')
});

router.post('/addCandidate', (req, res) => {
    let candidate = new Candidate({
        name: req.body.name,
        email: req.body.email,
        first_round: req.body.first_round,
        second_round: req.body.second_round,
        third_round: req.body.third_round
    });
    candidate.save((err, registerUser) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(registerUser)
        }
    });
})


router.get('/highScore/candidate', async(req, res) => {
    let aggregate = [{ $project: { maxScore: { $sum: ["$first_round", "$second_round", "$third_round"] } } }]
    let temp = await Candidate.aggregate(aggregate).sort({ "maxScore": -1 }).limit(1)
   
    findId=temp[0]._id
    Candidate.findById(findId).then(data => {
        if (!data) {
            res.send('candidate Not Found')
        } else {
            console.log(data)
            res.send(data) 
        }
    }).catch(err => {
        console.log(err)
    
    }

    )
    
});
router.get('/average/allCandidate', async(req, res) => {
    let aggregate = [{ $addFields: { average_score: { $avg: ["$first_round", "$second_round", "$third_round"] } } }]
    
    // let aggregate = [{ $addFields: {average_score:{ $avg: ["$first_round", "$second_round", "$third_round"] } }]
    
    // $addFields: {
    //     totalHomework: { $sum: "$homework" } ,
    //     totalQuiz: { $sum: "$quiz" }
    //   }
    Candidate.aggregate(aggregate).then(result => {
        if (!result) {
         res.send('Candidate Not Found')
        } else {
            console.log(result,"sad")
            res.status(200).send(result)
     }
 })

    
    
});


// router.get('/average/allCandidate', (req, res) => {
//     let aggregate = [{ $project: { candidateAverage: { $avg: ["$first_round", "$second_round", "$third_round"] } } }]
//     Candidate.aggregate().then(result => {
//         if (!result) {
//             res.send('candidate Not Found')
//         } else {
//             console.log(result)
//             res.status(200).send(result)
          
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// });



module.exports = router