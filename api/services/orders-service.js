const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const getPoolConnection = require('../libs/postgresql-pool');

// Cuando se ejecuta el metodo estatico 'init' en el index del modelo de la DB
// Guarda la forma en la que podemos acceder a todos los modelos, ya que en el archivo que creamos para cada servicio dentro de db/models definimos un modelName en la config que estamos exportando
const { models } = require('./../libs/sequilize');

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
/*     const query = `SELECT * FROM ${table}`;
    const res = await this.pool.query(query);
    return res.rows; */

    // Sequelize Connection
    const rta = models.Order.findAll({
      include:[
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    return rta;

  }

  async create(data) {
    // Destructuracion de objetos
    const { total, customerId } = data;
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
      customerId,
    }

    // --- Local insertion to array generated in constructor
    // this.purchaseOrders.push(newOrder);

    // -- Pool Connection
/*     const query = `INSERT INTO ${table} (id, name, total) VALUES ('${newOrder.id}', '${newOrder.name}', ${newOrder.total});`;
    await this.pool.query(query);
    return newOrder; */

    // --- Sequelize Connection
    const orderCreated = await models.Order.create(newOrder);
    return orderCreated;

  }

  // Funcion de tabla orders-products para agregar productos a la orden
  // PENDIENTE:
  // Logica para calcular el total dependiendo de los productos que se vayan agregando
  async createItem(data) {
       // Destructuracion de objetos
       const { orderId, productId, amount } = data;

       const newItem = {
         id: faker.string.nanoid(4),
         orderId,
         productId,
         amount
       }

       // --- Sequelize Connection
       const itemCreated = await models.OrdersProducts.create(newItem);
       return itemCreated;
  }


  async findOne(id) {
    // --- Local results generated in constructor
    // return this.purchaseOrders.find(order => order.id == id);

    // --- Pool Connection
/*     const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
    const res = await this.pool.query(query);
    return res.rows; */

    // --- Sequelize Connection
    const order = await models.Order.findByPk(id, );
    if (!order) {
      throw boom.notFound('Order not found.');
    }
    return order;

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

    // --- Pool Connection
/*     const datasUpdate = [];
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
    }; */

    // --- Sequelize Connection
    const order = await this.findOne(id, {include:[
      {
        association: 'customer',
        include: ['user']
      },
      'items'
    ]});

    // Si la orden fue encontrada, then
    const datasUpdate = [];
    const setQuery = [];

    // -> [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
    Object.entries(changes).forEach((entrie, index) => {
      setQuery.push(entrie[0] + ` = $${index + 1}`);
      datasUpdate.push(entrie[1]);
    });

    // Query
    await order.update(changes);

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

    // --- Pool Connection
/*     const query = `DELETE FROM ${table} WHERE id = '${id}'`;
    await this.pool.query(query);
    return { id }; */

    // --- Sequelize Connection
    const order = await this.findOne(id);
    await order.destroy();
    return { id };

  }

}

module.exports = OrdersService;
