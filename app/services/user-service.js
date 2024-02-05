const { faker } = require('@faker-js/faker');

class UsersService {


  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    this.users.push({
      id: 1,
      name: 'Victor',
      email: "victor@hotmail.com",
      role: 'FullStack Developer'
    },
    {
      id: 2,
      name: 'Marco',
      email: "marco@hotmail.com",
      role: "BackEnd Developer"
    },
    {
      id: 3,
      name: 'Angel',
      email: "angel@gmail.com",
      role: "Student"
    })
  }

  create(data) {

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

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(user => user.id == id);
  }

  update(id, changes) {
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

  delete(id) {
    const index = this.users.findIndex(user => user.id == id)

    if (index === -1) {
      throw new Error('User not found')
    }

    this.users.splice(index, 1);
    return id;
  }

}

module.exports = UsersService;
