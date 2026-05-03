class UserRepository {
  constructor() {
    this.users = []; 
    this.currentId = 1;
  }

  async findByEmail(email) { 
    return this.users.find((user) => user.email === email) || null;
  }

  async create(userData) {
    const user = {
      id: this.currentId++,
      ...userData
    };

    this.users.push(user);
    return user;
  }

  async findAll() {
    return this.users;
  }
}

module.exports = UserRepository;