'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let proxyquire = require('proxyquire').noCallThru();

let MailService = require('../../lib/mail');

let sendSpy = sinon.spy();

class MailServiceMock extends MailService {
	send() {
		sendSpy();
	}
}

let Order = proxyquire('../../lib/order', {
	'./mail': MailServiceMock
});

describe('order', function () {
	context('place', function () {
		
		it('should notify customer', function () {
			let order = new Order();
			order.setAmount(9.99);
			order.place();

			expect(sendSpy.called).to.be.true;
		});

		it('should call and settle payment', function () {
			let order = new Order();
			order.setAmount(10.99);

			let mock = sinon.mock(order);
			mock.expects('settlePayment').once().withArgs(10.99).returns(true);

			let result = order.place();

			mock.verify();
			expect(result).to.be.true;
		});

		it('should throw exception if payment does not go through', function () { 
			var order = new Order();

			order.setAmount(9.99);
			sinon.stub(order,'settlePayment').returns(false);

 			expect(order.place.bind(order)).to.throw();
		});
	});
})