const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// CRUD para la entidad Producto desde la logica de negocio
class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.nanoid(4),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {

    const { name, price, image } = data;

    const newProduct = {
      id: faker.string.nanoid(4),
      name,
      price,
      image,
    }

    this.products.push(newProduct);
    return newProduct;

  }

  find() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000);
    });

  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlocked) {
      throw boom.conflict('product is blocked');
    }

    return product;
  }

  async update(id, changes) {

    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      // throw new Error('Product not found')
      throw boom.notFound('product not found'); // Manejo de errores con boom
    }

    // This avoids overwritting and just apply the new changes
    const product = this.products[index];
     this.products[index] = {
      ...product,
      ...changes
     };

    return this.products[index];

  }

  async delete(id) {

    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw boom.notFound('product not found');
    }

    this.products.splice(index, 1);
    return { id };

  }

}

module.exports = ProductsService;
