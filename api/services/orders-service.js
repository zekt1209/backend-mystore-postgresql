const { faker } = require('@faker-js/faker');
const getPoolConnection = require('../libs/postgresql-pool');

const table = 'purchase_orders';

class OrdersService {

  constructor() {
    this.purchaseOrders = [];
    this.generate();
    this.pool = getPoolConnection;
    this.pool.on('error', (err) => console.error(err));
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

  async find() {
    // --- Local results generated in constructor
    // return this.purchaseOrders;

    // Pool Connection
    const query = `SELECT * FROM ${table}`;
    const res = await this.pool.query(query);
    return res.rows;

  }

  async create(data) {
    // Destructuracion de objetos
    const { total } = data;
    let lastOrderNumber = 0;

    // if (this.purchaseOrders) {
    //   const lastOrderName = this.purchaseOrders[this.purchaseOrders.length - 1].name;

    //   lastOrderNumber = parseInt(lastOrderName.split(' ')[1], 10);
    // }

    // Pool Connection

    // *** Sacamos el ultimo numero de Orden para insertar siempre la ultima ***

    const existingOrders = await this.find();

      // Cuando el haya contenido en los registros de la DB
    if (existingOrders.length != 0) {

      // Aqui guardaremos TODOS los numeros de ordenes
      const orderNumbers = [];

      // Sacamos TODOS los numeros de ordenes para ordenarlos
      existingOrders.forEach(element => {

        // [
        //   { id: '_QHg', name: 'Orden: 1', total: 300 },
        //   { id: '_hWk', name: 'Orden: 4', total: 50 },
        //   { id: 'ngZB', name: 'Orden: 3', total: 950 }
        // ]

        // Accedemos al atributo name y insertamos solo el numero de orden
        orderNumbers.push(element.name.split(' ')[1]);
      }); // -> [1,3,2,4]

      // Ordenamos los numeros de Ordenes de compra por si estan desordenados
      const sortedOrderNumbers = orderNumbers.sort();

      // Tomamos el ultimo numero de Orden para insertar una nueva con el ultimo numero de orden + 1
      lastOrderNumber = parseInt(sortedOrderNumbers[sortedOrderNumbers.length -1]);

    }

    const newOrder = {
      id: faker.string.nanoid(4),
      name: 'Orden: ' + (lastOrderNumber + 1),
      total,
    }

    // --- Local insertion to array generated in constructor
    // this.purchaseOrders.push(newOrder);

    const query = `INSERT INTO ${table} (id, name, total) VALUES ('${newOrder.id}', '${newOrder.name}', ${newOrder.total});`;
    await this.pool.query(query);

    return newOrder;

  }


  async findOne(id) {
    // --- Local results generated in constructor
    // return this.purchaseOrders.find(order => order.id == id);

    // Pool Connection
    const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
    const res = await this.pool.query(query);
    return res.rows;

  }

  async update(id, changes) {

    // --- Local Update made on the static array
/*     const index = this.purchaseOrders.findIndex(order => order.id == id);

    if (index === -1) {
      throw new Error('Order not found');
    }

    const order = this.purchaseOrders[index];
    this.purchaseOrders[index] = {
      ...order,
      ...changes,
    }

    return this.purchaseOrders[index]; */

    // Pool Connection
    const datasUpdate = [];
    const setQuery = [];

    // -> [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
    Object.entries(changes).forEach((entrie, index) => {
      setQuery.push(entrie[0] + ` = $${index + 1}`);
      datasUpdate.push(entrie[1]);
    });

    // const query = `UPDATE users SET column1 = value1, column2 = value2, ... WHERE id = ${id};`
    const query = `UPDATE ${table} SET ${setQuery.join(", ")} WHERE id = '${id}';`;

    await this.pool.query(query, datasUpdate)

    return {
      id,
      ...changes,
    };

  }

  async delete(id) {

    // --- Local deletion on static array
/*     const index = this.purchaseOrders.findIndex(order => order.id == id);

    if (index === -1) {
      throw new Error('Order not found');
    }

    this.purchaseOrders.splice(index, 1);
    return id; */

    // Pool Connection
    const query = `DELETE FROM ${table} WHERE id = '${id}'`;
    await this.pool.query(query);
    return { id };

  }

}

module.exports = OrdersService;
