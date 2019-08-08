'use strict';

let chai = require('chai');
let assert = chai.assert;

describe('paging', function () {
	it ('should return an array', function () {
		let paging = require('../../lib/paging');

		let pagingResults = paging(100, 10, 1);

		//
		assert.isArray(pagingResults);
	});

	it ('should contain correct keys', function () {
		let paging = require('../../lib/paging');

		let pagingResults = paging(100, 10, 1);

		//
		assert.hasAllKeys(pagingResults[0], ['label', 'href']);
	});

	it ('should generate 10 pagings with current equal to 1', function () {
		let paging = require('../../lib/paging');

		let pagingResults = spy(100, 10, 1);
	});
});