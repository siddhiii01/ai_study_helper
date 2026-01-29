import express from "express";
import { generateDummyTasks } from "../utils/dummyData.js";

const router = express.Router();

router.post("/input", async (req, res) => {
  const { topic } = req.body;

  if (!topic || topic.trim() === "") {
    return res.status(400).json({
      error: "Topic is required"
    });
  }

  try {
    const tasks = generateDummyTasks(topic);

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Task generation error:", error);
    res.status(500).json({ error: "Failed to generate tasks" });
  }
});

export default router;