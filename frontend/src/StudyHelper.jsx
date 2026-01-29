import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export const StudyHelper = () => {
  const [tasks, setTasks] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/input", {
        topic: data.userInput,
      });

      console.log("response from backend:", response.data);

      // 🔑 THIS IS REQUIRED
      setTasks(response.data.tasks);

      reset();
    } catch (error) {
      console.error("error sending data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="What did you study?"
          {...register("userInput", { required: true })}
        />
        <button type="submit">Submit</button>
      </form>

      {tasks.length > 0 && (
        <div>
          <h3>Your Tasks</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
