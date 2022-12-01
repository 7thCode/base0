// aws configure --profile wasabi
// aws s3 ls --endpoint-url=https://s3.wasabisys.com

// ex. create basket
// aws s3 mb s3://[NEW_BASKETNAME] --endpoint-url=https://s3.ap-northeast-2.wasabisys.com

import {AWSError} from "aws-sdk";

const AWS = require('aws-sdk');

// AWS.config.loadFromPath('./rootkey.json');

// let bucketParams = {
//   Bucket : '7thcode',
//   Key: "backup"
// };

const credentials = new AWS.SharedIniFileCredentials({profile: 'wasabi'});
AWS.config.credentials = credentials;
AWS.config.region = "ap-northeast-2";

const ep = new AWS.Endpoint('s3.wasabisys.com');

const s3 = new AWS.S3({endpoint: ep});

/*
AWS.config.getCredentials(function(error:any) {
  if (error) {
	  console.log(error);
  }else {
	  console.log("Success");
  }
});
*/

const param = {
  Bucket: '7thcode',
  Key: 'backup/test.txt', // ファイル絶対パス
  Body: 'hello!', // ファイルの内容
  ACL: 'public-read', // インターネットから誰でもダウンロードできるように
  ContentType: 'text/plain',
}

s3.putObject(param,  (err:AWSError, data:any) => {
	if (err) {
		console.log(err, err.stack); // an error occurred
	} else {
		console.log(data);           // successful response
	}
});
