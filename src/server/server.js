const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.use('/api/v1', require('./Routes'));

const fs = require("fs");
const path = require("path");

app.use(express.json());

app.post("/files", async (req, res) => {
  fs.readdir(`${req.body.folder}`, async (error, files) => {
    if (error) {
      res.status(500).send({ error: "Error reading folder" });
    } else {
      res.send({ files });
    }
  });
});

app.get("/files/:file", (req, res) => {
  const filePath = path.join("/path/to/folder", req.params.file);
  fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) {
      res.status(500).send({ error: "Error reading file" });
    } else {
      res.send({ data });
    }
  });
});

app.post("/files/create", (req, res) => {
  console.log(req.body);
  if (req.body.type === "folder") {
    try {
      fs.mkdirSync(`${req.body.folder}/${req.body.newFolderName}`, {
        recursive: true,
      });
      fs.readdir(`${req.body.folder}`, (error, files) => {
        if (error) {
          res.status(500).send({ error: "Error reading folder" });
        } else {
          console.log(files);
          res.send({
            message: "folder created successfully",
            files,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    const filePath = path.join(req.body.folder, req.body.fileName);
    fs.writeFile(filePath, "", (error) => {
      if (error) {
        res.status(500).send({ error: "Error creating file" });
      } else {
        fs.readdir(`${req.body.folder}`, (error, files) => {
          if (error) {
            res.status(500).send({ error: "Error reading folder" });
          } else {
            console.log;
            res.send({
              message: "file created successfully",
              files,
            });
          }
        });
      }
    });
  }
});

app.delete("/files/:file", (req, res) => {
  const filePath = path.join("/path/to/folder", req.params.file);
  fs.unlink(filePath, (error) => {
    if (error) {
      res.status(500).send({ error: "Error deleting file" });
    } else {
      res.send({ message: "File deleted successfully" });
    }
  });
});

const PORT = 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
