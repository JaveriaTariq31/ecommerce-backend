import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source.js";

const repo = AppDataSource.getRepository("User");

// REGISTER
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = repo.create({ name, email, password: hash });

    await repo.save(user);

    res.json({ message: "User created", user });
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await repo.findOneBy({ email });

    if (!user) return res.json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.json({ message: "Wrong password" });

    res.json({ message: "Login success" });
};

// GET ALL USERS
export const getUsers = async (req, res) => {
    const users = await repo.find();
    res.json(users);
};

// GET BY ID
export const getUserById = async (req, res) => {
    const user = await repo.findOneBy({ id: parseInt(req.params.id) });
    res.json(user);
};

// UPDATE
export const updateUser = async (req, res) => {
    const user = await repo.findOneBy({ id: parseInt(req.params.id) });

    repo.merge(user, req.body);
    await repo.save(user);

    res.json({ message: "Updated", user });
};

// DELETE
export const deleteUser = async (req, res) => {
    await repo.delete(req.params.id);
    res.json({ message: "Deleted" });
};