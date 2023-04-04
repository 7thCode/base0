/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const jwt_crypto = require('crypto');

interface IJWTHeader {
	alg: string;
	typ: string;
}

interface IJWTPayload {
	sub: string;
	iat: number;
}

interface IJWTToken {
	header: IJWTHeader;
	payload: IJWTPayload;
}

class JWT {
	/**
	 * @constructor
	 */
	constructor() {
	}

	private static to_base64(json: any): any {
		const jsonStr: string = JSON.stringify(json);
		const jsonB64: string = Buffer.from(jsonStr).toString('base64');
		return jsonB64.replace(/={1,2}$/, '');
	}

	private static from_base64(base64Str: string): string {
		return Buffer.from(base64Str, 'base64').toString();
	}

	private static HMAC_SHA256(key: string, data: string): string {
		const hash: string = jwt_crypto.createHmac('sha256', key).update(data).digest('base64');
		return hash.replace(/={1,2}$/, '');
	}

	public encode(data: string, key: string): string {
		const date: Date = new Date();
		const timestamp: number = Math.floor(date.getTime() / 1000);
		const header: IJWTHeader = {alg: 'HS256', typ: 'JWT'};
		const payload: IJWTPayload = {sub: data, iat: timestamp};
		const unsignedToken: string = `${JWT.to_base64(header)}.${JWT.to_base64(payload)}`;
		const signature: string = JWT.HMAC_SHA256(key, unsignedToken);
		return `${unsignedToken}.${signature}`;
	}

	public decode(token: string, key: string): IJWTToken {
		const result: IJWTToken = {"header": null, "payload": null};
		const token_and_sign: string[] = token.split(".");
		const unsignedToken: string = token_and_sign[0] + "." + token_and_sign[1]
		const original_signature: string = token_and_sign[2]
		const test_signature: string = JWT.HMAC_SHA256(key, unsignedToken);
		if (original_signature === test_signature) {
			result.header = JSON.parse(JWT.from_base64(token_and_sign[0]));
			result.payload = JSON.parse(JWT.from_base64(token_and_sign[1]));
		}
		return result;
	}

	public static test(): boolean {
		const data: string = '1234567890';
		const key: string = 'secret';
		const jwt: JWT = new JWT();
		const token_string: string = jwt.encode(data, key);
		const result: IJWTToken = jwt.decode(token_string, key);
		return (data === result.payload.sub);
	}
}

// console.log(JWT.test());
