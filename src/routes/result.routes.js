import express from "express";
import AppDataSource from "../config/data-source.js";

const router = express.Router();

// GET ALL RESULTS
router.get("/", async (req, res) => {
  try {
    const resultRepo = AppDataSource.getRepository("Result");
    const results = await resultRepo.find();

    return res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching results"
    });
  }
});

// GET ONE STUDENT
router.get("/:name", async (req, res) => {
  try {
    const resultRepo = AppDataSource.getRepository("Result");

    const results = await resultRepo.findBy({
      student_name: req.params.name
    });

    return res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching student results"
    });
  }
});

export default router;