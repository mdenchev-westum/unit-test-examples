'use strict';

const chai = require('chai');
const assert = chai.assert;

let sinon =require('sinon');

const paging = require('../../lib/paging');

class Database {
	constructor() {
		console.log('do some fancy init to the database');
	}
	save(object, callback) {
		console.log('Do the actual saving to database');
		setTimeout(function() {
			callback('OK');
		}, 2000);
	}
}

class Product {

}

describe('paging', function () {

	it('should return an array', function () {
		
		let result = paging(100, 10, 2);

		assert.isArray(result, "is it an array");
	});

	it('should contain the proper keys', function () {
		const paging = require('../../lib/paging');

		let result = paging(100, 10, 1);

		let firstItem = result[0];

		assert.hasAllKeys(firstItem, ['label', 'href']);
	});

	it('should return 5 pages when we have 100 itesm and 20 items per page', function() {
		const paging = require('../../lib/paging');

		let result = paging(100, 20, 1);

		assert.equal(result.length, 5);
	});



});