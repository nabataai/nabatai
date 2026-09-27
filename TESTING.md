# Testing Guide - Nabat AI Job Application Portal

This document provides comprehensive testing instructions for the Nabat AI recruitment application system.

## 🧪 Testing Checklist

### 1. Application Form Testing

#### Step 1: Personal Information
- [ ] All required fields validate correctly (First Name, Last Name, Full Legal Name, Email, Confirm Email, Nationality, Country of Residence, Primary Phone)
- [ ] Email confirmation validates matching emails
- [ ] Email format validation works
- [ ] Phone number accepts international formats
- [ ] Optional fields can be left blank
- [ ] LinkedIn URL validation works (accepts valid URLs or empty)
- [ ] Date of birth selector works
- [ ] Country dropdowns populate correctly
- [ ] Form saves to localStorage on input
- [ ] "Continue" button advances to Step 2

#### Step 2: Professional Information
- [ ] Current job title and company are required
- [ ] Years of experience dropdown works
- [ ] Areas of expertise multi-select allows multiple selections
- [ ] At least one area of expertise is required
- [ ] Optional fields work (salary, notice period, etc.)
- [ ] Date picker for earliest start date works
- [ ] Back button returns to Step 1 with saved data
- [ ] Continue button advances to Step 3

#### Step 3: Executive Experience
- [ ] Leadership experience toggle works
- [ ] "Add Position" button creates new position form
- [ ] All leadership position fields validate
- [ ] "Remove" button deletes positions
- [ ] Multiple positions can be added
- [ ] Month picker for dates works
- [ ] Optional checkboxes for experience types work
- [ ] Conditional text areas appear when checkboxes are checked
- [ ] Character limits work on text areas
- [ ] Form validates before allowing continue

#### Step 4: GCC/UAE Experience
- [ ] UAE experience toggle works
- [ ] Add UAE experience creates new record
- [ ] UAE cities dropdown works
- [ ] Remove button works for UAE experience
- [ ] UAE visit checkbox shows/hides fields correctly
- [ ] GCC experience checkbox works
- [ ] GCC countries multi-select works
- [ ] Optional description field works with character limit
- [ ] Form validates correctly

#### Step 5: Work Authorization
- [ ] UAE visa checkbox works
- [ ] Visa type and expiry date appear when checked
- [ ] Work authorization radio buttons work (only one selectable)
- [ ] All three options validate
- [ ] Relocation preference radio buttons work
- [ ] Passport checkbox works
- [ ] Information notices display correctly
- [ ] Form validates required fields

#### Step 6: Documents Upload
- [ ] CV/Resume upload is required
- [ ] File drag-and-drop works
- [ ] File click-to-upload works
- [ ] File type validation works (rejects invalid types)
- [ ] File size validation works (rejects oversized files)
- [ ] PDF, DOC, DOCX files are accepted for documents
- [ ] JPG, PNG, PDF accepted for identity docs
- [ ] Uploaded file displays with name and size
- [ ] Remove file button works
- [ ] Optional uploads work
- [ ] Privacy notices display
- [ ] Cannot continue without required CV

#### Step 7: Motivation & Role Fit
- [ ] All 10 text areas are required
- [ ] Minimum character validation works (50-100 chars)
- [ ] Maximum character limits work (800-1200 chars)
- [ ] Character counters update in real-time
- [ ] Validation errors display clearly
- [ ] Form data persists on page refresh
- [ ] Long text wraps correctly
- [ ] Copy-paste works in all fields

#### Step 8: References & Submission
- [ ] References are optional
- [ ] Add reference button works (max 3)
- [ ] Reference fields validate (name, email, phone)
- [ ] Remove reference works
- [ ] All three checkboxes are required
- [ ] Privacy policy link works
- [ ] Submit button shows loading state
- [ ] Form validates all required checkboxes before submission
- [ ] Cannot submit without confirming declarations

---

### 2. Form Persistence & Recovery

- [ ] Form data auto-saves every 1 second
- [ ] Refreshing page preserves all entered data
- [ ] Closing browser and reopening preserves data
- [ ] Step navigation preserves data
- [ ] localStorage contains form data
- [ ] Files are re-attached on page refresh
- [ ] After submission, localStorage is cleared

---

### 3. Success Page

- [ ] Success page displays after submission
- [ ] Application number is generated and displayed
- [ ] Submission date is correct
- [ ] Position information is accurate
- [ ] Next steps are clearly outlined
- [ ] Contact information is displayed
- [ ] Links to Nabat.ai work
- [ ] Back to home button works
- [ ] Page is responsive on all devices

---

### 4. Admin Authentication

- [ ] Login page loads correctly
- [ ] Demo credentials work (admin@nabat.ai / demo123)
- [ ] Invalid credentials show error
- [ ] Empty fields show validation errors
- [ ] Loading state shows during login
- [ ] Successful login redirects to dashboard
- [ ] Unauthenticated users redirected to login
- [ ] Logout button works
- [ ] Session persists on page refresh

---

### 5. Admin Dashboard

#### Statistics
- [ ] Total applications count is correct
- [ ] Status counts are accurate (New, In Review, Shortlisted, etc.)
- [ ] Clicking status cards filters applications
- [ ] All statistics update correctly

#### Search & Filter
- [ ] Search by name works
- [ ] Search by email works
- [ ] Search by application number works
- [ ] Status filter buttons work
- [ ] "All" button shows all applications
- [ ] Multiple filters work together
- [ ] Search is case-insensitive
- [ ] No results message shows when appropriate

#### Applications List
- [ ] All applications display in list
- [ ] Application cards show correct information
- [ ] Status badges display correct colors
- [ ] UAE/GCC experience badges show when applicable
- [ ] Email and phone display correctly
- [ ] Submission date formats correctly
- [ ] Clicking application opens detail page
- [ ] Hover effects work
- [ ] List is responsive on mobile

---

### 6. Application Detail Page

#### Display
- [ ] All personal information displays correctly
- [ ] Professional background shows completely
- [ ] Leadership positions display properly
- [ ] GCC/UAE experience renders correctly
- [ ] All sections are readable
- [ ] LinkedIn link works (opens in new tab)
- [ ] Application number displays

#### Actions
- [ ] Status dropdown shows all options
- [ ] Changing status works
- [ ] Recruiter notes textarea works
- [ ] Save button updates application
- [ ] Loading state shows during save
- [ ] Success message displays after save
- [ ] Back button returns to dashboard
- [ ] Quick info sidebar displays correctly

---

### 7. Responsive Design Testing

#### Mobile (320px - 767px)
- [ ] Landing page is readable
- [ ] Navigation works
- [ ] Form fields are usable
- [ ] Buttons are touchable (min 44x44px)
- [ ] Step indicator is compact
- [ ] Text is readable (no tiny fonts)
- [ ] Images scale properly
- [ ] File upload works on touch
- [ ] Admin dashboard is usable
- [ ] No horizontal scrolling

#### Tablet (768px - 1023px)
- [ ] Layout uses tablet breakpoints
- [ ] Two-column layouts work
- [ ] Navigation is optimized
- [ ] Form is comfortable to use
- [ ] Dashboard cards layout nicely
- [ ] Application list is readable

#### Desktop (1024px+)
- [ ] Full layout displays properly
- [ ] Sidebar layouts work
- [ ] Multi-column grids display
- [ ] Hover states work
- [ ] Mouse interactions are smooth
- [ ] Admin interface is efficient

---

### 8. Accessibility Testing

#### Keyboard Navigation
- [ ] Tab order is logical
- [ ] All interactive elements are keyboard-accessible
- [ ] Focus indicators are visible
- [ ] Escape key closes modals
- [ ] Enter submits forms
- [ ] Arrow keys work in dropdowns

#### Screen Reader
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Status changes are announced
- [ ] Images have alt text
- [ ] Buttons have descriptive labels
- [ ] ARIA labels are correct

#### Visual
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] UI is usable without color alone
- [ ] Focus indicators are visible
- [ ] Text can be resized to 200%
- [ ] No content loss at 400% zoom

---

### 9. Security Testing

#### Form Validation
- [ ] XSS attempts are sanitized
- [ ] SQL injection attempts fail
- [ ] File upload rejects executables
- [ ] Email validation prevents injection
- [ ] Phone validation works correctly

#### Admin Access
- [ ] Unauthenticated users cannot access admin routes
- [ ] Direct URL access to /admin/* redirects to login
- [ ] Session expiry works
- [ ] Logout clears session
- [ ] Admin-only data not exposed in client

#### File Upload
- [ ] Only allowed file types accepted
- [ ] File size limits enforced
- [ ] Malicious files rejected (if scanner enabled)
- [ ] Files stored securely
- [ ] Download URLs are not public

---

### 10. Performance Testing

- [ ] Landing page loads in < 2 seconds
- [ ] Form steps load instantly
- [ ] File uploads show progress
- [ ] Large files upload successfully
- [ ] Dashboard loads in < 3 seconds
- [ ] Search is responsive
- [ ] Images are optimized
- [ ] No memory leaks on long sessions

---

### 11. Browser Compatibility

#### Chrome/Edge
- [ ] All features work
- [ ] Styling is correct
- [ ] File upload works
- [ ] No console errors

#### Firefox
- [ ] All features work
- [ ] Styling is correct
- [ ] File upload works
- [ ] No console errors

#### Safari (Desktop & iOS)
- [ ] All features work
- [ ] Styling is correct
- [ ] File upload works
- [ ] Date pickers work
- [ ] No console errors

---

### 12. Data Integrity

#### Application Submission
- [ ] All form data is saved correctly
- [ ] Files are associated with application
- [ ] Application number is unique
- [ ] Timestamps are accurate
- [ ] Status is set to "new"
- [ ] Email queue entry is created

#### Database
- [ ] Firestore rules prevent unauthorized access
- [ ] Storage rules enforce file restrictions
- [ ] Audit logs are created
- [ ] Indexes work correctly
- [ ] Data structure matches schema

---

## 🚀 Running Tests

### Manual Testing
1. Clear browser cache and localStorage
2. Test complete flow from landing to submission
3. Test admin flow from login to application review
4. Test on multiple devices and browsers
5. Test with slow network connection

### Automated Testing (Future)
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

---

## 🐛 Bug Reporting

When reporting bugs, include:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser and device**
5. **Screenshots/videos**
6. **Console errors**

---

## ✅ Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Firebase rules deployed
- [ ] Environment variables configured
- [ ] Demo credentials changed
- [ ] SSL certificate installed
- [ ] Error tracking enabled (Sentry)
- [ ] Analytics configured
- [ ] Performance monitoring active
- [ ] Backup procedures in place
- [ ] Security headers configured
- [ ] GDPR compliance reviewed

---

## 📊 Test Results Template

```markdown
## Test Session: [Date]
**Tester:** [Name]
**Environment:** [Production/Staging/Local]
**Browser:** [Chrome/Firefox/Safari]
**Device:** [Desktop/Mobile/Tablet]

### Results
- Tests Passed: X/Y
- Tests Failed: Z
- Blockers: [List]
- Notes: [Additional observations]

### Failed Tests
1. [Test Name] - [Description of failure]
2. [Test Name] - [Description of failure]
```

---

## 🎯 Success Criteria

The application is considered ready for production when:
- ✅ All critical tests pass
- ✅ No blocker bugs remain
- ✅ Security audit complete
- ✅ Performance benchmarks met
- ✅ Accessibility standards met
- ✅ Cross-browser compatibility confirmed
- ✅ Mobile experience is excellent
- ✅ Admin workflows are efficient
- ✅ Data security is verified

---

**Last Updated:** [Current Date]
**Next Review:** [Schedule]
