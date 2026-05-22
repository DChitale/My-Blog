require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();


app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});

app.listen(3000,()=>{
    console.log("Connected to Backend");
})