/**
 * Copyright © 2020 2021 2022 7thCode.  All Rights Reserved.
 * see license.txt
 */

import {IContent} from "../platform/universe";

export enum AuthLevel {
	system = 1,
	manager = 100,
	user = 200,
	public = 100000,
}

export interface IInquiryModelContent {
	id: any,
	username: string;
	category: string;
	status: number;
	question: string,
	answer: string,
}

export interface IParagraphModelContent extends IContent {
	name: string;
	value: string;
	accessory: {};
}

export interface IGuestPublic {
	username: string;
	user_id: string;
	auth: number;
	category: string;
	status: number;
	type: string;
	enabled: boolean;
	subscription: string;
}

export interface IGuestUserToken {
	auth: number;
	username: string;
	password: string;
	category: string,
	type: string,
	origin:string,
	content: {};
	target: string;
	timestamp: any;
}

export interface ISequenceModelContent extends IContent {
	name: string;
	value: {};
	accessory: {};
}

