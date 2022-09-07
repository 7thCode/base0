/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

import {IErrorObject} from "../../../../types/platform/universe";

/**
 *
 */
export class Errors {

	static Error(error: any, tag: string): IErrorObject {
		return {type:1,code: error.code, message: error.message, tag: tag, origin: error};
	}

	static userError(code: number, message: string, tag: string): IErrorObject {
		return {type:2,code: code, message: message, tag: tag, origin: null};
	}

	static generalError(code: number, message: string, tag: string): IErrorObject {
		return {type:3,code: code + 10, message: message, tag: tag, origin: null};
	}

	static configError(code: number, message: string, tag: string): IErrorObject {
		return {type:4,code: code + 100, message: message, tag: tag, origin: null};
	}

	static Exception(error: any, tag: string): IErrorObject {
		return {type:5,code: 10000, message: error.message, tag: tag, origin: error};
	}

}
