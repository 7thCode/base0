/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {ICustomerContent} from "../../../../../types/plugins/universe";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StripeCustomerUpdateDialogComponent} from "./stripe-customer-update-dialog.component";
import {IErrorObject} from "../../../../../types/platform/universe";
import {StripeService} from "../stripe.service";

@Directive({
	selector: "[stripe-customer-update-dialog]",
})

export class StripeCustomerUpdateDialogDirective {

	@Input() public user: {username:string, user_id:string};
	@Output() public progress = new EventEmitter<any>();
	@Output() public success = new EventEmitter<any>();
	@Output() public error = new EventEmitter<any>();

	constructor(
		protected matDialog: MatDialog,
		private stripeService: StripeService,
	) {
	}

	/**
	 * @returns none
	 */
	protected Progress(value: boolean): void {
		this.progress.emit({type:"progress", value});
	}

	/*
	* */
	private Success(type: string, value: any): void {
		this.success.emit({type, value});
	}

	/*
	* */
	private Error(type: string, value: any): void {
		this.error.emit({type, value});
	}

	/*
	* */
	@HostListener("click", ["$event.target"])
	public createCustomerDialog(): void {

		const create: ICustomerContent = {
			address: {  // The customer’s address.
				city: "", // City, district, suburb, town, or village.
				country: "", // Two-letter country code (ISO 3166-1 alpha-2).
				line1: "", // Address line 1 (e.g., street, PO Box, or company name).
				line2: "", // Address line 2 (e.g., apartment, suite, unit, or building).
				postal_code: "", // ZIP or postal code.
				state: "" // State, county, province, or region.
			},
			description: "", // An arbitrary string attached to the object. Often useful for displaying to users.
			email: this.user.username, // The customer’s email address.
			metadata: {order_id: ''}, // Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
			name: "",  // The customer’s full name or business name.
			phone: "", // The customer’s phone number.
			shipping: { // Mailing and shipping address for the customer. Appears on invoices emailed to this customer.
				address: {
					city: "", // City, district, suburb, town, or village.
					country: "", // Two-letter country code (ISO 3166-1 alpha-2).
					line1: "", // Address line 1 (e.g., street, PO Box, or company name).
					line2: "", // Address line 2 (e.g., apartment, suite, unit, or building).
					postal_code: "", // ZIP or postal code.
					state: "" // State, county, province, or region.
				},
				name: "", // Customer name.
				phone: "", // Customer phone (including extension).
			}
		}

		const dialog: MatDialogRef<any> = this.matDialog.open(StripeCustomerUpdateDialogComponent, {
			minWidth: "320px",
			maxWidth: "620px",
			height: "fit-content",
			panelClass: "dark-card",
			data: {content: create},
			disableClose: true,
		});

		dialog.beforeClosed().subscribe((result: any): void => {
			if (result) { // if not cancel then
				this.Progress(true);
				this.stripeService.createCustomer(result.content, (error: IErrorObject, result: any) => {
					this.stripeService.isCustomer((error: IErrorObject, is_customer: boolean) => {
						if (!error) {
							this.Success("", result);
						} else {
							this.Error("error", error);
						}
					});
					this.Progress(false);
				})
			}
		});

		dialog.afterClosed().subscribe((result: any): void => {

		});

	}

}
