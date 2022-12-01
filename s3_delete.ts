// aws configure --profile wasabi
// aws s3 ls --endpoint-url=https://s3.wasabisys.com

// ex. create basket
// aws s3 mb s3://[NEW_BASKETNAME] --endpoint-url=https://s3.ap-northeast-2.wasabisys.com

import {AWSError} from "aws-sdk";

const fs = require('fs');
const crypto = require('crypto');
const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({profile: 'wasabi'});
AWS.config.credentials = credentials;
AWS.config.region = "ap-northeast-2";

const ep = new AWS.Endpoint('s3.wasabisys.com');
const s3 = new AWS.S3({endpoint: ep});

const main = async (bucket: any, key: string, fileName: string) => {


  const params = {
	  Bucket: bucket,
	  Key: key,
	  Body: fileData,
	  ContentMD5: contentMD5,
	  ContentType: 'video/mp4',
	  ACL: 'public-read'
  };

  await s3.deleteObject(params).promise();
};

main('7thcode', 'backup/qtie.mp4', '/Users/oda/Desktop/qtie.mp4');
