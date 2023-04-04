/**
 * Copyright © 2019 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const path: any = require("path");

const Wrapper: any = require("../../../../server/platform/base/controllers/wrapper");

export class GCP extends Wrapper {

	private bucket: any;

	/**
	 *
	 * @param event
	 * @param config
	 * @param logger
	 * @constructor
	 */
	constructor(event: object, config: any, logger: object) {
		super(event, config, logger);

		const module_config = config.systems.modules.gcp.config;
		const project_root: string = path.join(__dirname, "../../../..");
		const config_path: string = path.join(project_root, "config");
		const bucket_name: string = "aigia_test_bucket"; // module_config.bucket_name;
		const credentials: string = path.join(config_path, module_config.credentials);
		process.env.GOOGLE_APPLICATION_CREDENTIALS = credentials;
		const {Storage} = require('@google-cloud/storage')
		const gcp = new Storage();
		this.bucket = gcp.bucket(bucket_name);
	}

	public delete(gcp_path: string): Promise<any> {
		return this.bucket.file(gcp_path).delete();
	}

	public upload(local_path: string, gcp_path: string): Promise<any> {
		return this.bucket.upload(local_path, {
			destination: gcp_path,
		});
	}
}

module.exports = GCP;
