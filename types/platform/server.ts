/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

import {Callback, IAccountPublic, IArticleModelContent, IErrorObject, IPageModelContent, IQueryOption, IRights, IRole, IVaultModelContent,} from "./universe";
import mongoose from "mongoose";

export interface IMailSender {
	from: any;
	to: string;
	bcc: string;
	subject: string;
	html: string;
	text: string;
}

export interface IMailSenderModule {
	send(mailAddress: string, bccAddress: string, title: string, text: string, html: string, callback: (error: IErrorObject) => void): void;
}

export interface IMailReceiverModule {

	connect(callback: (error: IErrorObject, imap: any, type: string, message: any) => void): void;

	open(imap: any, name: string, callback: (error: IErrorObject, message: any) => void): void;

	close(imap: any): void;

	listMessages(imap: any, start: number, limit: number, callback: (error: IErrorObject, messages: any) => void): void;

	getMessage(imap: any, UID: string, callback: (error: IErrorObject, mail: any) => void): void;

	deleteMessage(imap: any, UID: string, callback: (error: IErrorObject) => void): void;

	addFlags(imap: any, UID: string, flags: string[], callback: (error: IErrorObject) => void): void;

	removeFlags(imap: any, UID: string, flags: string[], callback: (error: IErrorObject) => void): void;

}

export interface IAccountModel {
	create: Date;
	modify: Date;
	provider: string;
	auth: number;
	user_id: mongoose.Types.ObjectId;
	username: string;
	password: string;
	privatekey: string;
	publickey: string;
	enabled: boolean;
	login: boolean;
	category: string;
	status: number;
	type: string;
	secret: string;
	content: any;
	entry: string;
	exit: string;
	data: any;

	public(): IAccountPublic;

	save(): void;

	mail(): string;

	get_status(): number;

	set_status(status: any): void;

	Role(user: IAccountModel): IRole;

	default_find_by_id(user: IAccountModel, id: string): Promise<any>;

	default_find_by_name(user: IAccountModel, name: string): Promise<any>;

	default_find(user: IAccountModel, query: object, option: IQueryOption): Promise<any>;

	set_by_name(user: IAccountModel, name: string, setter: any): Promise<any>;

	remove_by_id(user: IAccountModel, name: string): Promise<any>;

	publish_find(query: object, option: IQueryOption): Promise<any>;

	publish_count(query: object): Promise<any>;

	publish_find_by_id(id: any): Promise<any>;
}

export interface IAccountContent {
	auth: number;
	enabled: boolean;
	mails: any;
	nickname: string;
	id: string;
	description: any;
}

export interface IUsernameParam {
	username: string;
}

export interface IUserIDParam {
	user_id: mongoose.Types.ObjectId;
}

export interface IUpdatableModel {

	public(): any;

	_create(user: IAccountModel, body: any, cb: Callback<any>): void;

	save(): void;

	set_rights(user: IAccountModel, id: string, rights: IRights): Promise<any>;

	update_by_id(user: IAccountModel, id: string, body: any): Promise<any>;

	set_by_id(user: IAccountModel, id: string, setter: any): Promise<any>;

	remove_by_id(user: IAccountModel, id: string): Promise<any>;

	default_find_by_id(user: IAccountModel, id: string): Promise<any>;

	default_find(user: IAccountModel, query: object, option: IQueryOption): Promise<any>;

	default_count(user: IAccountModel, query: object): Promise<any>;
}

export interface ISecureUpdatableModel {

	public(key: string): any;

	_create(user: IAccountModel, key: string, body: any, cb: Callback<any>): void;

	save(): void;

	set_rights(user: IAccountModel, id: string, rights: IRights): Promise<any>;

	update_by_id(user: IAccountModel, key: string, id: string, body: any): Promise<any>;

	set_by_id(user: IAccountModel, id: string, setter: any): Promise<any>;

	remove_by_id(user: IAccountModel, id: string): Promise<any>;

	default_find_by_id(user: IAccountModel, id: string): Promise<any>;

	default_find(user: IAccountModel, query: object, option: IQueryOption): Promise<any>;

	default_count(user: IAccountModel, query: object): Promise<any>;
}

export interface IPublishModel {

	save(): void;

	public(): any;

	default_find(user: IAccountModel, query: object, option: IQueryOption): Promise<any>;

	default_count(user: IAccountModel, query: object): Promise<any>;

	default_find_by_id(user: IAccountModel, id: string): Promise<any>;

	update_by_id(user: IAccountModel, id: string, body: any): Promise<any>;

	remove_by_id(user: IAccountModel, id: string): Promise<any>;
}

export interface IArticleModel extends IUpdatableModel {
	create: Date;
	modify: Date;
	user_id: string;
	enabled: boolean;
	content: IArticleModelContent;

	publish_find(query: object, option: IQueryOption): Promise<any>;

	publish_count(query: object): Promise<any>;

	publish_find_by_id(id: string): Promise<any>;
}

export interface IPageModel extends IUpdatableModel {
	create: Date;
	modify: Date;
	user_id: string;
	content: IPageModelContent;

	get_page(user_id: string, path: string, object: any, cb: (error: IErrorObject, doc: any, mimetype: string) => void): void;

	publish_find(query: object, option: IQueryOption): Promise<any>;

	publish_count(query: object): Promise<any>;

	publish_find_by_id(id: any): Promise<any>;
}

export interface IVaultModel {
	create: Date;
	modify: Date;
	user_id: string;
	content: IVaultModelContent;

	publish_find(query: object, option: IQueryOption): void;

	publish_count(query: object): void;

	publish_find_by_id(id: string): void;
}

export interface IQueryParam {
	query: object;
	option: object;
}

export interface IQueryRequest {
	params: IQueryParam;
	user: object;
}

export interface IDParam {
	id: string;
}

export interface IGetByIDRequest {
	params: IDParam;
	user: object;
}

export interface IAccountRequest<CONTENT> {
	params: IUsernameParam & IUserIDParam;
	user: object;
	body?: {content: CONTENT, type: string};
}

export interface IPutRequest<CONTENT> {
	params: IDParam;
	user: object;
	body: CONTENT;
}

export interface IPostRequest<CONTENT> {
	user: object;
	body: CONTENT;
}

export interface IDeleteRequest {
	params: IDParam;
	user: object;
}

export interface IUserIDRequest<PARAMS> {
	user: { user_id: string };
	params: PARAMS;
}

export interface ISecureContent {
	content: { value: string };
}

// Auth

export interface ILoginRequest {
	params: {
		token: string;
	};
	user: object;
	body: {
		username: string;
		password: string;
		content: string
	};

	login(user: object, callback: (error: IErrorObject) => void): void;
}

export interface IContentRequest {
	body: {
		content: string;
	};
	params: any;
	user: any;

	login(user: object, callback: (error: IErrorObject) => void): void;

	logout(): void;
}

export interface IUserRequest {
	user: {
		id: string;
		username: string;
		displayName: string;
	};
}

export interface IRedirectResponse {
	redirect(target: string): void;

	status(status: number): any;
}

export interface IJSONResponse {
	header(name: string, mime: string): void;

	type(type: string): void;

	jsonp(result: object): void;

	send(result: string): void;

	status(status: number): any;

	redirect(target:string): void;
}

// File

export interface ICategorize {
	url: string;
	category: string;
}

export interface IGetFile {
	params: string[];
	user: object;
}

export interface IPostFile {
	params: string[];
	user: object;
	body: ICategorize;
}

export interface IDeleteFile {
	params: string[];
	user: object;
}


export interface IFacebookUser {
	id: string;
	name: {
		familyName: string;
		givenName: string;
	};
	emails: { value: string }[];
	provider: string;
}

export interface IResult {
	code: number;
	message: string;
	value: any;
}
