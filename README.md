# 🩺 Doctor Listing Platform – SRM Campus Assessment

A fully responsive, animated, and functionally complete doctor listing web application. This platform allows users to search and filter doctors based on name, consultation mode, specialties, and sort parameters – all done client-side using a single API fetch. Built with modern design standards using React, Tailwind CSS, and Framer Motion.

> 📌 **Project**: SRM Campus Placement Assessment  
> 📅 **Task**: Doctor Listing Page  
> 🧪 **Functional Priority over UI Styling**  


## 🧰 Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Router** (filter URL sync)
- **Fetch API** (data fetch)
- **Vercel** (for deployment)

---

## ✨ Features

### 🔍 Autocomplete Search
- Input field with dynamic top 3 suggestion list.
- Enter key or click selects doctor.
- Case-insensitive matching.

### 📑 Filters
- **Consultation Mode**
  - Video Consult
  - In Clinic
- **Specialties**
  - 25+ Specialties with checkbox filtering.
- **Sorting**
  - Fees (ascending)
  - Experience (descending)

### 🧠 Smart Functionalities
- Search, filter & sort are applied in-memory.
- Only **one** fetch request made to the API.
- URL parameters reflect current filters and search.
- Handles browser back/forward navigation.


