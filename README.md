Great — here is the concrete implementation roadmap and starter blueprint for the v1 build.

1) Final architecture decision
This is the stack I recommend locking in before coding:

- Frontend: Next.js
- Backend/app logic: Next.js server routes and server actions
- Authentication: Firebase Authentication with Google Sign-In
- Database: Firestore
- Media/storage: Firebase Storage
- Payments: Razorpay
- Admin logic: Firebase role-based auth + Firestore-driven admin dashboard
- Hosting: Vercel + Firebase
- Security model: verification of payments on the server, never trusting frontend-only success

2) Product scope for v1
Must-have:
- Public homepage
- About page with Dheeraj Sir profile and 15+ years experience
- Course catalog page
- Course detail pages with fees and durations
- Google login
- Enquiry/admission form
- Razorpay checkout
- Student dashboard with purchased courses
- Gated course content for paid users
- Minimal admin dashboard

Out of scope for v1:
- Parent accounts
- Multi-branch operations
- Full LMS with forum/chat
- Complex analytics dashboard
- Custom user management beyond Firebase roles
- Separate SQL database

3) Core user journeys

A. Visitor journey
- Land on homepage
- See institute credibility
- Browse courses
- Click course CTA
- If interested:
  - login with Google
  - go to checkout
  - pay through Razorpay
  - receive access
- If not buying immediately:
  - submit enquiry form

B. Student journey
- Sign in with Google
- View course catalog
- Purchase course
- Verify payment on server
- Dashboard shows purchased course
- Access allowed to content pages

C. Admin journey
- Admin logs in
- Views leads, purchases, and courses
- Updates fee/duration/status
- Marks enquiry as contacted or converted

4) Recommended route structure

Public:
- /
- /about
- /courses
- /courses/[slug]
- /contact
- /login

Student protected:
- /dashboard
- /dashboard/courses
- /dashboard/course/[slug]
- /checkout/[courseId]
- /payment/success
- /payment/failure

Admin protected:
- /admin
- /admin/courses
- /admin/enquiries
- /admin/purchases

5) Firestore schema

Users
- uid
- email
- displayName
- photoURL
- role: student | admin
- createdAt
- updatedAt

Courses
- id
- slug
- title
- category
- classLevel
- description
- duration
- fee
- currency
- batchWindow
- isPublished
- thumbnailUrl
- createdAt
- updatedAt

Enquiries
- id
- name
- phone
- email
- courseInterest
- message
- source
- status
- createdAt

Purchases
- id
- userId
- courseId
- amount
- currency
- razorpayOrderId
- razorpayPaymentId
- status
- purchasedAt
- verifiedAt

CourseAccess
- id
- userId
- courseId
- purchaseId
- accessStatus
- grantedAt

SiteSettings
- instituteName
- teacherName
- experience
- location
- email
- phone

6) Auth and role model

Use Firebase Auth with Google Sign-In only.

Role logic:
- New user created: student
- Admin user created manually by setting role in Firestore
- Student route requires auth
- Admin route requires auth + role == admin

Recommended Firestore rule logic:
- public read for courses
- user can read/write own profile
- admin can read/write courses, enquiries, purchases
- student can read own purchases and own course access

7) Payment flow

Exact secure flow:
- Student clicks Buy Now
- Frontend requests order creation from backend
- Backend validates course and user
- Backend creates Razorpay order
- Frontend opens Razorpay checkout
- Student pays
- Frontend sends order/payment details to /api/payments/verify
- Backend verifies signature using Razorpay secret
- Backend creates purchase record and grants access
- Redirect to dashboard with success state

Never allow:
- Payment success from frontend alone to trigger access
- Access grant from client-side only
- Payment verification skipped in production

8) Course access policy
You chose:
- Public marketing pages
- Gated content after payment verification

This means:
- /courses/[slug] can show overview, fees, duration, and CTA
- Actual lesson content remains hidden until purchase is verified
- /dashboard/course/[slug] is only accessible if:
  - user is authenticated
  - purchase exists
  - status = paid
  - courseAccess record exists

9) Frontend page wireframe

Homepage:
- Navbar
- Hero section
- Why choose us
- Teacher profile
- Course categories
- Featured courses
- Fee/duration highlights
- Enquiry form
- Contact details
- Footer

Course page:
- Course title
- Class level
- Duration
- Fee
- Description
- Highlights
- Batch timing
- CTA buttons:
  - Enquire now
  - Buy now

Dashboard:
- Welcome message
- Purchased course cards
- Access links
- Upcoming classes
- Payment history

Admin dashboard:
- Stats cards
- Courses table
- Enquiries table
- Purchases table
- Quick actions

10) Minimal admin features for v1
- Add/edit course
- Change fee and duration
- Publish/unpublish course
- View all enquiries
- Update enquiry status
- Review purchases
- Confirm payment verification state

This keeps the admin layer simple and avoids unnecessary complexity.

11) Firebase rules and security checklist
Required:
- Keep API keys public only where safe
- Keep Razorpay secret server-only
- Use server-side route handlers for all payment verification
- Restrict admin-only writes
- Protect course access checks server-side
- Do not expose all purchase data to all students

12) Recommended file structure
This is the starter structure I recommend:

- app/
  - (public)
  - (student)
  - (admin)
  - api/payments/create-order
  - api/payments/verify
  - api/auth/sync-user
- components/
  - Navbar
  - Footer
  - HeroSection
  - CourseCard
  - TeacherProfile
  - EnquiryForm
  - GoogleSignInButton
  - RazorpayCheckout
  - AdminCourseForm
  - AdminEnquiryTable
- lib/
  - firebase/client.ts
  - firebase/admin.ts
  - razorpay/create-order.ts
  - razorpay/verify-payment.ts
  - auth/withAuth.ts
- services/
  - courseService.ts
  - enquiryService.ts
  - purchaseService.ts
- types/
  - course.ts
  - user.ts
  - purchase.ts
  - enquiry.ts

13) Development roadmap
Phase 1 — Foundation
- Create Next.js app
- Firebase setup
- Auth + Firestore config
- Basic homepage
- Navbar/footer
- Google sign-in button

Phase 2 — Product pages
- Course catalog
- Course detail page
- About page
- Contact form
- Enquiry flow

Phase 3 — Payment and access
- Create Razorpay order
- Verify payment
- Save purchase
- Grant course access
- Restrict lesson access

Phase 4 — Student dashboard
- Purchased course cards
- Course access pages
- User profile info

Phase 5 — Admin panel
- Course CRUD
- Lead tracking
- Purchase status
- Basic analytics

Phase 6 — Production polish
- SEO metadata
- Responsive testing
- Deployment
- Error handling
- QA on payment flow

14) Important implementation guidelines
- Use server routes for payments and user security
- Keep business logic off the client
- Store all critical states in Firestore
- Properly validate all forms
- Use clean slug-based routes for courses
- Reuse Firebase auth session for role checks
- Add a fallback flow for failed payments and duplicate purchases

15) Immediate next step
The next move should be:
- Create the project scaffold
- Set up Firebase config
- Set up Razorpay keys
- Define exact Firestore collections in code
- Build the public homepage and course catalog

If you want, I can now produce the exact implementation checklist for the first 7 days, or I can scaffold the actual project structure and starter files for you.