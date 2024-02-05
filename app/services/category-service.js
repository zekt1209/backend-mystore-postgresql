const { faker } = require('@faker-js/faker');

// CRUD para la entidad Categories desde la logica de negocio
class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 15;

    for (let i = 0; i < limit; i++) {
      this.categories.push ({
        id: faker.string.nanoid(4),
        name: faker.commerce.productAdjective(),
      });
    }
  }

  create() {}

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(category => category.id == id);
  }

  update() {}

  delete() {}

}

module.exports = CategoriesService;
