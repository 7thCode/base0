/**
 * Copyright © 2020 2021 2022 7thCode.  All Rights Reserved.
 * see license.txt
 */

import {
	IArticleModelContent,
	IQueryOption,
} from "../platform/universe";
import {IParagraphModelContent} from "./universe";

import {
	IUpdatableModel,
} from "../platform/server";

export interface ISequenceModel extends IUpdatableModel {
	create: Date;
	modify: Date;
	user_id: string;
	enabled: boolean;
	content: IArticleModelContent;

	publish_find(query: object, option: IQueryOption): Promise<any>;

	publish_count(query: object): Promise<any>;

	publish_find_by_id(id: string): Promise<any>;
}


export interface IGuestContent {
	auth: number;
	enabled: boolean;
	mails: any;
	nickname: string;
	id: string;
	description: any;
	gender: number;
//	address: string;
	tel: string;
//	language: string;
//	religion: string;
	age: number;
// 	billing: {
// 		type: string,
// 		credit: number,
// 		from: any
// 	}
}

/*
export interface IShotContainer {
	name: string;
	group_id: string,
	platform: {
		scope: number,
		description: object,
		files: object;
	};
	sm: string;
	prizm: object;
}
*/

export interface IShotView {
	_id: any;
// 	group_id: string;
	name: string;
	platform: {
		type: number;
		_public: boolean;
		scope:number;
		username: string;
		content: any;
		description: {
			club: number;
			message: string;
			score: number;
			postureScore: number;
			ballisticScore: number;
			like: boolean;
		};
		files: object;
	}
	isown: boolean;
	sm: any;
	prizm: any;
	owner: {
		auth:number;
		username: string;
		content: {
			nickname: string;
			age: number;
			gender: number;
		}
	}
}

export interface IShotRecord {
// 	group_id: string;
	name: string;
	platform: {
		type: number;
		_public: boolean;
		scope:number;
		description: {
			club: number;
			message: string;
			score: number;
		};
		files: object;
	}
	sm: any;
	prizm: any;
}

export interface IInquiryModel extends IUpdatableModel {
	create: Date;
	modify: Date;
	user_id: string;
	enabled: boolean;
	content: IParagraphModelContent;

	publish_find(query: object, option: IQueryOption): void;

	publish_count(query: object): void;

	publish_find_by_id(id: string): void;
}
