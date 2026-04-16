# Social Support Application (Front-End Case Study)

## 📌 Overview
This project is a multi-step social support application built for a government portal.  
It allows citizens to apply for financial assistance through a guided wizard with optional AI-powered writing assistance.

The goal is to provide a **simple, accessible, and intelligent application flow** that improves user experience while maintaining clean architecture and scalable frontend practices.

---

## 🚀 Features

### 🧭 Multi-Step Wizard
- 3-step form flow
- Progress indicator with clickable steps
- Step validation and controlled navigation

### 👤 Step 1: Personal Information
- Name, National ID, Date of Birth
- Gender, Address, City, State, Country
- Phone, Email

### 💰 Step 2: Family & Financial Information
- Marital Status
- Dependents
- Employment Status
- Monthly Income
- Housing Status

### 📝 Step 3: Situation Description (AI Enabled)
- Current Financial Situation
- Employment Circumstances
- Reason for Applying
- AI-powered “Help Me Write” button

---

## 🤖 AI Feature
- Integrated OpenAI Chat Completions API via backend proxy (Next.js API route)
- Dynamic prompt generation using user input
- AI generates a structured financial hardship statement
- Output is shown in a modal where user can:
  - Accept
  - Edit
  - Discard
- Response validation ensures quality and consistency

---

## 🌍 Internationalization
- Full support for English and Arabic
- RTL/LTR layout switching
- Dynamic translations system

---

## ♿ Accessibility
- Keyboard navigation support
- Dialog uses `role="dialog"` and `aria-modal`
- Escape key closes modal
- Proper labels for form inputs
- Focus management for better usability

---

## ⚠️ Error Handling
- API calls wrapped in try/catch blocks
- Graceful fallback messages for failures
- Protection against empty or invalid AI responses
- Loading states prevent duplicate requests

---

## 💾 State Management & Persistence
- Context API used for global wizard state
- Data persisted using LocalStorage
- Supports session recovery after refresh

---

## 🛠 Tech Stack
- React.js (Next.js)
- Tailwind CSS
- React Hook Form
- Context API
- Fetch API
- OpenAI GPT API (via server route)

---

## 🔐 OpenAI Integration

### Endpoint
```

POST /api/ai

```

### Model
```

gpt-3.5-turbo

````

### Flow
1. User clicks "Help Me Write"
2. System builds dynamic prompt from Step 3 inputs
3. Request sent to backend API route
4. Backend forwards request to OpenAI securely
5. Response validated and returned to UI

---

## ▶️ How to Run the Project

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
````

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_api_key_here
```

⚠️ Never expose API key in frontend.

---

## 📦 Build

```bash
npm run build
npm start
```

---

## 🧠 Architecture Notes

* Separation between UI and API layer (secure proxy pattern)
* Reusable wizard-based structure
* Modular step components
* AI logic isolated in service layer
* Clean state management via Context API

---

## 📊 Evaluation Focus Coverage

* ✔ Form flow & validation
* ✔ AI integration with secure backend
* ✔ Responsive UI design
* ✔ Accessibility best practices
* ✔ Clean code structure
* ✔ Error handling robustness
* ✔ Internationalization support

---

## ⏱ Timeframe

Project completed within **5 days** as required.

---

## 📌 Summary

This project demonstrates a scalable frontend architecture with AI integration, focusing on usability, accessibility, and clean engineering practices suitable for production-level government systems.

