export type Course = {
  slug: string;
  title: string;
  category: string;
  classLevel: string;
  duration: string;
  fee: number;
  badge: string;
  description: string;
  highlights: string[];
  featured?: boolean;
};

export const courses: Course[] = [
  {
    slug: 'cbse-board-preparation',
    title: 'CBSE Board Preparation',
    category: 'Classes 9th & 10th',
    classLevel: 'Class 9-10',
    duration: 'Year-long coaching',
    fee: 34000,
    badge: 'Board Prep',
    featured: true,
    description:
      'Structured academic coaching built around concept clarity, school exams, and steady performance in board assessments.',
    highlights: ['Smart classroom practice', 'Weekly tests', 'Doubt support'],
  },
  {
    slug: 'icse-board-preparation',
    title: 'ICSE Board Preparation',
    category: 'Classes 9th & 10th',
    classLevel: 'Class 9-10',
    duration: 'Year-long coaching',
    fee: 34000,
    badge: 'Board Prep',
    description:
      'Focused academic guidance for ICSE students with a balance of concept building, writing skills, and exam readiness.',
    highlights: ['Concept-first teaching', 'Answer writing', 'Progress tracking'],
  },
  {
    slug: 'foundation-courses',
    title: 'Foundation Courses',
    category: 'Classes 9th & 10th',
    classLevel: 'Class 9-10',
    duration: 'Foundation year',
    fee: 34000,
    badge: 'Foundation',
    description:
      'A strong foundation program guiding students toward future academic excellence and competitive readiness.',
    highlights: ['Strong basics', 'Mentor guidance', 'Regular assessments'],
  },
  {
    slug: 'chemistry-coaching-11-12',
    title: 'Chemistry Coaching',
    category: 'Classes 11th & 12th',
    classLevel: 'Class 11-12',
    duration: 'November to February',
    fee: 34000,
    badge: 'PCM Core',
    description:
      'Focused coaching for Chemistry with concept-led teaching, doubt solving, and board preparation strategy.',
    highlights: ['NCERT mastery', 'Board-focused learning', 'Doubt sessions'],
  },
  {
    slug: 'chemistry-for-jee',
    title: 'Chemistry for IIT-JEE',
    category: 'JEE & NEET Preparation',
    classLevel: 'JEE Main / Advanced',
    duration: 'November to May',
    fee: 100000,
    badge: 'JEE',
    featured: true,
    description:
      'Advanced chemistry preparation designed for JEE aspirants with rigorous practice, conceptual depth, and exam strategy.',
    highlights: ['High-level problem solving', 'Advanced concepts', 'Mock tests'],
  },
  {
    slug: 'chemistry-for-neet',
    title: 'Chemistry for NEET',
    category: 'JEE & NEET Preparation',
    classLevel: 'NEET',
    duration: 'November to May',
    fee: 100000,
    badge: 'NEET',
    description:
      'NEET chemistry coaching that strengthens fundamentals, improves accuracy, and builds confidence in competitive exams.',
    highlights: ['NCERT based', 'Speed accuracy', 'Targeted revision'],
  },
  {
    slug: 'competitive-exam-preparation',
    title: 'Competitive Examination Preparation',
    category: 'JEE & NEET Preparation',
    classLevel: 'Competitive Exams',
    duration: 'November to May',
    fee: 100000,
    badge: 'Competitive',
    description:
      'A comprehensive coaching path for students preparing for elite competitive examinations with disciplined mentoring.',
    highlights: ['Exam pattern training', 'Practice tests', 'Mentorship'],
  },
];

export const featuredCourses = courses.filter((course) => course.featured);

export const stats = [
  { value: '15+', label: 'Years of experience' },
  { value: '20', label: 'Target admissions' },
  { value: '100%', label: 'Concept-focused learning' },
  { value: '₹34K', label: 'Board course fee' },
];

export const instituteHighlights = [
  'School education coaching',
  'Foundation programs',
  'IIT-JEE & NEET preparation',
  'Experienced faculty mentorship',
];
