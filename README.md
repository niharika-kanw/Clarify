# Clarify 💡

> **"Scaling high-impact instruction by transforming student confusion into actionable lesson plans."**

## 🎓 The Inspiration: My Journey as a ULA
As an Undergraduate Learning Assistant (ULA) at Michigan State University, I support over 180+ students in a systems-level computer architecture course. 

One of the most daunting challenges of being a ULA is the sheer breadth of the material. Like many assistants, I took this course several semesters ago. When you walk into a help room, students can ask you anything—from low-level assembly debugging to complex memory hierarchy questions. I’ve often seen (and felt) the pressure of being caught off guard or having to frantically recall a edge-case concept I haven't looked at in a year.

**I built Clarify to solve this.** It’s a tool designed to help TAs and LAs prepare *before* the session. By seeing the exact conceptual hurdles students are facing, we can refresh our memory on the specific topics that will actually be asked, ensuring we provide accurate, confident guidance from the moment we walk in.

---

## 🚀 What is Clarify?
Clarify is an AI-native preparation layer that bridges the gap between student confusion and effective help-room instruction. 

Prior to an office hours session, students submit their confusion anonymously. Clarify then uses AI to synthesize these queries into a **teaching game plan** and a **memory-refresh guide** that is automatically delivered to the instructor's Notion workspace.

### Core Features:
*   **Anonymized Submission**: Reduces the "fear of asking" for students in complex courses like CSE 491.
*   **AI Synthesis (Llama 3)**: Automatically identifies patterns in student confusion and generates a tailored, 3-part lesson plan for that specific session.
*   **ULA Preparation Layer**: Allows assistants who haven't seen the material in months to focus their preparation on the specific topics that students are struggling with today.
*   **Notion Integration**: No new dashboards to learn—instructors receive their AI-generated guides directly in their existing team workflow.

---

## 🛠️ Tech Stack
*   **Frontend**: Next.js 15, React, TypeScript.
*   **Design**: High-fidelity, custom Vanilla CSS (Premium Glassmorphic UI).
*   **AI Layer**: Meta Llama 3 (via Groq SDK) for ultra-low latency inference.
*   **Infrastructure**: Notion API for automated database and page generation.

---

## 🛠️ Setup & Environmental Variables
Clarify requires the following keys in a `.env.local` file:
*   `NOTION_API_KEY`: Your Notion integration secret.
*   `NOTION_DATABASE_ID`: The ID of your parent Notion page/database.
*   `GROQ_API_KEY`: For Llama 3 inference.

---

*Clarify was built with an "AI-First" mindset, specifically designed to solve the real-world operational challenges of university-level technical instruction.*
