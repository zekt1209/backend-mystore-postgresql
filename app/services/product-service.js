const { faker } = require('@faker-js/faker');

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
    const name = this.getTotal();
    return this.products.find(product => product.id === id);
  }

  async update(id, changes) {

    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error('Product not found')
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
      throw new Error('Product not found');
    }

    this.products.splice(index, 1);
    return { id };

  }

}

module.exports = ProductsService;
