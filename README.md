# Blue Chalk Media — Frontend

A modern, responsive web application for **Blue Chalk Media** built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7**. This project serves as the frontend for a full-stack MERN application, featuring cinematic visual storytelling, dynamic media galleries, and portfolio showcases.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather Icons)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🌟 Key Features & Pages

### 1. Home / Landing Page (`/`)
- Hero video player with responsive overlays and brand identity.
- Right-side dynamic image slider fetched from the backend API.
- Quick navigation links and mobile responsive drawer menu.

### 2. About Page (`/about`)
- Company introduction and embedded video presentation.
- Interactive **9-Image On-Assignment Gallery** with smooth hover expansion.
- Integrated **Services**, **Client & Partner Logos**, **Awards**, and **Meet the Team** components.
- Interactive gallery images linked directly to related work projects.

### 3. Work & Portfolio (`/work` & `/work/:slug`)
- **Portfolio Listing (`/work`)**:
  - Filter projects by categories: *Featured*, *All Projects*, *Branded*, *Entertainment*, *Social Impact*, *Documentary*.
  - Dynamic responsive layout with hover states and action badges.
- **Project Detail (`/work/:slug`)**:
  - Flexible video player supporting both direct MP4 playback and YouTube embeds.
  - Detailed narrative content and project metadata.
  - Dynamic **Next Project** navigation and **Related Work** suggestions.
  - Robust slug and ID-based routing fallback.

### 4. News & Blogs (`/news` & `/news/:slug`)
- Chronological news and blog listing.
- Full blog detail view with media headers, rich text content, and back navigation.

### 5. Other Pages
- **Contact (`/contact`)**: Inquiries, address, and interactive form.
- **Awards (`/awardpage`)**: Industry honors and recognition highlights.
- **Privacy Policy (`/privacy-policy`)** & **Terms of Use (`/terms-of-use`)**.

---

## 📁 Project Structure

```text
src/
├── assets/                  # Static assets (images, videos, icons, logos)
├── components/
│   ├── landingpage/
│   │   └── Home.jsx         # Landing page hero and slider
│   ├── layout/
│   │   ├── Header.jsx       # Global header & navigation
│   │   ├── Footer.jsx       # Global footer
│   │   └── Layout.jsx       # Nested route layout wrapper
│   ├── pages/
│   │   ├── About.jsx        # About Us & 9-image gallery
│   │   ├── AboutAwards.jsx  # Awards section for About page
│   │   ├── AboutPeopleData.jsx # Team members section
│   │   ├── Awardpage.jsx    # Dedicated awards showcase
│   │   ├── Contact.jsx      # Contact page
│   │   ├── News.jsx         # News & blogs list
│   │   ├── NewsBlogs.jsx    # News detail page
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfUse.jsx
│   │   └── Works.jsx        # Works wrapper
│   ├── work/
│   │   ├── AllProjectwork.jsx # Filterable work portfolio
│   │   └── Workdetail.jsx   # Project detail with video player
│   ├── Allroutes.jsx        # Route definitions
│   └── PageLoader.jsx       # Loading indicator
├── App.jsx                  # Main application component
├── main.jsx                 # Vite application entry point
├── index.css                # Global styles & Tailwind imports
└── App.css                  # Custom styling & font utilities
```

---

## 🔗 Backend API Endpoints

The frontend communicates with a backend server (default: `http://localhost:5000/api`):

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/home` | `GET` | Fetches landing hero media and slider images |
| `/api/work` | `GET` | Fetches all portfolio projects |
| `/api/work/slug/:slug` | `GET` | Fetches a single work project by slug |
| `/api/about` | `GET` | Fetches About page textual content and video URL |
| `/api/gallery` | `GET` | Fetches 9 on-assignment gallery images |
| `/api/clients` | `GET` | Fetches partner and client logos |
| `/api/team` | `GET` | Fetches team member profiles |
| `/api/awards` | `GET` | Fetches awards and honors list |
| `/api/news` | `GET` | Fetches all news/blog articles |
| `/api/news/slug/:slug` | `GET` | Fetches a single news/blog article by slug |
| `/api/contact` | `GET`, `POST` | Fetches contact info and submits contact forms |
| `/api/footer` | `GET` | Fetches dynamic footer data |

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Backend server running on `http://localhost:5000`

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd blue_chalk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

### Production Build

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### Linting

Run Oxlint to check code quality:
```bash
npm run lint
```
