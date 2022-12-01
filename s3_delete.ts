// aws configure --profile wasabi
// aws s3 ls --endpoint-url=https://s3.wasabisys.com

import {AWSError} from "aws-sdk";

const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({profile: 'wasabi'});
AWS.config.credentials = credentials;
AWS.config.region = "ap-northeast-2";

const ep = new AWS.Endpoint('s3.wasabisys.com');
const s3 = new AWS.S3({endpoint: ep});

const main = async (bucket: any, key: string) => {

  const params = {
	  Bucket: bucket,
	  Key: key
  };

  await s3.deleteObject(params).promise();
};

main('7thcode', 'backup/qtie.mp4');
