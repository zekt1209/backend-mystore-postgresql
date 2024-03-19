const { faker } = require('@faker-js/faker');

// Conexion con la DB
const getConnection = require('../libs/postgresql');
const getPoolConnection = require('../libs/postgresql-pool');

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

    const query = `INSERT INTO users (id, name, email, role) VALUES ('${newUser.id}', '${newUser.name}', '${newUser.email}', '${newUser.role}')`;
    const res = await this.pool.query(query);

    return newUser;

  }

  async find() {
    // --- Normal Connection
    // * const client = await getConnection();
    // * const res = await client.query('SELECT * FROM tasks');
    // * return res.rows;

    // Pool Connection
    const query = 'SELECT * FROM users';
    const res = await this.pool.query(query);
    return res.rows;

    // --- Local results generated in constructor
    // * return this.users;
  }

  async findOne(id) {
    const query = `SELECT * FROM users WHERE id = '${id}'`;
    const res = await this.pool.query(query);
    return res.rows;
    // return this.users.find(user => user.id == id);
  }

  async update(id, changes) {
    const index = this.users.findIndex(user => user.id == id)

    if (index === -1) {
      throw new Error('User not found')
    }

    // This avoids overwritting and just apply the new changes
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }

    return this.users[index];

  }

  async delete(id) {
    const index = this.users.findIndex(user => user.id == id)

    if (index === -1) {
      throw new Error('User not found')
    }

    this.users.splice(index, 1);
    return id;
  }

}

module.exports = UsersService;
