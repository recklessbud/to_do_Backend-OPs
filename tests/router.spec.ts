import { test, describe, it } from "node:test";
import assert from "node:assert";
import { Request, Response } from "express";
import express from "express";
import request from "supertest";
import useRouter from "../src/routes/index.js";

describe("perform todo", () => {
  const app = express();
  app.use("/", useRouter);

  test("should add a todo", async () => {
    const todoData = {
      title: "Test Todo",
      countdown: {
        hours: 1,
        minutes: 2,
        seconds: 3,
      },
    };
    const response = await request(app).post("/add").send(todoData).expect(200);
    console.log("res", response.text);
    assert.ok(
      response.text.includes(
        "Test Todo has countdown  1 hours : 2 minutes :  3 seconds"
      )
    );
  });

  test("should get all todos", async () => {
    const response = await request(app).get("/getAll").expect(200);
    console.log("ger all", response.text);
    const todos = JSON.parse(response.text);
    assert.ok(todos.length >= 1);
    assert.ok(todos[0].title === "Test Todo");
  });

  test("should patch a todo", async () => {
    const todoData = {
      countdown: {
        hours: 1,
        minutes: 2,
        seconds: 3,
      },
    };
    const response = await request(app)
      .patch("/edit/Test Todo")
      .send(todoData)
      .expect(200);
    assert.ok(
      response.text ===
        "Item with title \"Test Todo\" partially updated."
    );
  });

  test("should delete a todo", async () => {
    const response = await request(app).delete("/delete/Test Todo").expect(200);
    assert.ok(response.text === "Hello , I'm Test Todo");
  });
});
