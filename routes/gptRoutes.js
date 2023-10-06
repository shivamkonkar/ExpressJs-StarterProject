
const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()

router.use(express.json())


const generateResponse = async (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        throw error;
    }
};

let searchQueryStr = ''

async function callGPT() {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            // messages: [{ role: "system", content: 'you are a fashion guru. your job is to ask the user 4 questions to figure out what type of t shirts he wants to purchase. this information will be used to build a query to scrape a fashion ecommerce store. do not ask all the questions together. wait for a response and based on the input generate the next question' }],
            prompt: 'you are a fashion guru. your job is to ask the user 4 questions to figure out what type of t shirts he wants to purchase. this information will be used to build a query to scrape a fashion ecommerce store. do not ask all the questions together. wait for a response and based on the input generate the next question',
        })
    };

    try {

        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        console.log(data)
        return data.choices[0].message.content.trim();
    } catch (error) {
        throw error;
    }

}

const fashionResponse = async (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: 'you are a fashion guru. your job is to ask the user 4 questions to figure out what type of t shirts he wants to purchase. this information will be used to build a query to scrape a fashion ecommerce store. do not ask all the questions together. wait for a response and based on the input generate the next question' }],
        })
    };

    try {
        searchQueryStr += ` ${userMessage}`
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        console.log(data)
        return data.choices[0].message.content.trim();
    } catch (error) {
        throw error;
    }
};

router.get('/', async (req, res) => {
    res.render('gptchat')
})

router.post('/api', async (req, res) => {
    console.log(searchQueryStr)
    const resp = await generateResponse(req.body.message)
    res.send({ response: resp })
})


module.exports = router