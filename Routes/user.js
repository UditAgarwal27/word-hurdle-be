const { default: axios } = require('axios');
const mongoose = require('mongoose');
const router = require('express').Router();
const tokenModel = require('../Models/token');
const userModel = require('../Models/user');


// route to get new access token from refresh token

router.get('/refreshToken', async (req, res) => {
    const refresh_token = req.body.refreshToken;

    axios.post(process.env.token_endpoint, {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
    }
    ).then((response) => {
        if (response === null) { res.status(500).json({ msg: "Server error in fetching the access token" }) };

        console.log("access token from refresh token ", response.data);

        return res.status(200).json(response.data);
    })
    .catch((err) => console.log(err))
})


//if user does not exist in put db

router.get('/user/firsttime', async (req, res) => {
    console.log("inside the first time");
    // console.log(req.headers);
    const access_token_withBearer = req.headers['authorization'];
    console.log("access token send by front end : ", access_token_withBearer)

    // const username = req.body.username;
    const username = "artemis";

    axios.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos',
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': access_token_withBearer
            }
        }).then(response => {
            if (response == undefined || response == null) return res.status(500).json({ msg: "Server error in fetching user details" })

            let first_name = response.data.names[0].givenName;
            let last_name = response.data.names[0].familyName;
            let display_name = response.data.names[0].displayName;
            let avatar = response.data.photos[0].url;
            let email = response.data.emailAddresses[0].value;

            const userobject = { first_name, last_name, username, email, avatar, display_name };

            const user = new userModel({
                first_name, last_name, display_name, email, avatar, username
            })
            user.save();

            res.status(200).json({ msg: "User successfully saved to DB", user: userobject });

        })
        .catch(err => {
            console.log("axios error in fetching user details for the first time");
        })
})





// if user already exist in our db
router.get('/user', async (req, res) => {
    const headers = req.headers;

    const access_token_withBearer = headers['authorization'];

    axios.get('https://people.googleapis.com/v2/people/me?personFields=emailAddresses',
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': access_token_withBearer
            }
        }).then(response => {
            if (response == undefined || response == null) return res.status(500).json({ msg: "Server error in fetching user details" })

            let email = response.data.emailAddresses[0].value;

            let userobject = null;
            userModel.findOne({ "email": email })
                .then(user => {
                    if (user) {
                        let first_name = user.first_name;
                        let last_name = user.last_name;
                        let display_name = user.display_name;
                        let email = user.email;
                        let avatar = user.avatar;
                        let username = user.username;
                        userobject = {
                            first_name, last_name, email, avatar, username, display_name
                        }
                    }
                })
            if (userobject) res.status(200).json(userObject);

        })
})






//exchange the authorization code for access token and refresh token
router.post('/thirdPartyAuthentication', async (req, res) => {
    console.log("inside third party authentication")
    authCode = req.body.authCode;

    await axios.post("https://accounts.google.com/o/oauth2/token",
        {
            code: authCode,
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            redirect_uri: process.env.redirect_uri,
            grant_type: "authorization_code"
        },
        {
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            }
        }
    )
    .then(async (response) => {
        if (response === null) {
            res.status(500).json({ msg: "Server error in fetching the access token" })
        };

        const token = new tokenModel({
            refresh_token: response.data.refresh_token == null ? "" : response.data.refresh_token,
            scope: response.data.scope == null ? "" : response.data.scope,
            token_type: response.data.token_type == null ? "" : response.data.token_type,
            id_token: response.data.id_token == null ? "" : response.data.id_token
        })

        token.save()

        let userResponseObject = {};

        userResponseObject.access_token = response.data.access_token;
        userResponseObject.expires_in = response.data.expires_in;
        userResponseObject.refresh_token = response.data.refresh_token;
        userResponseObject.scope = response.data.scope;
        userResponseObject.token_type = response.data.token_type;
        userResponseObject.id_token = response.data.id_token;

        await axios.get('https://people.googleapis.com/v1/people/me?personFields=emailAddresses',
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " +response.data.access_token
                }
            })
            .then(  (userResponse) => {
                if (userResponse == undefined || userResponse == null) return res.status(500).json({ msg: "Server error in fetching user details" })
                let email = userResponse.data.emailAddresses[0].value;
                const userFound =   userModel.findOne({ "email": email })
                if (userFound) {
                    userResponseObject.userExists = true;
                }
                userResponseObject.userExists = false;
            })
            .catch(err=>{
                console.log("some errror occurde in finding the user in google api for the first time : ", err);
            })
        console.log("user response data is : ",userResponseObject);
        return res.status(200).json(userResponseObject);
    })
    .catch((err) => console.log("something wrong happened in fetching accesss token the first time : ", err));
})

module.exports = router;
