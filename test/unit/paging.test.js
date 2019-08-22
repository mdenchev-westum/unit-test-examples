'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
var should = chai.should();
let sinon = require('sinon');

const paging = require('../../lib/paging');

describe('paging', function () {

	// describe('old tests', function () {
	// 	it('should return an array', function () {
		
	// 		let result = paging(100, 10, 2);
	
	// 		assert.isArray(result, "is it an array");
	// 	});
	
	// 	it('should contain the proper keys', function () {
	// 		const paging = require('../../lib/paging');
	
	// 		let result = paging(100, 10, 1);
	
	// 		let firstItem = result[0];
	
	// 		assert.hasAllKeys(firstItem, ['label', 'href']);
	// 	});
	
	// 	it('should return 5 pages when we have 100 itesm and 20 items per page', function() {
	// 		const paging = require('../../lib/paging');
	
	// 		let result = paging(100, 20, 1);
	
	// 		assert.equal(result.length, 5);
	// 	});
	// })

	context('check order', function() {
		// it('should have correct order on page 1', function () {
		// 	let result = paging(100, 10, 1);
			
		// 	let labels = result.map((item) => {
		// 		return item.label;
		// 	});

		// 	assert.sameOrderedMembers(labels, [1,2,3,4,9,10], 'always get 1,2,3,4,9,10 on page 1');
		// });

		it('should have correct order on page 10', function () {
			let cacheDummy = {
				put: () => {

				}
			}

			let result = paging(100, 10, 10, cacheDummy);
			
			let labels = result.map((item) => {
				return item.label;
			});

			//assert.sameOrderedMembers(labels, [1,7,8,9,10], 'always get 1,7,8,9,10 on page 10');
			expect(labels).to.have.ordered.members([1,7,8,9,10]);
			//labels.should.have.ordered.members([1,7,8,9,10]);
		});

		it('should call cache', function () {
			let cacheDummy = {
				put: () => {
					//console.log('Cache item to Redis');
				}
			}

			let spy = sinon.spy(cacheDummy, 'put');

			let result = paging(100, 10, 10, cacheDummy);

			assert.equal(spy.called, true);
		});
	});

});