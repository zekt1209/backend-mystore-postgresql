const { faker } = require('@faker-js/faker');

// CRUD para la entidad Producto desde la logica de negocio
class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.nanoid(4),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }

  create(data) {

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
    return this.products;
  }

  findOne(id) {
    return this.products.find(product => product.id === id);
  }

  update() {}
  delete() {}

}

module.exports = ProductsService;
