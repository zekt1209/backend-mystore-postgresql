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

  async create(data) {

    const { name } = data;

    const newCategory = {
      id: faker.string.nanoid(4),
      name,
    }

    this.categories.push(newCategory);
    return newCategory;

  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find(category => category.id == id);
  }

  async update(id, changes) {

    const index = this.categories.findIndex(category => category.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    // This avoids overwritting and just apply the new changes
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }

    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(category => category.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(index, 1);
    return id;
  }

}

module.exports = CategoriesService;
