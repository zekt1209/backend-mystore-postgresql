const { faker } = require('@faker-js/faker');

// Conexion con la DB
const getConnection = require('../libs/postgresql');
const getPoolConnection = require('../libs/postgresql-pool');
const table = 'users';

class UsersService {


  constructor() {
    this.users = [];
    this.generate();
    this.pool = getPoolConnection;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    this.users.push({
      id: 1111,
      name: 'Victor',
      email: "victor@hotmail.com",
      role: 'FullStack Developer'
    },
    {
      id: 2222,
      name: 'Marco',
      email: "marco@hotmail.com",
      role: "BackEnd Developer"
    },
    {
      id: 3333,
      name: 'Angel',
      email: "angel@gmail.com",
      role: "Student"
    })
  }

  async create(data) {

    const { name, email, role } = data;

    const newUser = {
      id: faker.string.nanoid(4),
      name,
      email,
      role
    };

    // --- Local insertion to array generated in constructor
    // this.users.push(newUser);

    const query = `INSERT INTO ${table} (id, name, email, role) VALUES ('${newUser.id}', '${newUser.name}', '${newUser.email}', '${newUser.role}')`;
    await this.pool.query(query);

    return newUser;

  }

  async find() {
    // --- Normal Connection
    // * const client = await getConnection();
    // * const res = await client.query('SELECT * FROM tasks');
    // * return res.rows;

    // Pool Connection
    const query = `SELECT * FROM ${table}`;
    const res = await this.pool.query(query);
    return res.rows;

    // --- Local results generated in constructor
    // * return this.users;
  }

  async findOne(id) {
    const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
    const res = await this.pool.query(query);
    return res.rows;
    // return this.users.find(user => user.id == id);
  }

  async update(id, changes) {
    // --- Local Update made on the static array
/*     const index = this.users.findIndex(user => user.id == id)

    if (index === -1) {
      throw new Error('User not found')
    }

    // This avoids overwritting and just apply the new changes
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }

    return this.users[index]; */

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
/*     const index = this.users.findIndex(user => user.id == id)

    if (index === -1) {
      throw new Error('User not found')
    }

    this.users.splice(index, 1);
    return id; */

    const query = `DELETE FROM ${table} WHERE id = '${id}'`;
    await this.pool.query(query);
    return { id };

  }

}

module.exports = UsersService;
