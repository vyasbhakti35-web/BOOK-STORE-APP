# Manual Test Cases
## Project: Book Store App

### Test Case 1: User Registration (Valid)
**Steps:**
1. Open the application.
2. Go to Register/Sign Up page.
3. Enter valid name, email, and password.
4. Submit the form.
**Expected Result:**  
Account is created successfully and user can log in.

---

### Test Case 2: User Registration (Duplicate Email)
**Steps:**
1. Register with an email that already exists.
2. Submit the form.
**Expected Result:**  
System shows an error message like “Email already exists” and does not create a new account.

---

### Test Case 3: Login (Valid)
**Steps:**
1. Open Login page.
2. Enter correct email and password.
3. Click Login.
**Expected Result:**  
User logs in successfully and is redirected to the main page/dashboard.

---

### Test Case 4: Login (Invalid)
**Steps:**
1. Enter wrong email or wrong password.
2. Click Login.
**Expected Result:**  
System shows an error message and user remains on login page.

---

### Test Case 5: Logout
**Steps:**
1. Log in to the system.
2. Click Logout.
**Expected Result:**  
User is logged out and cannot access restricted pages without logging in again.

---

### Test Case 6: Browse Books
**Steps:**
1. Log in.
2. Open books list page.
**Expected Result:**  
Book list loads and displays books correctly.

---

### Test Case 7: Access Free Book
**Steps:**
1. Log in.
2. Open a book marked as Free.
**Expected Result:**  
User can access or view the free book content/details.

---

### Test Case 8: Access Restricted Book (No Permission)
**Steps:**
1. Log in with a user who does not have access.
2. Try to open a restricted/purchased book.
**Expected Result:**  
Access is denied or a message is shown such as “Purchase required / Access not allowed.”

---

### Test Case 9: Access Restricted Book (With Permission)
**Steps:**
1. Log in with a user who has permission/access.
2. Open a restricted/purchased book.
**Expected Result:**  
User can access/view the restricted book content/details.

---

### Test Case 10: Admin Adds a Book
**Steps:**
1. Log in as admin.
2. Add a new book with required fields.
3. Save.
**Expected Result:**  
Book is added successfully and appears in the book list.

---

### Test Case 11: Admin Updates a Book
**Steps:**
1. Log in as admin.
2. Edit a book’s details (title/price/type).
3. Save.
**Expected Result:**  
Book details update successfully and changes are visible.

---

### Test Case 12: Admin Deletes a Book
**Steps:**
1. Log in as admin.
2. Delete a selected book.
**Expected Result:**  
Book is removed from the list and no longer exists in the database.

---

### Test Case 13: Data Persistence
**Steps:**
1. Add or update a book.
2. Refresh the page or restart the server.
3. Open the book list again.
**Expected Result:**  
Data remains saved and loads correctly from the database.
