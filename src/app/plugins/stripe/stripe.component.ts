/**
 * Copyright (c) 2019 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {Callback, IErrorObject} from "../../../../types/platform/universe";

import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

import {GridViewComponent} from "../../platform/base/components/gridview.component";


import {SessionService} from "../../platform/base/services/session.service";
import {StripeService} from "./stripe.service";

import * as _ from 'lodash';
import {Overlay} from "@angular/cdk/overlay";
import {YesNoDialogComponent} from "../../platform/base/components/yes-no-dialog/yes-no-dialog.component";
import {Spinner} from "../../platform/base/library/spinner";
import {Errors} from "../../platform/base/library/errors";
import {ICustomerContent} from "../../../../types/plugins/universe";
import {StripeWithdrawalDialogComponent} from "./stripe-withdrawal-dialog/stripe-withdrawal-dialog.component";
import {CompleteDialogComponent} from "./complete-dialog/complete-dialog.component";
import {StripeCardCreateDialogComponent} from "./stripe-card-create-dialog/stripe-card-create-dialog.component";
import {StripeCustomerUpdateDialogComponent} from "./stripe-customer-update-dialog/stripe-customer-update-dialog.component";

/**
 * Stripe
 *
 * @since 0.01
 */
@Component({
	selector: "stripe",
	templateUrl: "./stripe.component.html",
	styleUrls: ["./stripe.component.css"],
})
export class StripeComponent extends GridViewComponent implements OnInit {

	public isSubscribe: boolean;
	public hasPaymentMethod: boolean;
	public isCustomer: boolean;

	private spinner: Spinner;

	/**
	 * @param interactionService
	 * @param session
	 * @param overlay
	 * @param snackbar
	 * @param matDialog
	 * @param stripeService
	 * @param changeDetectorRef
	 */
	constructor(
		protected session: SessionService,
		protected overlay: Overlay,
		protected matDialog: MatDialog,
		private stripeService: StripeService,
		protected snackbar: MatSnackBar,
		public changeDetectorRef: ChangeDetectorRef
	) {
		super(session, matDialog);
		this.spinner = new Spinner(overlay);
	}

	/**
	 * リストビューデコレータ
	 * @param object
	 */
	public toListView(object: any): any {
		object.cols = 1;
		object.rows = 1;
		return object;
	}

	/**
	 * ビューデコレータ
	 *
	 * @param data デコレーション対象
	 */
	public toView(data: any): any {
		return data;
	}

	/**
	 * トランスフォーマー
	 * @param data トランスフォーム対象
	 */
	public confirmToModel(data: any): any {
		return data;
	}

	/**
	 * エラー表示
	 * @param error
	 */
	private errorBar(error: IErrorObject): void {
		if (error) {
			this.snackbar.open(error.message, "Close", {});
		}
	}

	/**
	 * メッセージ表示
	 * @param message
	 */
	private messageBar(message: string): void {
		if (message) {
			this.snackbar.open(message, "Close", {
				panelClass: ["message-snackbar"]
			});
		}
	}

	/**
	 */
	protected Progress(value: boolean): void {
		this.spinner.Progress(value);
	}

	/*
	* */
	public ngOnInit(): void {
		this.sort = {};
		super.ngOnInit();
		this.results = [];
		this.getSession((error: IErrorObject, session: object): void => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
				});
			}
		});
	}

	/**
	 * 再描画
	 * @param callback
	 */
	public draw(callback: Callback<object[]>): void {
		const attach_card_design = (card: any): any => {
			card.view_title = "title";
			card.view_class = "box-body";
			let padding = "****-****-****-";
			switch (card.brand) {
				case "Visa":
					card.view_title = "white-title";
					card.view_class = "white-box-body";
					break;
				case "MasterCard":
					card.view_title = "brown-title";
					card.view_class = "brown-box-body";
					break;
				case "JCB":
					card.view_title = "gold-title";
					card.view_class = "gold-box-body";
					break;
				case "American Express":
					card.view_title = "green-title";
					card.view_class = "green-box-body";
					padding = "****-******-*";
					break;
				case "Diners Club":
					card.view_title = "blue-gray-title";
					card.view_class = "blue-gray-box-body";
					padding = "****-******-";
					break;
				default:
			}
			if (card.is_default) {
				card.view_class = "default-" + card.view_class;
			}

			card.display_no = padding + card.last4;
			return card;
		}
		this.Progress(true);
		this.stripeService.is_subscribe((error: IErrorObject, result: boolean) => {
			if (!error) {
				this.isSubscribe = result;
				this.stripeService.retrieveCustomer((error: IErrorObject, result: any) => {
					if (!error) {
						if (result) {
							const cards = result.sources.data;
							const default_source = result.sources.default;

							const results = cards.map((card: any) => {
								card = this.toListView(card);
								card.is_default = (card.id === default_source);
								return attach_card_design(card);
							});

							this.results = _.sortBy(results, [(o) => {
								return o.id;
							}]);

						} else {
							this.results = [];
						}
						callback(null, this.results);
					} else {
						callback(error, null);
					}
					this.Progress(false);
				})
			} else {
				switch (error.code) {
					case 1:
						break;
					default:
						this.errorBar(error);
				}
				callback(error, null);
				this.Progress(false);
			}
		})
	}

	/**
	 */
	public createCustomer(): void {
		this.stripeService.createCustomer({email: "test3@test.com"}, (error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (error) {
						this.errorBar(error);
					}
				});
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public retrieveCustomer(): void {
		this.stripeService.retrieveCustomer((error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (error) {
						this.errorBar(error);
					}
				});
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public deleteCustomer(callback: Callback<any>): void {
		this.stripeService.deleteCustomer((error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (!error) {
						callback(error, cards);
					} else {
						callback(error, null);
					}
				});
			} else {
				callback(error, null);
			}
		})
	}

	/**
	 */
	public createSource(card: any, callback: Callback<any>): void {
		this.stripeService.createSource({card: card}, (error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (!error) {
						callback(error, cards);
					} else {
						callback(error, null);
					}
				});
			} else {
				callback(error, null);
			}
		})
	}

	/**
	 */
	public retrieveSource(index: number): void {
		this.stripeService.retrieveSource(index, (error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (error) {
						this.errorBar(error);
					}
				});
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public updateSource(index: number, content: any): void {
		this.stripeService.updateSource(index, content, (error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (error) {
						this.errorBar(error);
					}
				});
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public updateDefault(id: string) {
		this.stripeService.updateCustomer({content:{default_source: id}}, (error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (!error) {
						this.changeDetectorRef.detectChanges();
					} else {
						this.errorBar(error);
					}
				});
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public updateSubscription() {
		const metadata = {order_id: '1234'};
		this.Progress(true);
		this.stripeService.update_subscribe(metadata, (error: IErrorObject, result: any) => {
			this.Progress(false);
			if (!error) {
				this.messageBar("OK");
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public cancelSubscription() {
		this.Progress(true);
		this.stripeService.cancel_subscribe((error: IErrorObject, result: any) => {
			this.Progress(false);
			if (!error) {
				this.messageBar("OK");
			} else {
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public onDeleteSource(card_id: string): void {
		const resultDialogContent: any = {title: "Card", message: "Delete this?"};
		const dialog: MatDialogRef<any> = this.matDialog.open(YesNoDialogComponent, {
			width: "30%",
			minWidth: "320px",
			height: "fit-content",
			data: {
				session: this.currentSession,
				content: resultDialogContent,
			},
			disableClose: true,
		});
		dialog.afterClosed().subscribe((result: object) => {
			if (result) { // if not cancel then
				this.stripeService.deleteSource(card_id, (error: IErrorObject, result: any) => {
					if (!error) {
						this.draw((error: IErrorObject, cards: object[] | null): void => {
							if (error) {
								this.errorBar(error);
							}
						});
					} else {
						this.errorBar(error);
					}
				})
			}
		});

	}

	/**
	 * クリエイトダイアログ
	 */
	public createCardDialog(): void {

		const initalData = {
			number: "",
			exp_month: "",
			exp_year: "",
			cvc: ""
		};

		const dialog: MatDialogRef<any> = this.matDialog.open(StripeCardCreateDialogComponent, {
			width: "30%",
			minWidth: "320px",
			height: "fit-content",
			data: {content: initalData},
			disableClose: true,
		});

		dialog.beforeClosed().subscribe((result: any): void => {
			if (result) { // if not cancel then
				this.Progress(true);
				this.createSource(result.content, (error, cards) => {
					if (!error) {

					} else {
						switch (error.code) {
							case 1:
								this.errorBar(Errors.generalError(1, "住所登録が必要です。", "A00001"));
								break;
							default:
								this.errorBar(error);
								break;
						}
					}
					this.Progress(false);
				});
			}
		});

		dialog.afterClosed().subscribe((result: object) => {
			if (result) {
				this.Complete("", result);
			}
		});

	}

	/**
	 * アップデートダイアログ
	 */
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
			email: this.currentSession.username, // The customer’s email address.
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
			data: {content: create, spinner: this.spinner},
			disableClose: true,
		});

		dialog.beforeClosed().subscribe((result: any): void => {
			if (result) { // if not cancel then
				this.Progress(true);
				this.stripeService.createCustomer(result.content, (error: IErrorObject, result: any) => {
					this.stripeService.isCustomer((error: IErrorObject, is_customer: boolean) => {
						if (!error) {
							this.isCustomer = is_customer;
							this.draw((error: IErrorObject, cards: object[] | null): void => {
							});
						} else {
								this.errorBar(error);
						}
					});
					this.Progress(false);
				})
			}
		});

		dialog.afterClosed().subscribe((result: any): void => {
			if (result) {
				this.Complete("", result);
			}
		});

	}

	/**
	 * アップデートダイアログ
	 * @param id ターゲット
	 */
	public updateCustomerDialog(): void {

		this.stripeService.retrieveCustomer((error: IErrorObject, result: any) => {
			if (!error) {

				const dialog: MatDialogRef<any> = this.matDialog.open(StripeCustomerUpdateDialogComponent, {
					width: "50%",
					minWidth: "320px",
					height: "fit-content",
					data: {content: result.sources.updateable},
					disableClose: true,
				});

				dialog.beforeClosed().subscribe((result: any): void => {
					if (result) { // if not cancel then
						this.Progress(true);
						this.stripeService.updateCustomer(result.content, (error: IErrorObject, result: any) => {
							if (!error) {
								this.draw((error: IErrorObject, cards: object[] | null): void => {
								});
							}
							this.Progress(false);
						})
					}
				});

				dialog.afterClosed().subscribe((result: any): void => {
					if (result) {
						this.Complete("", result);
					}
				});
			} else {
				this.errorBar(error);
				this.Complete("error", error);
			}
		})
	}

	/**
	 * 削除
	 */
	public onDeleteCustomer(): void {
		const resultDialogContent: any = {title: "お支払いカード情報の削除", message: "お支払いカード情報を削除します。"};
		const dialog: MatDialogRef<any> = this.matDialog.open(YesNoDialogComponent, {
			width: "30%",
			minWidth: "320px",
			height: "fit-content",
			panelClass: "dark-card",
			data: {
				session: this.currentSession,
				content: resultDialogContent,
			},
			disableClose: true,
		});
		dialog.afterClosed().subscribe((result: any): void => {
			if (result) { // if not cancel then
				this.stripeService.deleteCustomer((error: IErrorObject, result: any) => {
					if (!error) {
						this.stripeService.isCustomer((error: IErrorObject, is_customer: boolean) => {
							if (!error) {
								this.isCustomer = is_customer;
								this.draw((error: IErrorObject, cards: object[] | null): void => {
								});
							} else {
								this.errorBar(error);
							}
						});
					} else {
							this.errorBar(error);
					}
				})
			}
		});
	}

	/**
	 */
	public subscribe():void {

		const charge = {
			amount: 1,
			currency: "jpy",
			description: "",
			capture: true
		}

		this.Progress(true);
		this.stripeService.subscribe(charge, (error: IErrorObject, result: any) => {
			if (!error) {
				this.draw((error: IErrorObject, cards: object[] | null): void => {
					if (!error) {

						const dialog: MatDialogRef<any> = this.matDialog.open(CompleteDialogComponent, {
							width: "50%",
							minWidth: "320px",
							height: "fit-content",
							panelClass: "dark-card",
							data: {content: {title: "", message: "入会完了しました"}},
							disableClose: true,
						});

						dialog.beforeClosed().subscribe((result: any): void => {
							this.changeDetectorRef.detectChanges();
							location.reload();
						});

						dialog.afterClosed().subscribe((result: any): void => {
							if (result) {
								this.Complete("", result);
							}
						});

						this.Progress(false);
					} else {
						this.Progress(false);
						this.errorBar(error);
					}
				});
			} else {
				this.Progress(false);
				this.errorBar(error);
			}
		})
	}

	/**
	 */
	public unSubscribe(): void {
		this.stripeService.retrieveCustomer((error: IErrorObject, result: any) => {
			if (!error) {
				result.sources.updateable.description = "";
				const dialog: MatDialogRef<any> = this.matDialog.open(StripeWithdrawalDialogComponent, {
					width: "50%",
					minWidth: "320px",
					height: "fit-content",
					panelClass: "dark-card",
					data: {content: result.sources.updateable},
					disableClose: true,
				});

				dialog.beforeClosed().subscribe((result: any): void => {
					if (result) { // if not cancel then
						this.Progress(true);
						this.stripeService.cancel_subscribe((error: IErrorObject, result: any) => {
							if (!error) {
								this.draw((error: IErrorObject, cards: object[] | null): void => {
									if (!error) {
										this.changeDetectorRef.detectChanges();
										this.Progress(false);

										// dialog
										const complete: MatDialogRef<any> = this.matDialog.open(CompleteDialogComponent, {
											width: "50%",
											minWidth: "320px",
											height: "fit-content",
											panelClass: "dark-card",
											// data: {content: result.sources.updateable},
											data: {content: {title: "", message: "退会完了しました"}},

											disableClose: true,
										});

										complete.beforeClosed().subscribe((result: any): void => {
											this.changeDetectorRef.detectChanges();
											location.reload();
										});

										complete.afterClosed().subscribe((result: any): void => {
											this.Complete("", result);
										});

									} else {
										this.Progress(false);
										this.errorBar(error);
									}
								});
							} else {
								this.Progress(false);
								this.errorBar(error);
							}
						})
					}
				});

				dialog.afterClosed().subscribe((result: any): void => {
					if (result) {
						this.Complete("", result);
					}
				});
			} else {
				this.errorBar(error);
				this.Complete("error", error);
			}
		})
	}

	/**
	 */
	/*
	public charge() {

		const charge = {
			amount: 100,
			currency: "jpy",
			description: "HOGE",
			capture: false
		}

		this.Progress(true);
		this.stripeService.charge(charge, (error: IErrorObject, result: any) => {
			this.Progress(false);
			if (!error) {
				const resultDialogContent: any = {title: "Check mail", message: "Recept Mail sent."};

				const dialog: MatDialogRef<any> = this.matDialog.open(ContactInfoDialogComponent, {
					width: "30%",
					minWidth: "320px",
					height: "fit-content",
					data: {content: resultDialogContent},
					disableClose: true,
				});

				dialog.afterClosed().subscribe((result: any) => {
					if (result) {
						this.complete.emit(result);
					}
				});
			} else {
				this.errorBar(error);
			}

		})
	}

	 */

}
