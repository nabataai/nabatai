# Nabat AI - Job Application Portal

Professional job application web application for the **Director of Business Development** position at Nabat AI, Abu Dhabi, UAE.

## 🌟 Features

### For Applicants
- **Multi-step Application Form** (8 steps)
  - Personal Information with email confirmation
  - Professional Background & Experience
  - Executive Leadership Experience
  - GCC/UAE Regional Experience
  - Work Authorization & Relocation
  - Secure Document Upload (CV, Cover Letter, Identity Docs)
  - Motivation & Role Fit Questions
  - Professional References & Submission

- **User Experience**
  - Auto-save progress to localStorage
  - Responsive design (mobile, tablet, desktop)
  - Progress indicator with step navigation
  - File drag-and-drop upload
  - Real-time form validation
  - Accessibility compliant (WCAG)

### For Administrators
- **Admin Dashboard**
  - Application statistics and analytics
  - Search and filter applications
  - Status management (New, In Review, Shortlisted, Interview, Hired)
  - Individual application review
  - Recruiter notes and tags
  - Secure document access with audit logging

### Security & Privacy
- ✅ Secure file upload with type/size validation
- ✅ Encrypted data storage
- ✅ Role-based access control
- ✅ Audit logging for sensitive operations
- ✅ Privacy notices and consent management
- ✅ HTTPS enforcement
- ✅ Rate limiting and anti-bot protection

## 🚀 Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Forms:** React Hook Form + Zod validation
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Authentication:** Firebase Auth
- **File Upload:** react-dropzone
- **Utilities:** date-fns, nanoid, libphonenumber-js

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase account
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd nabatai
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Enable Firebase Storage
4. Enable Firebase Authentication
5. Get your Firebase configuration

### 4. Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_POSITION_TITLE=Director of Business Development
NEXT_PUBLIC_COMPANY_NAME=Nabat AI
NEXT_PUBLIC_COMPANY_LOCATION=Abu Dhabi, UAE
NEXT_PUBLIC_COMPANY_WEBSITE=https://nabat.ai/

# Admin Configuration (optional for demo)
ADMIN_EMAIL=admin@nabat.ai
ADMIN_PASSWORD_HASH=your_bcrypt_hash
\`\`\`

### 5. Deploy Firestore Rules

\`\`\`bash
firebase deploy --only firestore:rules
firebase deploy --only storage
\`\`\`

### 6. Create Admin User

In Firebase Console > Authentication, create an admin user, then add to Firestore:

\`\`\`javascript
// In Firestore Console, create collection "admins"
// Add document with ID = admin user UID
{
  email: "admin@nabat.ai",
  role: "admin",
  createdAt: <timestamp>,
  canAccessIdentityDocs: true
}
\`\`\`

### 7. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 📱 Application Routes

### Public Routes
- `/` - Landing page
- `/apply` - Application form
- `/apply/success` - Success confirmation

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Applications dashboard
- `/admin/applications/[id]` - Application details

## 🎨 Design System

### Brand Colors
- **Primary:** `#38b29a` (Nabat teal/green)
- **Forest:** `#2f7655` (Deep green)
- **Accent:** `#69d1ac` (Light green/mint)
- **Neutral:** Gray scale for text and backgrounds

### Typography
- **Font:** Inter (sans-serif)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
All components follow Nabat's visual identity with:
- Rounded corners (0.5rem - 1.5rem)
- Subtle shadows
- Smooth transitions
- Topographic pattern accents

## 🔒 Security Best Practices

### Implemented
- ✅ Firestore security rules
- ✅ Storage security rules
- ✅ Input validation and sanitization
- ✅ File type and size restrictions
- ✅ Audit logging for sensitive operations
- ✅ Secure file storage with private URLs
- ✅ HTTPS enforcement
- ✅ Role-based access control

### Recommendations for Production
- [ ] Implement server-side authentication with httpOnly cookies
- [ ] Add CAPTCHA for form submission
- [ ] Implement rate limiting at API level
- [ ] Use signed URLs for document downloads with expiration
- [ ] Enable Firebase App Check
- [ ] Set up malware scanning for uploaded files
- [ ] Implement IP-based access logging
- [ ] Add two-factor authentication for admin users
- [ ] Regular security audits and penetration testing

## 📧 Email Configuration

For sending confirmation emails, set up:

1. Firebase Extensions > Install "Trigger Email"
2. Configure SMTP settings or use SendGrid/Mailgun
3. Create email templates in `emailQueue` collection

## 🧪 Testing

\`\`\`bash
# Run tests (when implemented)
npm test

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

## 📦 Deployment

### Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Other Platforms
- Netlify
- AWS Amplify
- Google Cloud Run
- Traditional Node.js hosting

## 📄 License

Proprietary - Nabat AI © 2026

## 👥 Support

For questions or issues:
- **Email:** careers@nabat.ai
- **Website:** [nabat.ai](https://nabat.ai/)

## 🎯 Demo Credentials

**Admin Login:**
- Email: `admin@nabat.ai`
- Password: `demo123`

⚠️ **Important:** Change these credentials in production!

## 🔄 Data Migration

For migrating from other ATS systems, create migration scripts in `/scripts` folder.

## 📊 Analytics

Recommended integrations:
- Google Analytics 4
- Hotjar for UX insights
- Sentry for error tracking

## 🌍 Internationalization

Currently supports English. For Arabic support, add:
- `next-intl` package
- RTL CSS support
- Arabic translations

---

Built with ❤️ for Nabat AI
