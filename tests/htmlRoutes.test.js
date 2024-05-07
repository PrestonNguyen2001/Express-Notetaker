const request = require("supertest");
const express = require("express");
const router = require("../routes/htmlRoutes"); 

const app = express();
app.use(router);

describe("GET /notes", () => {
  it("should return notes.html", async () => {
    const response = await request(app).get("/notes");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
    expect(response.text).toContain("Your expected content in notes.html"); 
  });
});

describe("GET /", () => {
  it("should return index.html", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
    expect(response.text).toContain("Your expected content in index.html"); // Adjust this to a unique part of your index.html
  });
});
