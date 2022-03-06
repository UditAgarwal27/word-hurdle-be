const router = require('express').Router();
const axios = require('axios').default;
const wordsModel = require('../Models/word');

router.get('/validity', async(req, res)=>{
    const headers = req.headers;
    const access_token_withBearer = headers['authorization'];

    if(!access_token_withBearer) return res.status(400).json({msg:"Did not send the access token"})

    const word = req.body.word;

    var options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
        headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': process.env.rapid_api_key
        }
    };

    await axios.get('https://people.googleapis.com/v1/people/me?personFields=emailAddresses',
    {
        headers: {
            'Accept': 'application/json',
            'Authorization': access_token_withBearer
        }
    })
    .then(async(response)=>{
        if(response){
            await axios.request(options)
            .then( (validityResponse)=> {
                return res.status(200).json({validity:true})
            }).catch(function (error) {
                return res.status(400).json({validity:false});
            });
        }
    })
    .catch(err=>{
        return res.status(401).json({msg:"Invalid Access token. not authorized"});
    })
})



router.get('/getAWord', async(req,res)=>{
//     const header = req.headers;
//     const access_token_withBearer = header['authorization'];

    const noOfLetter = req.body.dificulty;
    console.log(noOfLetter);

//     if(!access_token_withBearer) return res.status(400).json({msg:"User did not send an access token"});

//     await axios.get('https://people.googleapis.com/v1/people/me?personFields=emailAddresses',
//     {
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': access_token_withBearer
//         }
// //     })
//     .then(async(response)=>{
//         if(response) {
            await wordsModel.findOne({"noOfLetter":noOfLetter})
            .then(wordResponse=>{
                if(wordResponse){
                    const noOfWords = wordResponse.words.length;
                    const randomIndex =  Math.floor(Math.random() * noOfWords);
                    return res.status(200).json({word: wordResponse.words[randomIndex]});
                }
                return res.status(400).json({msg:"No word was found with this dificulty"});
            })
            .catch(err=>{
                return res.status(500).json({msg:"Server error in fetching the word"});
            })
//         }
//     })
//     .catch(err=>{
//         return res.status(401).json({msg:"Invalid Access token. not authorized"});
//     })

})


module.exports = router;
