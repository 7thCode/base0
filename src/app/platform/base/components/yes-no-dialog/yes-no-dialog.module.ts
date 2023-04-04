/**
 * Copyright (c) 2019 2020 2021 2022 AIGIA. All Rights Reserved.
 * see license.txt
 */

"use strict";

import {NgModule} from "@angular/core";

import {YesNoDialogComponent} from "./yes-no-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";

@NgModule({
	declarations: [
		YesNoDialogComponent,
	],
	imports: [
		CommonModule,

		FlexLayoutModule,
		MatCardModule,
		MatDialogModule,
		MatButtonModule
	],
	providers: [],
	exports: [
		YesNoDialogComponent,
	],
	bootstrap: [
		YesNoDialogComponent
	],
})

export class YesNoDialogModule {

}
