/**
 * Copyright © 2019 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseDialogComponent} from "../../../platform/base/components/base-dialog.component";
import {TranslateService} from "@ngx-translate/core";
import {StripeWithdrawalDialogDirective} from "./stripe-withdrawal-dialog.directive";

/**
 *
 *
 * @since 0.01
 */
@Component({
	selector: "stripe-withdrawal-dialog",
	styleUrls: ["./stripe-withdrawal-dialog.component.css"],
	templateUrl: "./stripe-withdrawal-dialog.component.html",
})
export class StripeWithdrawalDialogComponent extends BaseDialogComponent {

	/**
	 * @constructor
	 * @param data
	 * @param matDialogRef
	 * @param translate
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: any,
		public matDialogRef: MatDialogRef<StripeWithdrawalDialogComponent>,
		public translate: TranslateService) {
		super();
	}

	public checked = false;
	public checked1 = false;
	public checked2 = false;

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
	 * onChecked
	 */
	public onChecked(event: any): void {
		this.checked = event.checked;
	}

	/**
	 * onChecked
	 */
	public onChecked1(event: any): void {
		this.checked1 = event.checked;
	}

	/**
	 * onChecked
	 */
	public onChecked2(event: any): void {
		this.checked2 = event.checked;
	}

}
