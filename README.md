# Attendance-Management-System
this is a attendance management system which i made for my final semester in MCA
the project is made on Java on the netbeans tools and helped me gain alot of the knowledge 
# Attendance Management System

## 📋 Project Overview

The **Attendance Management System** is a desktop-based Java application designed to automate and manage student attendance efficiently. This system allows administrators, teachers, or staff to record, update, and view attendance using a user-friendly interface. It helps reduce manual work and ensures accurate record-keeping.

---

## 🛠️ Built With

- **Java (Swing, JDBC)** – for frontend UI and backend logic
- **MySQL** – for database storage and management
- **NetBeans IDE** – for development
- **XAMPP/WAMP** – to manage MySQL database (optional)

---

## ⚙️ Features

- ✅ Admin login authentication  
- 📘 Add/view students and courses  
- 🕒 Mark daily attendance  
- 📅 View attendance reports by date or student  
- ✏️ Update or delete attendance records  
- 📂 Generate monthly attendance summaries

---

## 🔧 Installation & Setup

1. **Clone or download** this repository.

2. **Set up the database:**
   - Open MySQL or use a tool like phpMyAdmin.
   - Import the SQL file provided in `/database/attendance.sql`.
   - Create a user and password as per your JDBC connection settings.

3. **Open in NetBeans:**
   - Open NetBeans IDE.
   - Import the project using "Open Project" option.
   - Ensure libraries like MySQL JDBC Connector are added.

4. **Update DB Credentials:**
   - Go to the file where the database connection is defined (usually `DBConnection.java` or similar).
   - Update `username`, `password`, and `database URL` to match your MySQL setup.

   ```java
   String url = "jdbc:mysql://localhost:3306/attendance";
   String user = "root";
   String password = "";

   Here is a video link
   https://drive.google.com/file/d/1zkdmNSggWGotsNU2xlNxc5lvy9Fn8xP6/view?usp=sharing
