const request = require("supertest");
const express = require("express");
const htmlRoutes = require("../routes/htmlRoutes");

// Create a new Express app
const app = express();

// Mount the router on the app
app.use("/", htmlRoutes);

describe("HTML Routes", () => {
  it("should serve notes.html for requests to /notes", async () => {
    const response = await request(app).get("/notes");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });

  it("should serve index.html for requests to /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });
});
