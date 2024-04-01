const { faker } = require('@faker-js/faker');

const getPoolConnection = require('../libs/postgresql-pool');

// Cuando se ejecuta el metodo estatico 'init' en el index del modelo de la DB
// Guarda la forma en la que podemos acceder a todos los modelos, ya que en el archivo que creamos para cada servicio dentro de db/models definimos un modelName en la config que estamos exportando
const { models } = require('./../libs/sequilize');

const table = 'categories';

// CRUD para la entidad Categories desde la logica de negocio
class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
    this.pool = getPoolConnection;
    this.pool.on('error', (err) => console.error(err));
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

    // --- Local results generated in constructor
    // this.categories.push(newCategory);

    const query = `INSERT INTO categories (id, name) VALUES ('${newCategory.id}', '${newCategory.name}');`;
    await this.pool.query(query);

    return newCategory;

  }

  async find() {
    // --- Local results generated in constructor
    // return this.categories;

    // Pool Connection
/*     const query = `SELECT * FROM ${table};`;
    const res = await this.pool.query(query);
    return res.rows; */

    // Sequelize Connection
    const rta = models.Category.findAll();
    return rta;
  }

  async findOne(id) {
    // --- Local results generated in constructor
    // return this.categories.find(category => category.id == id);

    const query = `SELECT * FROM ${table} WHERE id = '${id}';`;
    const res = await this.pool.query(query);
    return res.rows;
  }

  async update(id, changes) {

    // --- Local Update made on the static array
/*     const index = this.categories.findIndex(category => category.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    // This avoids overwritting and just apply the new changes
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }

    return this.categories[index]; */

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
/*     const index = this.categories.findIndex(category => category.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(index, 1);
    return id; */

    const query = `DELETE FROM ${table} WHERE id = '${id}'`;
    await this.pool.query(query);
    return { id };

  }

}

module.exports = CategoriesService;
