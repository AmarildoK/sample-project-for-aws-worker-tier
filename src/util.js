const fs = require('fs');

/**
 *
 * @param {int} [timeInMs]
 * @return {Promise}
 */
function wait(timeInMs) {
    return new Promise((resolve) => {
        setTimeout(_ => resolve('done waiting'), timeInMs || 2000)
    })
}

/**
 *
 * @param buffer
 * @param fullKey
 */
function saveLocal(buffer, fullKey) {
    return new Promise((resolve, reject) => {
        console.log('saving locally', fullKey);
        fs.writeFile(`./${fullKey}`, buffer, function (err) {
            if (err) {
                reject(err);
                return;
            }

            resolve('success');
        });
    })
}

/**
 * Save image based on env
 * @param buffer
 * @param bucketName
 * @param fullKey
 * @param options
 *
 * @return {Promise<>}
 */
function saveObject(buffer, bucketName, fullKey, options) {
    if (process.env.NODE_ENV === 'local') {
        return saveLocal(buffer, fullKey);
    }

    return saveToS3(buffer, bucketName, fullKey, options);
}

/**
 * save image to s3
 * @param {Buffer} buffer
 * @param {String} bucketName
 * @param {String} fullKey
 *
 * @param {Object} options
 * @return {Promise<>}
 */
function saveToS3(buffer, bucketName, fullKey, options) {
    const AWS = require("aws-sdk");
    const s3 = new AWS.S3();
    console.log('fullKey', fullKey);
    let config = Object.assign({
        "Bucket": bucketName,
        "Key": fullKey,
        "Body": buffer,
        "ACL": "public-read"
    }, options);


    return new Promise(function (resolve, reject) {
        s3.putObject(config, function (err, data) {
            buffer = null;
            if (err) {
                reject(err);
                return;
            }

            console.log('success saving file', data);
            resolve(data);
        });
    })
}
module.exports = {
    wait,
    saveObject
};