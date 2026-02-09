# Software Requirements Specification (SRS)
## Project: Book Store App

### 1. Introduction
**Purpose:**  
This document describes the requirements for the Book Store App.

**Scope:**  
The Book Store App is a web application where users can register, log in, browse books, access free books, and access restricted (purchased) books based on permissions. The system does not include real payment processing.

---

### 2. Overall Description
**Target Users:**
- Customers/Users (readers)
- Administrators (manage books and access)

**System Goals:**
- Provide a platform to browse books online
- Support user authentication (register/login/logout)
- Provide access control for free and restricted books
- Store user and book data persistently in a database

---

### 3. Functional Requirements
**FR1: User Registration**  
The system shall allow new users to create an account.

**FR2: User Login/Logout**  
The system shall allow users to log in and log out securely.

**FR3: Browse Books**  
The system shall allow users to view a list of available books.

**FR4: View Book Details**  
The system shall allow users to view details such as title, author, price/category/type (free or restricted).

**FR5: Free Book Access**  
The system shall allow users to access free books without restrictions.

**FR6: Restricted Book Access (Simulated Purchase)**  
The system shall restrict access to certain books unless the user has permission (simulated purchase/access).

**FR7: Admin Book Management**  
The system shall allow administrators to add, update, and delete books.

**FR8: Admin Access Management**  
The system shall allow administrators to grant or remove access for restricted books (if implemented in the project).

---

### 4. Non-Functional Requirements
**NFR1: Usability**  
The interface shall be easy to use and understandable.

**NFR2: Performance**  
The system shall respond within a reasonable time during normal usage.

**NFR3: Security**  
The system shall protect user login credentials and restrict access to protected content.

**NFR4: Reliability**  
The system shall store data persistently so it remains available after refresh or restart.

---

### 5. Assumptions and Constraints
- Real payment processing is not implemented in the current version.
- The “purchase” concept is simulated through access permissions.
- The system requires a database connection to store users and books.

---

### 6. Data Requirements
**User Data:**
- Full name
- Email
- Password (stored securely)

**Book Data (example fields):**
- Title
- Author
- Price
- Book type (Free / Restricted)
- Optional: category/genre, createdAt

---

### 7. System Architecture
The system follows a **client–server–database** architecture:
- Frontend: user interface for browsing and account actions
- Backend: handles authentication, access control, and logic
- Database: stores users, books, and permissions

---

### 8. Acceptance Criteria
The project is considered successful if:
- Users can register, log in, and log out
- Users can browse books and view details
- Free books are accessible to users
- Restricted books are protected and only accessible with permission
- Admin can manage books (add/update/delete)
- Data persists in the database
