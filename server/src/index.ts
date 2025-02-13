import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import "dotenv/config"

const app = express();
const port = 3001;

app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(compression())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

interface FormData {
    quantity: number;
    price: number;
    total: number;
    profit: number;
}

const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.get('/api/random-values', (req, res) => {
    const randomData: FormData = {
        quantity: getRandomNumber(1, 10),
        price: getRandomNumber(10, 1000),
        total: getRandomNumber(20, 2000),
        profit: getRandomNumber(5, 2000)
    };

    res.json(randomData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});