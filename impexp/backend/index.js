const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csvtojson = require('csvtojson');
const { CsvModel } = require('./models/csv');
const cors = require("cors")
const app = express();
const CsvParser = require('json2csv').Parser;
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

app.get("/", async (req, res) => {
    try {
        const result = await CsvModel.find();
        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send({ msg: "Something went wrong." })
    }
})

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

// export 

app.get('/export', async (req, res) => {
    try {
        let alldata = []
        let data = await CsvModel.find({});
        data.map((item) => {
            const { FirstName, LastName, Email, Phone } = item;
            alldata.push({ FirstName, LastName, Email, Phone });
        })

        const csvFields = ["FirstName", "LastName", "Email", "Phone"];
        const csvParser = new CsvParser({csvFields});
        const csvData = csvParser.parse(alldata);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment:filename=data.csv")
        res.send(csvData)

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
