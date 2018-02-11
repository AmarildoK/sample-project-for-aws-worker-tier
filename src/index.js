const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');
const cors = require('cors');
const chromeLauncher = require('chrome-launcher');
const { extractCampaignPdf } = require('./extractPdf');
const { saveObject } = require('./util');

const chromeConfig = {
    logLevel: 'verbose',
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--enable-logging', '--v=1', '--disable-dev-shm-usage'],
    chromePath: '/usr/bin/google-chrome',
    connectionPollInterval: 5000,
    maxConnectionRetries: 10,
    port: 9222,
    handleSIGINT: false
};

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;        // set our port
let router = express.Router();

router.post('/',
    async function (req, res) {
        req.setTimeout(0);

        let data = req.body;

        const chrome = await chromeLauncher.launch(chromeConfig)
        
        const { url, timestamp, printOptions } = data;
        const bucket = data.bucket;
        const campaign = data.campaign;
        const user = data.user;

        const pdfBuffer = await extractCampaignPdf(url, printOptions);

        let config = {
            ACL: 'public-read',
            ContentType: 'application/pdf',
            Metadata: {
                timestamp: `${timestamp}`
            }
        };

        const pdfSaveRes = await saveObject(pdfBuffer, bucket.name, `${bucket.path}/${bucket.key}.pdf`, config);

        const resData = {
            'status': 'done',
            'data': {}
        };

        res.status(200).send(resData)
    });


app.use('/', router);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err)
});

const server = app.listen(port);
console.log('Listening', port);