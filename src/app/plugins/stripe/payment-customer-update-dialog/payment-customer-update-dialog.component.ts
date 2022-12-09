/**
 * Copyright © 2019 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IErrorObject} from "../../../../../types/platform/universe";
import {ExtService} from "../../../plugins/ext-services/ext.service";
import {BaseDialogComponent} from "../../../platform/base/components/base-dialog.component";
import {TranslateService} from "@ngx-translate/core";

/**
 *
 *
 * @since 0.01
 */
@Component({
	selector: "aigia-payment-customer-update-dialog",
	styleUrls: ["./payment-customer-update-dialog.component.css"],
	templateUrl: "./payment-customer-update-dialog.component.html",
})
export class PaymentCustomerUpdateDialogComponent extends BaseDialogComponent implements OnInit {

	/**
	 * @constructor
	 * @param data
	 * @param matDialogRef
	 * @param address
	 * @param translate
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: any,
		public matDialogRef: MatDialogRef<PaymentCustomerUpdateDialogComponent>,
		protected address: ExtService,
		public translate: TranslateService
	) {
		super();
	}

	/*
	*
	*/
	public ngOnInit(): void {
		this.content.address.country = "ja";
	}

	/**
	 *
	 */
	get content(): any {
		return this.data.content;
	}

	/**
	 *
	 */
	public cancel(): void {
		this.matDialogRef.close(null);
	}

	/**
	 *
	 */
	public onAccept(): void {
		this.matDialogRef.close(this.data);
	}

	/**
	 *
	 */
	public changePostalCode(): void {
		this.address.zipToAddress(this.content.address.postal_code.replace("-", ""), (error: IErrorObject, address: any) => {
			if (!error) {
				this.content.address.state = address.address1;
				this.content.address.city = address.address2;
				this.content.address.line1 = address.address3;
			} else {

			}
		})
	}

}
