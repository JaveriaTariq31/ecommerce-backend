import AppDataSource from "../config/data-source.js";

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected for seeding");

    const userRepository = AppDataSource.getRepository("User");
    const resultRepository = AppDataSource.getRepository("Result");

    // -----------------------------
    // Seed Users
    // -----------------------------
    const users = [
      {
        name: "Ali",
        email: "ali@gmail.com",
        age: 21,
        password: "123456"
      },
      {
        name: "Ayesha",
        email: "ayesha@gmail.com",
        age: 22,
        password: "123456"
      },
      {
        name: "Ahmed",
        email: "ahmed@gmail.com",
        age: 20,
        password: "123456"
      }
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOneBy({
        email: userData.email
      });

      if (!existingUser) {
        const newUser = userRepository.create(userData);
        await userRepository.save(newUser);
        console.log(`Inserted user: ${userData.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    // -----------------------------
    // Seed Results
    // -----------------------------
    const results = [
  {
    student_name: "Ali",
    subject: "Math",
    marks: 85,
    grade: "A",
  },
  {
    student_name: "Ali",
    subject: "Physics",
    marks: 80,
    grade: "A",
  },
  {
    student_name: "Ayesha",
    subject: "Science",
    marks: 78,
    grade: "B",
  },
  {
    student_name: "Ayesha",
    subject: "English",
    marks: 88,
    grade: "A",
  },
  {
    student_name: "Ahmed",
    subject: "English",
    marks: 92,
    grade: "A+",
  },
];
    for (const resultData of results) {
      const existingResult = await resultRepository.findOneBy({
        student_name: resultData.student_name,
        subject: resultData.subject
      });

      if (!existingResult) {
        const newResult = resultRepository.create(resultData);
        await resultRepository.save(newResult);
        console.log(
          `Inserted result: ${resultData.student_name} - ${resultData.subject}`
        );
      } else {
        console.log(
          `Result already exists: ${resultData.student_name} - ${resultData.subject}`
        );
      }
    }

    console.log("Seeding completed successfully");
    await AppDataSource.destroy();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seedDatabase();