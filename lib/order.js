'use strict';

const MailService = require('./mail');
const mailService = new MailService();

class Order {
	settlePayment(amount = null) {
		if (amount === null) {
			throw "Use money, punk!";
		}
		return true;
	}

	setAmount(amount) {
		this.amount = amount;
	}

	place() {
		if (this.settlePayment(this.amount)) {
			let id = parseInt(Math.random() * 10000);
			mailService.send('customer@westum.com', 'New order number ' + id, 'Content');
		} else {
			throw new TypeError("Payment cannot be settled.");
		}

		return true;
	}
}

module.exports = Order;