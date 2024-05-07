const request = require("supertest");
const app = require("../server"); 

describe("API Routes", () => {
  it("should return status 200 and an array of notes for GET /api/notes", async () => {
    const response = await request(app).get("/api/notes");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should save a new note with POST /api/notes", async () => {
    const response = await request(app)
      .post("/api/notes")
      .send({ title: "Test Note", text: "This is a test note" });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should delete a note with DELETE /api/notes/:id", async () => {
    // First, save a test note to get its ID
    const postResponse = await request(app)
      .post("/api/notes")
      .send({ title: "Test Note", text: "This is a test note" });
    const noteId = postResponse.body.id;

    // Now, make the delete request
    const deleteResponse = await request(app).delete(`/api/notes/${noteId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe("Note deleted successfully");
  });
});
