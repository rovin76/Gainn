const express = require("express")
const cors = require("cors");
const { connection } = require("./config/db")
const app = express();

app.use(express.json())
app.use(cors());
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // specify the filename for uploaded files
    }
});

const upload = multer({ storage: storage });



app.get("/", (req, res) => {
    res.send("Home page")
})

app.post('/upload', upload.single('file'), function (req, res, next) {
    console.log(req.body,req.file)
    res.send('File uploaded successfully');
});

app.listen(8000, async () => {
    try {
        await connection;
        console.log("Connected to Database")
    }
    catch (err) {
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT 8000`)
})