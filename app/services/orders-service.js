const { faker } = require('@faker-js/faker');

class OrdersService {

  constructor() {
    this.purchaseOrders = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 1; i <= limit; i++) {
      this.purchaseOrders.push({
        id: faker.string.nanoid(4),
        name: `Order ${i}`,
        total: faker.commerce.price(),
      })
    }
  }

  create() {}

  find() {
    return this.purchaseOrders;
  }

  findOne(id) {
    return this.purchaseOrders.find(order => order.id == id);
  }

  update() {}

  delete() {}
}

module.exports = OrdersService;
