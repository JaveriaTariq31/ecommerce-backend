class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    const { name, email } = userData;

    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = await this.userRepository.create(userData);
    return newUser;
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}

export default UserService;