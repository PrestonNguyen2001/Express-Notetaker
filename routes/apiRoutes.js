const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const router = express.Router();

const dbFilePath = path.join(__dirname, "../db/db.json");

router.get("/notes", (_, res) => {
  try {
    const dbJson = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
    res.json(dbJson);
  } catch (error) {
    console.error("Error reading notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/notes", (req, res) => {
  try {
    const dbJson = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newNote);
    fs.writeFileSync(dbFilePath, JSON.stringify(dbJson));
    res.json(dbJson);
    console.log("Note saved successfully:", newNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/notes/:id", (req, res) => {
  try {
    console.log("Delete request received. Note ID:", req.params.id);
    const noteIdToDelete = req.params.id.toString();
    console.log("Note ID to delete:", noteIdToDelete);

    let data = fs.readFileSync(dbFilePath, "utf8");
    const dataJSON = JSON.parse(data);
    console.log("Existing notes:", dataJSON);

    const newNotes = dataJSON.filter((note) => note.id !== noteIdToDelete);
    console.log("New notes after deletion:", newNotes);

    fs.writeFileSync(dbFilePath, JSON.stringify(newNotes));
    res.status(200).json({ message: "Note deleted successfully" }); // Send a success response
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
