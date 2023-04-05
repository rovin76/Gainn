const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csvtojson = require('csvtojson');
const { CsvModel } = require('./models/csv');
const cors=require("cors")
const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

mongoose.connect('mongodb://127.0.0.1:27017/csv', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const csvSchema = new mongoose.Schema({}, { strict: false });
// const Csv = mongoose.model('Csv', csvSchema);

app.post('/upload', upload.single('file'), async (req, res) => {
    // console.log(req.file.buffer.toString())
    try {
        const csvData = await csvtojson().fromString(req.file.buffer.toString());
        // console.log("csvData",csvData)
        const result = await CsvModel.create(csvData);
        CsvModel.insertMany(result).then(function () {
            console.log("Data inserted")  // Success
        }).catch(function (error) {
            console.log(error)      // Failure
        });
        res.status(200).json({ message: 'CSV data uploaded successfully', data: result });
    } catch (err) {
        console.error('Error uploading CSV data', err);
        res.status(500).json({ message: 'Error uploading CSV data', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
