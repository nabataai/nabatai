# Deployment Guide - Nabat AI Job Application Portal

Complete guide for deploying the Nabat AI recruitment application to production.

## 📋 Pre-Deployment Checklist

### 1. Code Review
- [ ] All features tested and working
- [ ] No console errors or warnings
- [ ] TypeScript errors resolved (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code reviewed by team
- [ ] Git repository is clean

### 2. Security
- [ ] Environment variables secured
- [ ] Demo credentials changed/removed
- [ ] Firebase rules deployed and tested
- [ ] Storage rules deployed and tested
- [ ] API keys restricted to production domain
- [ ] HTTPS enforced
- [ ] Security headers configured

### 3. Content
- [ ] Nabat logo is correct version
- [ ] All text is reviewed and approved
- [ ] Links point to correct destinations
- [ ] Contact emails are correct
- [ ] Privacy policy link is valid

### 4. Performance
- [ ] Images optimized
- [ ] Build size is acceptable
- [ ] Lighthouse score > 90
- [ ] Load time < 3 seconds

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

#### Why Vercel?
- Optimized for Next.js
- Automatic HTTPS
- Global CDN
- Zero configuration
- Automatic deployments from Git

#### Steps

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Configure Project**
```bash
vercel
```

Follow prompts:
- Project name: `nabat-recruitment`
- Framework: `Next.js`
- Root directory: `./`
- Build command: `npm run build`
- Output directory: `.next`

4. **Set Environment Variables**

In Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_APP_URL=https://careers.nabat.ai
NEXT_PUBLIC_COMPANY_WEBSITE=https://nabat.ai/
```

5. **Deploy**
```bash
vercel --prod
```

6. **Custom Domain** (Optional)
- Go to Project Settings → Domains
- Add `careers.nabat.ai`
- Configure DNS according to Vercel instructions

---

### Option 2: Firebase Hosting

#### Steps

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login**
```bash
firebase login
```

3. **Initialize**
```bash
firebase init hosting
```

Select:
- Use existing project
- Public directory: `out`
- Configure as SPA: Yes
- Set up automatic builds: No

4. **Build for Static Export**

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

5. **Build**
```bash
npm run build
```

6. **Deploy**
```bash
firebase deploy --only hosting
```

---

### Option 3: AWS Amplify

#### Steps

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
```

2. **Initialize**
```bash
amplify init
```

3. **Add Hosting**
```bash
amplify add hosting
```

4. **Deploy**
```bash
amplify publish
```

---

### Option 4: Traditional Node.js Server

#### Steps

1. **Build**
```bash
npm run build
```

2. **Install on Server**
```bash
ssh user@your-server
cd /var/www/nabat-recruitment
git clone <repository>
cd nabat-recruitment
npm install --production
```

3. **Configure Environment**
```bash
cp .env.local.example .env.local
nano .env.local
# Add production values
```

4. **Start with PM2**
```bash
npm install -g pm2
pm2 start npm --name "nabat-recruitment" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name careers.nabat.ai;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **Enable HTTPS**
```bash
sudo certbot --nginx -d careers.nabat.ai
```

---

## 🔧 Firebase Configuration

### 1. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 2. Deploy Storage Rules
```bash
firebase deploy --only storage
```

### 3. Create Indexes
```bash
firebase deploy --only firestore:indexes
```

### 4. Set up Admin User

In Firebase Console:
1. Go to Authentication → Add User
2. Create admin user with email/password
3. Go to Firestore → Create collection `admins`
4. Add document with admin's UID as ID:
```json
{
  "email": "admin@nabat.ai",
  "role": "admin",
  "createdAt": "2026-09-28T00:00:00Z",
  "canAccessIdentityDocs": true
}
```

### 5. Configure API Keys

In Firebase Console → Project Settings:
- Restrict API key to your domain
- Enable only required services
- Set up App Check (recommended)

---

## 📧 Email Configuration

### Option 1: Firebase Extension

1. Install "Trigger Email" extension
2. Configure SMTP settings
3. Create email templates

### Option 2: SendGrid

1. Sign up for SendGrid
2. Create API key
3. Add to environment variables:
```
SENDGRID_API_KEY=xxx
SENDGRID_FROM_EMAIL=careers@nabat.ai
```

4. Implement email function in `/lib/email.ts`

---

## 🔒 Security Hardening

### 1. Environment Variables
- Never commit `.env.local`
- Use platform-specific secrets management
- Rotate keys regularly

### 2. Firebase Security
```bash
# Enable App Check
firebase apps:sdkconfig web --app-id YOUR_APP_ID

# Review security rules
firebase deploy --only firestore:rules --dry-run
```

### 3. HTTP Headers
Already configured in `firebase.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### 4. Rate Limiting
Consider adding:
- Cloudflare for DDoS protection
- Firebase App Check
- Custom rate limiting in API routes

---

## 📊 Monitoring & Analytics

### 1. Google Analytics
Add to `app/layout.tsx`:
```typescript
import Script from 'next/script'

// Add in head
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
```

### 2. Sentry (Error Tracking)
```bash
npm install @sentry/nextjs

npx @sentry/wizard@latest -i nextjs
```

### 3. Firebase Analytics
Already enabled with Firebase SDK

### 4. Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run type-check
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          # Add other env vars
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🧪 Post-Deployment Testing

### 1. Smoke Tests
- [ ] Homepage loads
- [ ] Application form accessible
- [ ] Admin login works
- [ ] File upload works
- [ ] Database writes work
- [ ] Email sends (if configured)

### 2. Security Tests
- [ ] HTTPS enforced
- [ ] Admin routes protected
- [ ] File upload restrictions work
- [ ] Invalid data rejected

### 3. Performance Tests
```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://careers.nabat.ai --view

# Load testing
npm install -g autocannon
autocannon -c 10 -d 30 https://careers.nabat.ai
```

---

## 📱 Domain Configuration

### DNS Settings

For `careers.nabat.ai`:

**Vercel:**
```
Type: CNAME
Name: careers
Value: cname.vercel-dns.com
```

**Firebase:**
```
Type: A
Name: careers
Value: [Firebase IP]

Type: TXT
Name: careers
Value: [Verification code]
```

---

## 🔄 Rollback Plan

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Firebase
```bash
# List releases
firebase hosting:releases:list

# Restore previous
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL TARGET_SITE_ID:live
```

---

## 📚 Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Check application submissions
- [ ] Review performance metrics
- [ ] Collect user feedback
- [ ] Fix critical bugs

### Month 1
- [ ] Analyze usage patterns
- [ ] Optimize based on data
- [ ] Plan feature improvements
- [ ] Review security logs
- [ ] Update documentation

---

## 🆘 Emergency Contacts

- **Technical Lead:** [Email/Phone]
- **Firebase Support:** Firebase Console → Support
- **Hosting Provider:** [Support URL]
- **Domain Registrar:** [Support URL]

---

## 📄 Maintenance

### Regular Tasks
- **Daily:** Check error logs, monitor submissions
- **Weekly:** Review analytics, check uptime
- **Monthly:** Security audit, dependency updates
- **Quarterly:** Full testing cycle, backup review

### Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js
npm install next@latest

# Test after updates
npm run build
npm run lint
```

---

**Deployment Date:** [Date]
**Deployed By:** [Name]
**Version:** 1.0.0
**Environment:** Production
