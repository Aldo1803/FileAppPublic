const config = require('../config');
const fs = require('fs').promises;  // Using promise version of fs
const AWS = require('aws-sdk');

const uploadFile = async (fileName, filePath, type) => {
    const s3 = new AWS.S3({
        accessKeyId: config.awsAccesskeyID,
        secretAccessKey: config.awsSecretAccessKey
    });

    try {
        const data = await fs.readFile(filePath);

        const params = {
            Bucket: 'YOUR BUCKET NAME',
            Key: fileName,
            Body: data,
            ContentType: type
        };

        const result = await s3.upload(params).promise();  // Using promise method of s3
        return { message: `File uploaded successfully at ${result.Location}` };

    } catch (error) {
        throw new Error(`Failed to upload the file. ${error.message}`);
    }
};

module.exports = { uploadFile };
