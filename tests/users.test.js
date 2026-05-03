import request from "supertest";
import AppDataSource from "../src/config/data-source.js";
import app, { setupRoutes } from "../src/app.js";

describe("POST /users Integration Test", () => {
  const testUser = {
    name: "John Doe",
    email: "john@example.com",
    age: 25,
    password: "123456",
    role: "user"
  };

  let userRepository;

  beforeAll(async () => {
    // Initialize PostgreSQL connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Get User repository
    userRepository = AppDataSource.getRepository("User");

    // Setup routes
    setupRoutes(userRepository);
  });

  afterAll(async () => {
    // Cleanup inserted test user
    await userRepository.delete({
      email: testUser.email
    });

    // Close database connection
    await AppDataSource.destroy();
  });

  test("should create a new user and store it in PostgreSQL database", async () => {
    const response = await request(app)
      .post("/users")
      .send(testUser);

    // Verify API response
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.user.email).toBe(testUser.email);

    // Verify user saved in database
    const savedUser = await userRepository.findOneBy({
      email: testUser.email
    });

    expect(savedUser).not.toBeNull();
    expect(savedUser.name).toBe(testUser.name);
    expect(savedUser.email).toBe(testUser.email);
  });
});