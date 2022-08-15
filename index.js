const express = require('express')
const Razorpay = require('razorpay')
const cors = require('cors')

const app = express()
app.use(express.static("./public"));
app.use(express.json())

var corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("hi")
})

app.post('/order', async (req, res) => {
    try {
        const amount = +req.body.amount;

        var instance = new Razorpay({
            key_id: 'rzp_test_B3VlOO85Zb2JGa',
            key_secret: 'BAaQ6A9Dmw3Jj70Cyye2RWy9'
            // this needs to go in .env file
        })

        var options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        const response = await instance.orders.create(options);
        console.log(response.id);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("error")
    }

})




app.listen(3000, () => console.log(`Server is running at port 3000...`))