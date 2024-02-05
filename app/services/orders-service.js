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

  async create(data) {
    // Destructuracion de objetos
    const { total } = data;
    let lastOrderNumber = 0;

    if (this.purchaseOrders) {
      const lastOrderName = this.purchaseOrders[this.purchaseOrders.length - 1].name;

      lastOrderNumber = parseInt(lastOrderName.split(' ')[1], 10);
    }

    const newOrder = {
      id: faker.string.nanoid(4),
      name: 'Orden: ' + (lastOrderNumber + 1),
      total,
    }

    this.purchaseOrders.push(newOrder);
    return newOrder;

  }

  async find() {
    return this.purchaseOrders;
  }

  async findOne(id) {
    return this.purchaseOrders.find(order => order.id == id);
  }

  async update(id, changes) {

    const index = this.purchaseOrders.findIndex(order => order.id == id);

    if (index === -1) {
      throw new Error('Order not found');
    }

    const order = this.purchaseOrders[index];
    this.purchaseOrders[index] = {
      ...order,
      ...changes,
    }

    return this.purchaseOrders[index];

  }

  async delete(id) {
    const index = this.purchaseOrders.findIndex(order => order.id == id);

    if (index === -1) {
      throw new Error('Order not found');
    }

    this.purchaseOrders.splice(index, 1);
    return id;
  }
}

module.exports = OrdersService;
