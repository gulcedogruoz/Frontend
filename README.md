
# 💬 AI Agent Chat UI – Frontend (Next.js)

This is a simple frontend chat interface built with **Next.js (App Router)** that communicates with a backend AI Agent via REST API. It allows users to type natural language messages related to airline operations (flight search, ticket purchase, check-in), which are analyzed by a language model and routed to the appropriate backend services.

## 🧱 Tech Stack

- ⚡️ [Next.js 13+ (App Router)](https://nextjs.org/)
- 🎨 Tailwind CSS (for styling)
- 🌐 REST API integration with `.fetch()`
- 🧠 Works with Claude 3 LLM via backend
- 💬 Minimal chat UI

## 📁 Project Structure

| File           | Description                                           |
|----------------|-------------------------------------------------------|
| `page.tsx`     | Main chat interface (message input/output & logic)    |
| `layout.tsx`   | Global layout with fonts and styles                   |
| `globals.css`  | Tailwind and global styles                            |

## 🚀 How It Works

1. User types a message like:  
   `"I want to book a flight to Paris on July 10"`

2. Frontend sends POST request to the backend endpoint:  
   `http://localhost:5050/api/aia​gent/analyze`

3. Backend (Claude LLM + Gateway) responds with structured JSON

4. Response is rendered in the chat window as "Agent" reply

## 📦 Installation & Running Locally

### Requirements
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ai-agent-frontend

cd ai-agent-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```


```ts
const res = await fetch('http://localhost:5050/api/aia​gent/analyze', { ... })
```

If your backend runs on a different host/port, **update the URL** accordingly.

## 📝 Notes

- The chat scroll area is fixed height with vertical scroll
- Basic error handling is included
- Uses Tailwind for quick responsive layout
- `Enter` key sends messages too

## 📹 Demo Video

[▶️ Watch Frontend Demo](https://your-video-link.com)

## 👥 Authors

Developed by **Gulce DOGRUOZ** – SE4458 Assignment 2
