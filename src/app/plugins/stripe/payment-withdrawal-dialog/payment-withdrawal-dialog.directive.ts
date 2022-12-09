/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {IErrorObject} from "../../../../../types/platform/universe";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaymentWithdrawalDialogComponent} from "./payment-withdrawal-dialog.component";
import {CompleteDialogComponent} from "../complete-dialog/complete-dialog.component";
import {StripeService} from "../stripe.service";

@Directive({
	selector: "[payment-withdrawal-dialog]",
})

export class PaymentWithdrawalDialogDirective {

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
	public unSubscribe(): void {
		this.stripeService.retrieveCustomer((error: IErrorObject, result: any) => {
			if (!error) {
				result.sources.updateable.description = "";
				const dialog: MatDialogRef<any> = this.matDialog.open(PaymentWithdrawalDialogComponent, {
					width: "50%",
					minWidth: "320px",
					height: "fit-content",
					panelClass: "dark-card",
					data: {content: result.sources.updateable},
					disableClose: true,
				});

				dialog.beforeClosed().subscribe((result: any): void => {
					if (result) {
						this.Progress(true);
						this.stripeService.cancel_subscribe((error: IErrorObject, result: any) => {
							if (!error) {
								this.Success("", result);
							} else {
								this.Progress(false);
								this.Error("error", error);
							}
						})
					}
				});

				dialog.afterClosed().subscribe((result: any): void => {

				});

			} else {
				this.Error("error", error);
			}
		})
	}

}
