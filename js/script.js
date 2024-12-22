document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for navigation links
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Handle form submission
  document
    .querySelector("form.contact-form-horizontal")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        alert("يرجى ملء جميع الحقول.");
      } else {
        alert(`شكرا لك، ${name}! تم إرسال رسالتك.`);
        this.reset();
      }
    });

  // Handle results display
  const resultsForm = document.getElementById("results-form");
  const resultsDisplay = document.getElementById("results-display");

  resultsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const studentId = document.getElementById("student-id").value.trim();
    const schoolId = document.getElementById("school-id").value.trim();
    if (studentId && schoolId) {
      fetchResults(studentId, schoolId);
    } else {
      alert("يرجى إدخال رقم الجلوس والرقم المدرسي.");
    }
  });

  function fetchResults(studentId, schoolId) {
    fetch("http://localhost:3000/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, schoolId }),
    })
      .then((response) => response.json())
      .then((data) => displayStudentResults(data))
      .catch((error) => {
        console.error("Error fetching results:", error);
        resultsDisplay.innerHTML =
          "<p>حدث خطأ أثناء استرجاع النتائج. حاول مرة أخرى لاحقًا.</p>";
      });
  }

  function displayStudentResults(student) {
    if (student) {
      resultsDisplay.innerHTML = `
                <h3>نتيجة الطالب</h3>
                <p>الاسم: ${student.name}</p>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>المادة</th>
                            <th>الدرجة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>الرياضيات</td>
                            <td>${student.grade_math}</td>
                        </tr>
                        <tr>
                            <td>العلوم</td>
                            <td>${student.grade_science}</td>
                        </tr>
                        <tr>
                            <td>التاريخ</td>
                            <td>${student.grade_history}</td>
                        </tr>
                        <tr>
                            <td>الجغرافيا</td>
                            <td>${student.grade_geography}</td>
                        </tr>
                    </tbody>
                </table>
                <p>التقدير العام: ${student.overall_grade}</p>
            `;
    } else {
      resultsDisplay.innerHTML = "<p>لم يتم العثور على نتائج للطالب.</p>";
    }
  }

  // Honor Roll Display
  const honorRollDisplay = document.getElementById("honor-roll-display");

  function displayHonorRoll() {
    const honorRollData = {
      "الصف الأول": [
        { name: "الطالب الأول", total: 290, percentage: "96.7%", grade: "A+" },
        { name: "الطالب الثاني", total: 280, percentage: "93.3%", grade: "A" },
        { name: "الطالب الثالث", total: 270, percentage: "90.0%", grade: "A-" },
      ],
      "الصف الثاني": [
        { name: "الطالب الأول", total: 295, percentage: "98.3%", grade: "A+" },
        { name: "الطالب الثاني", total: 285, percentage: "95.0%", grade: "A" },
        { name: "الطالب الثالث", total: 275, percentage: "91.7%", grade: "A-" },
      ],
      "الصف الثالث": [
        { name: "الطالب الأول", total: 300, percentage: "100%", grade: "A+" },
        { name: "الطالب الثاني", total: 290, percentage: "96.7%", grade: "A" },
        { name: "الطالب الثالث", total: 280, percentage: "93.3%", grade: "A-" },
      ],
      "الصف الرابع": [
        { name: "الطالب الأول", total: 298, percentage: "99.3%", grade: "A+" },
        { name: "الطالب الثاني", total: 288, percentage: "96.0%", grade: "A" },
        { name: "الطالب الثالث", total: 278, percentage: "92.7%", grade: "A-" },
      ],
      "الصف الخامس": [
        { name: "الطالب الأول", total: 297, percentage: "99.0%", grade: "A+" },
        { name: "الطالب الثاني", total: 287, percentage: "95.7%", grade: "A" },
        { name: "الطالب الثالث", total: 277, percentage: "92.3%", grade: "A-" },
      ],
      "الصف السادس": [
        { name: "الطالب الأول", total: 299, percentage: "99.7%", grade: "A+" },
        { name: "الطالب الثاني", total: 289, percentage: "96.3%", grade: "A" },
        { name: "الطالب الثالث", total: 279, percentage: "93.0%", grade: "A-" },
      ],
    };

    let currentGradeIndex = 0;
    const grades = Object.keys(honorRollData);

    function showHonorRoll() {
      const grade = grades[currentGradeIndex];
      const students = honorRollData[grade];

      honorRollDisplay.innerHTML = `
                <h3>${grade}</h3>
                <table class="honor-roll-table">
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>المجموع</th>
                            <th>النسبة المئوية</th>
                            <th>التقدير</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students
                          .map(
                            (student) => `
                            <tr>
                                <td>${student.name}</td>
                                <td>${student.total}</td>
                                <td>${student.percentage}</td>
                                <td>${student.grade}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            `;

      currentGradeIndex = (currentGradeIndex + 1) % grades.length;
    }

    showHonorRoll();
    setInterval(showHonorRoll, 120000); // تغيير كل دقيقتين (120000 مللي ثانية)
  }

  displayHonorRoll();
});
