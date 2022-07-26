/**
 * Copyright © 2019 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {FlexLayoutModule} from "@angular/flex-layout";

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";

import {BaseModule} from "../../platform/base/base.module";

import {StripeComponent} from "./stripe.component";
import {StripeCardCreateDialogComponent} from "./stripe-card-create-dialog/stripe-card-create-dialog.component";

import {SessionService} from "../../platform/base/services/session.service";
import {StripeService} from "./stripe.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CompleteDialogComponent} from "./complete-dialog/complete-dialog.component";
import {StripeCustomerUpdateDialogComponent} from "./stripe-customer-update-dialog/stripe-customer-update-dialog.component";
import {StripeWithdrawalDialogComponent} from "./stripe-withdrawal-dialog/stripe-withdrawal-dialog.component";
import {StripeCustomerUpdateDialogDirective} from "./stripe-customer-update-dialog/stripe-customer-update-dialog.directive";
import {StripeWithdrawalDialogDirective} from "./stripe-withdrawal-dialog/stripe-withdrawal-dialog.directive";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
	declarations: [
		StripeComponent,
		StripeCardCreateDialogComponent,

		CompleteDialogComponent,
		StripeCustomerUpdateDialogComponent,
		StripeCustomerUpdateDialogDirective,
		StripeWithdrawalDialogComponent,
		StripeWithdrawalDialogDirective
	],
	providers: [
		SessionService,
		StripeService,
	],
	imports: [
		CommonModule,
		FormsModule,

		FlexLayoutModule,

		MatDialogModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatPaginatorModule,
		MatGridListModule,
		MatTooltipModule,

		BaseModule,
		MatCheckboxModule,

	],
	exports: [
		StripeComponent,
	],
	bootstrap: [
		StripeCardCreateDialogComponent,
	],
})

export class StripeModule {
}
