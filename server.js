const express = require('express');
const app = express();
require('dotenv').config();






const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// const text = "book"

app.get('/',async (req,res)=>{
    res.send('Backend Is Running')
})


app.get('/:text',async (req,res)=>{
    // res.send('Hello World')

    let text = req.params.text


    console.log(text)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "You are a helpful assistant that translates English to Bangla."},
            {"role": "user", "content": `Translate the following English text to Bangla: ${text}`}
          ],
      });

      console.log(completion?.data?.choices[0]?.message);
      res.send(completion?.data?.choices[0]?.message?.content)

    // // res.send(req.params)

    // res.send(`User ID: ${text}`);
})


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })