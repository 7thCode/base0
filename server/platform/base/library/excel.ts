/**
 * Copyright © 2019 2020 2021 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const { workerData } = require('worker_threads');
const Excel = require('exceljs');

async function main() {
	const workbook = new Excel.Workbook();
	await workbook.xlsx.readFile(workerData);
	const sheets = workbook.worksheets;
	const dobCol = sheets[1].getColumn(3);
	const a = sheets[1].getCell('C3').value  // = sheets[1].getCell('C3').value;
	await workbook.xlsx.writeFile(workerData);

	console.log(workerData);
}


main();


