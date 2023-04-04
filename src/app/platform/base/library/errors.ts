/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

import {IErrorObject} from "../../../../../types/platform/universe";
import {HttpErrorResponse} from "@angular/common/http";

export interface socketError {
	errno: number,
	code: string,
	syscall: string
}


/**
 *
 */
export class Errors {

	static generalError(code: number, message: string, tag: string): IErrorObject {
		return {code: code, message: message, tag: tag, origin: null};
	}

	static serverError(error: IErrorObject, tag: string): IErrorObject {
		const result: IErrorObject = error;
		switch (error.code) {
			case 1:
				result.message = "ログインしていません.";
				break;
			case 2:
				result.message = "権限がありません.";
				break;
			case 3:
				result.message = "パスワードが違うか会員が見つかりません.";
				break;
			case 4:
				result.message = "アカウントが無効です.";
				break;
			case 5:
				result.message = "既にログインしています.";
				break;
			case 6:
				result.message = "コードが違います.";
				break;
			case 7:
				result.message = "この会員は既に存在します.";
				break;
			case 8:
				result.message = "ローカルアカウントのみ可能です."
				break;
			default:
		}
		return result;
	}

	static httpError(status: number, tag: string): IErrorObject {
		/*
		let message = "";
		switch (status) {
			case 400:
				message = "Bad request";
				break;
			case 401:
				message = "Unauthorized";
				break;
			case 403:
				message = "Forbidden";
				break;
			case 405:
				message = "Method not allowed";
				break;
			case 408:
				message = "Request timeout";
				break;
			case 413:
				message = "Payload too large";
				break;
			case 414:
				message = "URI too long";
				break;
			case 460:
				message = "";
				break;
			case 463:
				message = "";
				break;
			case 464:
				message = "";
				break;
			case 500:
				message = "Internal server error";
				break;
			case 501:
				message = "Not implemented";
				break;
			case 502:
				message = "Bad gateway";
				break;
			case 503:
				message = "Service Unavailable";
				break;
			case 504:
				message = "Gateway Timeout";
				break;
			case 505:
				message = "バージョンはサポートされていません";
				break;
			case 561:
				message = "Unauthorized";
				break;
			default:
		}
		*/
		return {code: status, message: "" + status, tag: tag, origin: null};
	}

	static socketError(error: HttpErrorResponse, tag: string): IErrorObject {
		/*
		let message = "不明なエラー";
		if (error.constructor.name === "Error") {
			switch (error.code) {
				case "ECONNREFUSED":
					message = "リモートアドレスが見つかりませんでした。";
					break;
				case "ECONNRESET":
					message = "接続が切断されました。";
					break;
				case "EACCES":
					message = "ソケットへの書き込み許可がありません。";
					break;
				case "EPERM":
					message = "ソケットのブロードキャストフラグが有効になっていないのにブロードキャストへ接続を試みました。または、ローカルのファイアウォールの規則により接続の要求が失敗しました。";
					break;
				case "EADDRINUSE":
					message = "ローカルアドレスが既に使用されています。";
					break;
				case "EADDRNOTAVAIL":
					message = "sockfdが参照するソケットがそれ以前にアドレスにバインドされておらず、そのソケットに一時ポートをバインドしようとした際に、一時ポートとして使用する範囲のポート番号がすべて使用中であった。";
					break;
				case "EAFNOSUPPORT":
					message = "渡されたアドレスのsa_familyフィールドが正しいアドレスファミリーではない。";
					break;
				case "EAGAIN":
					message = "非ブロッキングUNIXドメインソケットの場合、ソケットは非ブロッキングであり、接続をすぐに完了することはできません。他のソケットファミリの場合、ルーティングキャッシュに十分なエントリがありません。";
					break;
				case "EALREADY":
					message = "ソケットが非停止に設定されており、前の接続が完了していない。";
					break;
				case "EBADF":
					message = "sockfdが有効なオープンされたファイルディスクリプターでない。";
					break;
				case "EFAULT":
					message = "ソケット構造体のアドレスがユーザーのアドレス空間外にあります。";
					break;
				case "EINPROGRESS":
					message = "ソケットはブロックされておらず、接続をすぐに完了することはできません。(UNIXドメインソケットは代わりにEAGAINで失敗しました。)書き込み用のソケットを選択することにより、完了のためにselect(2)またはpoll(2)を選択できます。select(2)が書き込み可能性を示した後、getsockopt(2)を使用してレベルSOL_SOCKETのSO_ERRORオプションを読み取り、connect()が正常に完了したか（SO_ERRORがゼロ）または失敗したか（SO_ERRORはここにリストされている通常のエラーコードの1つであり、失敗の理由）。";
					break;
				case "EINTR":
					message = "捕捉されたシグナルによりシステムコールが中断された。";
					break;
				case "EISCONN":
					message = "ソケットは既に接続されています。";
					break;
				case "ENETUNREACH":
					message = "到達できないネットワークです。";
					break;
				case "ENOTSOCK":
					message = "ファイルディスクリプターがソケットを参照していません。";
					break;
				case "EPROTOTYPE":
					message = "ソケットタイプが要求された通信プロトコルではサポートされていません。";
					break;
				case "ETIMEDOUT":
					message = "接続を試みている途中で時間切れです。サーバーが混雑していて新たな接続を受け入れられないのかもしれません。";
					break;
				default    :
			}
		}
		*/
		return {code: error.error, message: error.message, tag: tag, origin: null};
	}

	static responseError(tag: string): IErrorObject {
		return {code: -100, message: "response error.", tag: tag, origin: null};
	}

	static networkError(tag: string): IErrorObject {
		return {code: -1000, message: "network error.", tag: tag, origin: null};
	}

	static networkException(error: HttpErrorResponse, tag: string): IErrorObject {
		return {code: -10000, message: error.message, tag: tag, origin: error};
	}
}
