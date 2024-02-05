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
    },
    {
      id: 2,
      name: 'Marco',
      email: "marco@hotmail.com",
    },
    {
      id: 3,
      name: 'Angel',
      email: "angel@gmail.com",
    })
  }

  create() {}

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(user => user.id == id);
  }

  update() {}

  delete() {}

}

module.exports = UsersService;
