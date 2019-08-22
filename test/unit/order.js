'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let proxyquire = require('proxyquire').noCallThru();

let MailService = require('../../lib/mail');

let fakeSendFuncCall = sinon.fake();

class MailServiceMock extends MailService {
	send() {
		fakeSendFuncCall();
	}
}

let Order = proxyquire('../../lib/order', {
	'./mail': MailServiceMock
});

describe('order', () => {
	context('place', () => {
		
		it('should notify customer', () => {
			let order = new Order();
			order.setAmount(9.99);
			order.place();

			expect(fakeSendFuncCall.called).to.be.true;
		});

		it('should call mailService->send after successful payment', () => {
			let order = new Order();
			let spy = sinon.spy(order,'settlePayment');

			order.setAmount(9.99);
			order.place();

			expect(fakeSendFuncCall.calledAfter(spy)).to.be.true;
		});

		it('should get the same value as it was set', () => {
			let order = new Order();
			let spy = sinon.spy(order,'getAmount');

			order.setAmount(9.99);
			order.place();

			expect(spy.returnValues[0]).to.be.equal(9.99);
		});

		it('should call and settle payment', () => {
			let order = new Order();
			order.setAmount(10.99);

			let mock = sinon.mock(order);
			mock.expects('settlePayment').once().withArgs(10.99).returns(true);

			let result = order.place();

			mock.verify();
			expect(result).to.be.true;
		});

		it('should throw exception if payment does not go through', () => { 
			var order = new Order();

			order.setAmount(9.99);
			sinon.stub(order,'settlePayment').returns(false);

 			expect(order.place.bind(order)).to.throw();
		});
	});
})