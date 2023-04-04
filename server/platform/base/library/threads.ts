/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const {Worker, isMainThread, workerData} = require('worker_threads');
const sem = require('semaphore')(1);

/**
 * Threads
 */
export abstract class BaseThreads {

	private maxWorkers: number;
	private fileName: string;
	private workers: any[];

	constructor(filename: string, maxWorkers: number) {
		this.maxWorkers = maxWorkers;
		this.fileName = filename;
		this.workers = [];
	}

	public count(): number {
		let result: number = 0;
		sem.take(() => {
			result = this.workers.length;
			sem.leave();
		});
		return result;
	}

	public exec(data: any): boolean {
		let result = false;
		sem.take(() => {
			if (this.workers.length < this.maxWorkers) {
				const worker = new Worker(this.fileName, {workerData: data});

				worker.on('online', (code: number): void => {
					this.execHandler(worker, this.workers.length);
				});

				worker.on('exit', (code: number): void => {
					this.remove(worker);
					this.exitHandler(worker, this.workers.length);
				});

				worker.on('error', (error: any): void => {
					this.errorHandler(worker, error);
				});

				this.workers.push(worker);
				result = true;
			}
			sem.leave();
		});
		return result;
	}

	public remove(worker: any): void {
		sem.take(() => {
			this.workers.splice(this.workers.findIndex((foundWoker: any): boolean => {
				return foundWoker.threadId === worker.threadId;
			}), 1);
			sem.leave();
		});
	}

	abstract execHandler(worker: any, count: number): void;
	abstract exitHandler(worker: any, count: number): void;
	abstract errorHandler(worker: any, error: any): void;

}

export class Threads extends BaseThreads {

	public execHandler(worker: any, count: number): void {
		console.log('exec ' + count);
	}

	public exitHandler(worker: any, count: number): void {
		console.log('exit ' + count);
	}

	public errorHandler(worker: any, error: any): void {
		console.log('error');
	}

}


const threads = new Threads('/Users/oda/project/...../server/platform/base/library/excel.js', 4);

console.log(threads.exec('/Users/oda/project/...../例1.xlsx'));
