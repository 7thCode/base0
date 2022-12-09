/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {Component, Inject, OnInit} from "@angular/core";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseDialogComponent} from "../../../platform/base/components/base-dialog.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: "complete-dialog",
	styleUrls: ["./complete-dialog.component.css"],
	templateUrl: "./complete-dialog.component.html",
})

/**
 *
 *
 * @since 0.01
 */
export class CompleteDialogComponent extends BaseDialogComponent implements OnInit {

	get content(): any {
		return this.data.content;
	}

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: any,
		public matDialogRef: MatDialogRef<CompleteDialogComponent>,
		public translate: TranslateService
	) {
		super();

		if (!this.data.content.ok_button) {
			this.data.content.ok_button = "削除"
		}

		if (!this.data.content.cancel_button) {
			this.data.content.cancel_button = "閉じる"
		}
	}

	public ngOnInit(): void {

	}

	public cancel(): void {
		this.matDialogRef.close(null);
	}

	public onAccept(): void {
		this.matDialogRef.close(this.data);
	}

}
