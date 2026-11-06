export type Role = "student" | "admin";

export type FirestoreUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type FirestoreCourse = {
  id: string;
  slug: string;
  title: string;
  category: string;
  classLevel: string;
  description: string;
  duration: string;
  fee: number;
  currency: string;
  batchWindow: string;
  isPublished: boolean;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type FirestoreEnquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  courseInterest: string;
  message: string;
  source: string;
  status: string;
  createdAt: string;
};

export type FirestorePurchase = {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: "created" | "paid" | "failed" | "refunded";
  purchasedAt: string;
  verifiedAt: string | null;
};

export type FirestoreCourseAccess = {
  id: string;
  userId: string;
  courseId: string;
  purchaseId: string;
  accessStatus: "granted" | "revoked";
  grantedAt: string;
};

export type FirestoreSiteSettings = {
  instituteName: string;
  teacherName: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
};

export const mockCourses: FirestoreCourse[] = [
  {
    id: "course_cbse_1",
    slug: "cbse-board-preparation",
    title: "CBSE Board Preparation",
    category: "Classes 9th & 10th",
    classLevel: "Class 9-10",
    description: "Comprehensive board preparation focused on concept clarity and exam performance.",
    duration: "Year-long coaching",
    fee: 34000,
    currency: "INR",
    batchWindow: "Year-long program",
    isPublished: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "course_jee_chem_1",
    slug: "chemistry-for-jee",
    title: "Chemistry for IIT-JEE",
    category: "JEE & NEET Preparation",
    classLevel: "JEE Main / Advanced",
    description: "Advanced chemistry strategy and deep conceptual preparation for JEE aspirants.",
    duration: "November to May",
    fee: 100000,
    currency: "INR",
    batchWindow: "November to May",
    isPublished: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "course_neet_chem_1",
    slug: "chemistry-for-neet",
    title: "Chemistry for NEET",
    category: "JEE & NEET Preparation",
    classLevel: "NEET",
    description: "NEET-focused chemistry training built around NCERT mastery and competitive accuracy.",
    duration: "November to May",
    fee: 100000,
    currency: "INR",
    batchWindow: "November to May",
    isPublished: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockUsers: FirestoreUser[] = [
  {
    uid: "admin-demo-user",
    email: "admin@conceptinsolution.com",
    displayName: "ConceptnSolution Admin",
    photoURL: "",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: "student-demo-user",
    email: "student@conceptinsolution.com",
    displayName: "Demo Student",
    photoURL: "",
    role: "student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockEnquiries: FirestoreEnquiry[] = [
  {
    id: "enquiry_1",
    name: "Arjun Verma",
    phone: "+91 98765 43210",
    email: "arjun@example.com",
    courseInterest: "Chemistry for IIT-JEE",
    message: "Interested in the JEE Chemistry batch and admission process.",
    source: "homepage",
    status: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "enquiry_2",
    name: "Meher Sharma",
    phone: "+91 99887 66554",
    email: "meher@example.com",
    courseInterest: "CBSE Board Preparation",
    message: "Need support for class 10 board coaching and schedule details.",
    source: "contact",
    status: "contacted",
    createdAt: new Date().toISOString(),
  },
];

export const mockPurchases: FirestorePurchase[] = [
  {
    id: "purchase_1",
    userId: "student-demo-user",
    courseId: "course_jee_chem_1",
    amount: 100000,
    currency: "INR",
    razorpayOrderId: "order_demo_001",
    razorpayPaymentId: "pay_demo_001",
    status: "paid",
    purchasedAt: new Date().toISOString(),
    verifiedAt: new Date().toISOString(),
  },
];

export const mockCourseAccess: FirestoreCourseAccess[] = [
  {
    id: "course_access_1",
    userId: "student-demo-user",
    courseId: "course_jee_chem_1",
    purchaseId: "purchase_1",
    accessStatus: "granted",
    grantedAt: new Date().toISOString(),
  },
];

export const mockSiteSettings: FirestoreSiteSettings = {
  instituteName: "ConceptnSolution",
  teacherName: "Dheeraj Sir",
  experience: "15+ Years",
  location: "Gurugram, Haryana",
  email: "admissions@conceptinsolution.com",
  phone: "+91 98765 43210",
};
