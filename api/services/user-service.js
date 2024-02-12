const { faker } = require('@faker-js/faker');

class UsersService {


  constructor() {
    this.users = [];
    this.generate();
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

    this.users.push(newUser);
    return newUser;

  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    return this.users.find(user => user.id == id);
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
