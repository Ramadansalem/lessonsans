const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// إعداد اتصال MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "school_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

// API لعرض نتائج الطلاب
app.post("/api/results", (req, res) => {
  const { studentId, schoolId } = req.body;
  const query = "SELECT * FROM students WHERE student_id = ? AND school_id = ?";
  db.query(query, [studentId, schoolId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Student not found");
    }
  });
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
