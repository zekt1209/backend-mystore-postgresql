const { faker } = require('@faker-js/faker');
const { models } = require('./../libs/sequilize');
const boom = require('@hapi/boom');
const { User } = require('../db/models/user.model');

const table = 'customers';

class CustomerService {

  constructor() {

  }

  async create(data) {

    const {name, lastName, phone} = data;

    const newCustomer = {
      id: faker.string.nanoid(4),
      name,
      lastName,
      phone
    }

    const customerCreated = await models.Customer.create(newCustomer);
    return customerCreated;

  }

  async find() {
    const rta = await models.Customer.findAll();
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      console.log(boom.notFound('BoomError from Logica de negocio: Customer not found'));
    }

    return customer;
  }

  async update(id, changes) {

    const customer = await this.findOne(id);
    await customer.update(changes);

    return {
      id,
      ...changes,
    }

  }

  async delete(id) {

    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };

  }

}

module.exports = CustomerService;
