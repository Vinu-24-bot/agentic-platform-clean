# Agentic RAG Enterprise Platform

A high-fidelity, enterprise-grade AI Agent platform mockup built with React, Tailwind CSS, and Framer Motion.

---

## 🟢 How to Run Locally (Super Simple Guide)

Follow these steps to run this project on your laptop using VS Code.

### Prerequisites
1.  **Install Node.js**: Download and install "LTS Version" from [nodejs.org](https://nodejs.org/).
2.  **Install VS Code**: Download from [code.visualstudio.com](https://code.visualstudio.com/).
3.  **Install Git**: Download from [git-scm.com](https://git-scm.com/).

### Step-by-Step Instructions

**Step 1: Download the Code**
1.  Download the project zip file (or clone the repo if you know Git).
2.  Unzip it to a folder on your laptop (e.g., `Desktop/agentic-rag`).

**Step 2: Open in VS Code**
1.  Open VS Code.
2.  Go to **File** > **Open Folder...**
3.  Select the `agentic-rag` folder you just unzipped.

**Step 3: Install Dependencies**
1.  In VS Code, go to the top menu: **Terminal** > **New Terminal**.
2.  A command window will open at the bottom. Type this command and hit Enter:
    ```bash
    npm install
    ```
    *(Wait for it to finish. You'll see a "node_modules" folder appear).*

**Step 4: Start the App**
1.  In the same terminal, type:
    ```bash
    npm run dev
    ```
2.  You will see a message like: `Local: http://localhost:5000`.
3.  Hold `Ctrl` (or `Cmd`) and click that link, or open your browser and type `http://localhost:5000`.

**Step 5: You're Live!**
The app is now running on your laptop. You can edit files in the `client/src` folder, and the browser will update automatically!

---

## 🌐 How to Show Everyone (Free Deployment)

To share a link with recruiters or friends, you need to "deploy" it. **Vercel** is the best free option.

### 1. Push to GitHub
1.  Create a free account on [GitHub.com](https://github.com).
2.  Create a "New Repository" (name it `agentic-rag`).
3.  In your VS Code Terminal, run these commands one by one:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/<YOUR-USERNAME>/agentic-rag.git
    git push -u origin main
    ```

### 2. Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up with your GitHub account.
2.  Click **"Add New Project"**.
3.  Select your `agentic-rag` repository from the list.
4.  **Important:** In the "Build & Development Settings" section:
    *   **Framework Preset:** Select `Vite`.
    *   **Output Directory:** Type `dist/public` (Override if needed).
5.  Click **Deploy**.

**Result:** Vercel will give you a live link (e.g., `agentic-rag.vercel.app`) that works for everyone, free of cost!

---

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Shadcn/UI
- **State:** Zustand
- **Routing:** Wouter
- **Icons:** Lucide React
