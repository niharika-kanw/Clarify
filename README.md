# Clarify 💡

> **"Scaling high-impact instruction by transforming student confusion into actionable lesson plans."**

## 🎓 The Inspiration: My Journey as a ULA
As an Undergraduate Learning Assistant (ULA) at Michigan State University, I support over 180+ students in a systems-level computer architecture course. During our help-room sessions, I noticed a recurring bottleneck: the "Conceptual Surge." 

Dozens of students would arrive with the same core misunderstanding—whether it was assembly language memory hierarchy or pointer arithmetic—but each described it in a unique, fragmented way. Managing these individual queries in real-time meant I was often repeating the same core principles rather than teaching at scale.

**I built Clarify to solve this.** It’s a tool designed to help TAs and LAs stop being reactive and start being proactive.

---

## 🚀 What is Clarify?
Clarify is an AI-native preparation layer that bridges the gap between student confusion and effective help-room instruction. 

Prior to an office hours session, students submit their confusion anonymously. Clarify then uses AI to synthesize these queries into a **teaching game plan** that is automatically delivered to the instructor's Notion workspace.

### Core Features:
*   **Anonymized Submission**: Reduces the "fear of asking" for students in complex courses like CSE 491.
*   **AI Synthesis (Llama 3)**: Automatically identifies patterns in student confusion and generates a tailored, 3-part lesson plan for that specific session.
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
