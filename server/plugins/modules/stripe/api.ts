/**
 * Copyright (c) 2019 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

// https://stripe.com/docs/api/idempotent_requests

const express: any = require("express");
export const router = express.Router();

const event: any = require.main.exports.event;
const logger: any = require.main.exports.logger;
const config: any = require.main.exports.config;

const gatekeeper: any = require("../../../platform/base/library/gatekeeper");

const Stripes: any = require("./controller");
const stripe: any = new Stripes(event, config, logger);

router.get('/stripe/iscustomer', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.is_customer(request, response);
		});
	}])

router.post('/stripe/customer/create', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.create_customer(request, response);
		});
	}])

router.delete('/stripe/customer/delete', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.delete_customer(request, response);
		});
	}])

router.get('/stripe/customer/retrieve', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.retrieve_customer(request, response);
		});
	}])

router.put('/stripe/customer/update', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.update_customer(request, response);
		});
	}])

router.post('/stripe/source/create', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.create_source(request, response);
		});
	}])

router.get('/stripe/source/retrieve/:index', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.retrieve_source(request, response);
		});
	}])

router.put('/stripe/source/update/:index', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.update_source(request, response);
		});
	}])

router.delete('/stripe/source/delete/:index', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.delete_source(request, response);
		});
	}])

router.post('/stripe/charge', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.charge(request, response);
		});
	}])

router.post('/stripe/subscribe/:plan_no', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.subscribe(request, response);
		});
	}])

router.get('/stripe/subscribe', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.has_subscribe(request, response);
		});
	}])

router.put('/stripe/subscribe/:plan_no', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.update_subscribe(request, response);
		});
	}])

router.delete('/stripe/subscribe/:plan_no', [gatekeeper.default, gatekeeper.authenticate,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.cancel_subscribe(request, response);
		});
	}])

/*
router.post('/stripe-create-card', [gatekeeper.default,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.get(request, response);
		});
	}])

router.post('/stripe-charge', [gatekeeper.default,
	(request: object, response: object): void => {
		gatekeeper.catch(response, () => {
			stripe.get(request, response);
		});
	}])
*/

module.exports = router;
