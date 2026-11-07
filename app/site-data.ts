export type CourseFaq = {
  question: string;
  answer: string;
};

export type CourseModule = {
  number: string;
  title: string;
  description: string;
  topics: string[];
};

export type CourseApproachStep = {
  step: string;
  title: string;
  description: string;
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  classLevel: string;
  duration: string;
  fee: number;
  badge: string;
  featured?: boolean;
  mentor: string;
  image: string;
  imageAlt: string;
  description: string;
  longDescription: string[];
  highlights: string[];
  learningOutcomes: string[];
  curriculumModules: CourseModule[];
  idealFor: string[];
  learningApproach: CourseApproachStep[];
  faqs: CourseFaq[];
  seoTitle: string;
  seoDescription: string;
};

export const courses: Course[] = [
  {
    slug: 'cbse-board-preparation',
    title: 'CBSE Board Preparation',
    tagline: 'Concept-first academic mastery for Classes 9th & 10th CBSE examinations',
    category: 'Classes 9th & 10th',
    classLevel: 'Class 9-10',
    duration: 'Year-long coaching',
    fee: 34000,
    badge: 'Board Prep',
    featured: true,
    mentor: 'Dheeraj Sir',
    image:
      'https://images.unsplash.com/photo-1686624386665-4cd01b96d0f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    imageAlt: 'CBSE Class 9 and 10 students studying with structured notes and guidance',
    description:
      'Structured academic coaching built around concept clarity, school exams, and steady performance in board assessments.',
    longDescription: [
      'Our CBSE Board Preparation program for Classes 9th and 10th is designed to help students move beyond rote memorization and develop genuine conceptual understanding. Every chapter is taught from first principles aligned with the latest NCERT guidelines and CBSE competency-based examination patterns.',
      'Under the direct academic mentorship of Dheeraj Sir, learners practice structured answer writing, diagram accuracy, and time management through weekly unit assessments and cumulative pre-board test series—ensuring complete confidence in school and board examinations.',
    ],
    highlights: [
      'Smart classroom practice',
      'Weekly tests',
      'Doubt support',
      'NCERT & Exemplar coverage',
    ],
    learningOutcomes: [
      'Thorough command over every NCERT textbook chapter, in-text question, and exemplar problem.',
      'Mastery of CBSE competency-based, case-study, and assertion-reasoning question formats.',
      'Stepwise answer presentation techniques that maximize marks according to official CBSE marking schemes.',
      'Consistent exam temperament developed through regular weekly tests and timed feedback sessions.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'Core Concept & NCERT Foundation',
        description:
          'Building crystal-clear understanding of fundamental concepts with detailed classroom notes and real-world examples.',
        topics: [
          'Line-by-line NCERT concept breakdown',
          'Formula derivations & core definitions',
          'In-class guided problem solving',
        ],
      },
      {
        number: '02',
        title: 'Competency & Application Drills',
        description:
          'Translating theory into problem-solving ability across objective, short-answer, and case-based questions.',
        topics: [
          'NCERT Exemplar & HOTS questions',
          'Assertion-Reasoning & Case-Study drills',
          'Chapter-wise practice worksheets',
        ],
      },
      {
        number: '03',
        title: 'Board Answer Writing & Revision',
        description:
          'Refining how students structure answers, draw neat diagrams, and manage time under exam conditions.',
        topics: [
          'CBSE marking-scheme answer formatting',
          'Previous years board question analysis',
          'Full-syllabus revision & doubt clearing',
        ],
      },
    ],
    idealFor: [
      'Class 9 and Class 10 CBSE students aiming for strong school and board examination scores.',
      'Learners who want clear explanations of fundamentals rather than last-minute cramming.',
      'Students seeking regular weekly testing, disciplined study habits, and personal doubt resolution.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'Clear explanation of core NCERT ideas, definitions, and scientific fundamentals.',
      },
      {
        step: '02',
        title: 'Application',
        description: 'Guided worksheet practice that converts classroom theory into exam readiness.',
      },
      {
        step: '03',
        title: 'Revision & Testing',
        description: 'Weekly chapter tests, answer-sheet reviews, and structured doubt solving.',
      },
    ],
    faqs: [
      {
        question: 'Which classes are covered under the CBSE Board Preparation course?',
        answer:
          'This program is specifically structured for students in Class 9 and Class 10 following the CBSE curriculum.',
      },
      {
        question: 'How are doubts resolved during the year-long coaching?',
        answer:
          'Dedicated doubt-support sessions are conducted regularly alongside classroom lectures so students can clarify questions from school homework, NCERT exercises, and weekly tests.',
      },
      {
        question: 'Does the course cover the latest CBSE competency-based questions?',
        answer:
          'Yes. Our worksheets and weekly assessments include MCQs, assertion-reasoning items, and case-study questions aligned with current CBSE board patterns.',
      },
      {
        question: 'What is the duration and fee for this program?',
        answer:
          'It is a comprehensive year-long coaching program with a total course fee of ₹34,000.',
      },
    ],
    seoTitle: 'CBSE Board Preparation (Class 9 & 10) in Gurugram | ConceptnSolution',
    seoDescription:
      'Enrol in year-long CBSE Board Preparation for Classes 9th & 10th at ConceptnSolution, Gurugram. Concept-first teaching, weekly tests, and doubt support by Dheeraj Sir.',
  },
  {
    slug: 'icse-board-preparation',
    title: 'ICSE Board Preparation',
    tagline: 'Analytical depth, precision answer writing, and subject mastery for ICSE students',
    category: 'Classes 9th & 10th',
    classLevel: 'Class 9-10',
    duration: 'Year-long coaching',
    fee: 34000,
    badge: 'Board Prep',
    featured: true,
    mentor: 'Dheeraj Sir',
    image:
      'https://images.unsplash.com/photo-1635626730632-1b06dae8371a?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    imageAlt: 'ICSE student practicing analytical problem solving and structured answer writing',
    description:
      'Focused academic guidance for ICSE students with a balance of concept building, writing skills, and exam readiness.',
    longDescription: [
      'The ICSE curriculum demands thorough conceptual depth, precise technical terminology, and strong analytical writing skills. Our ICSE Board Preparation program for Classes 9th and 10th is tailored specifically to meet the rigorous standards of CISCE examinations.',
      'Students are trained to understand every topic in depth, write concise keyword-rich answers, and tackle application-oriented questions with confidence. Continuous progress tracking ensures steady improvement across every school term.',
    ],
    highlights: [
      'Concept-first teaching',
      'Answer writing',
      'Progress tracking',
      'ICSE pattern assessments',
    ],
    learningOutcomes: [
      'Deep comprehension of vast ICSE syllabus topics with structured, easy-to-revise summary notes.',
      'Precision in writing technical definitions, chemical equations, and analytical explanations.',
      'Strong command over both Section A compulsory objective questions and Section B descriptive problems.',
      'Measurable improvement across school unit tests, half-yearly exams, and final ICSE board assessments.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'In-Depth Syllabus Mastery',
        description:
          'Comprehensive coverage of ICSE Class 9 & 10 concepts with emphasis on clarity and logical connections.',
        topics: [
          'Detailed topic-by-topic lectures',
          'Concise revision notes & concept maps',
          'Numerical & analytical problem drills',
        ],
      },
      {
        number: '02',
        title: 'ICSE Precision Answer Writing',
        description:
          'Training students to present answers with the exact keywords and structure expected by ICSE examiners.',
        topics: [
          'Keyword-focused descriptive answers',
          'Equation balancing & diagram precision',
          'Avoiding common presentation pitfalls',
        ],
      },
      {
        number: '03',
        title: 'Progress Tracking & Mock Exams',
        description:
          'Regular topic evaluations and full-length practice papers with personalized feedback.',
        topics: [
          'Section A & Section B timed practice',
          'Individual performance tracking',
          'Targeted revision of weak chapters',
        ],
      },
    ],
    idealFor: [
      'Class 9 and Class 10 ICSE students looking for structured, syllabus-aligned academic coaching.',
      'Students who understand concepts but want to improve how they express answers in descriptive exams.',
      'Learners seeking personalized progress tracking and consistent mentor guidance.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'Thorough explanation of extensive ICSE syllabus topics from the ground up.',
      },
      {
        step: '02',
        title: 'Application & Writing',
        description: 'Practicing analytical questions and structured ICSE answer presentation.',
      },
      {
        step: '03',
        title: 'Revision',
        description: 'Continuous progress tracking, mock papers, and one-on-one doubt clearing.',
      },
    ],
    faqs: [
      {
        question: 'How is the ICSE coaching different from CBSE coaching?',
        answer:
          'The ICSE syllabus has distinct depth and question formats. Our teaching, notes, and test papers are specifically designed around ICSE marking schemes, technical terminology, and Section A/B paper patterns.',
      },
      {
        question: 'How do you help students improve their answer writing skills?',
        answer:
          'We evaluate test sheets in detail, highlighting missing keywords, step marks, and presentation improvements so students learn to write clear, high-scoring answers.',
      },
      {
        question: 'How is student progress tracked throughout the year?',
        answer:
          'Regular chapter tests and cumulative assessments are conducted, and performance trends are reviewed with students to strengthen weaker areas early.',
      },
      {
        question: 'What is the fee and duration of the ICSE Board Preparation program?',
        answer:
          'This is a year-long coaching program for Class 9–10 students with a course fee of ₹34,000.',
      },
    ],
    seoTitle: 'ICSE Board Preparation (Class 9 & 10) Coaching | ConceptnSolution Gurugram',
    seoDescription:
      'Specialized ICSE Class 9 & 10 coaching in Gurugram by Dheeraj Sir. Concept-first teaching, precision answer writing, and continuous progress tracking.',
  },
  {
    slug: 'foundation-courses',
    title: 'Foundation Courses',
    tagline: 'Early analytical conditioning bridging school studies with future JEE & NEET readiness',
    category: 'Classes 9th & 10th',
    classLevel: 'Class 9-10',
    duration: 'Foundation year',
    fee: 34000,
    badge: 'Foundation',
    featured: true,
    mentor: 'Dheeraj Sir',
    image:
      'https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?q=80&w=1170&auto=format&fit=crop',
    imageAlt: 'Foundation course students developing analytical and scientific thinking skills',
    description:
      'A strong foundation program guiding students toward future academic excellence and competitive readiness.',
    longDescription: [
      'Success in competitive examinations like IIT-JEE and NEET starts with how a student learns science and mathematics in Classes 9 and 10. Our Foundation Course bridges the gap between standard school curricula and the analytical thinking required in senior secondary classes.',
      'Without overwhelming students, Dheeraj Sir nurtures scientific curiosity, logical deduction, and numerical confidence—ensuring learners excel in their school board exams while stepping into Class 11 with a decisive academic advantage.',
    ],
    highlights: [
      'Strong basics',
      'Mentor guidance',
      'Regular assessments',
      'Competitive aptitude building',
    ],
    learningOutcomes: [
      'Rock-solid grasp of fundamental scientific principles and mathematical applications.',
      'Ability to approach unfamiliar, multi-step analytical questions with calm logic.',
      'Seamless transition from Class 10 board level to Class 11 JEE/NEET syllabus rigor.',
      'Disciplined study routines, note-making habits, and regular self-assessment skills.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'Strengthening Core Fundamentals',
        description:
          'Ensuring complete clarity in Class 9 & 10 school topics before extending into deeper applications.',
        topics: [
          'Deep dive into core scientific principles',
          'Zero-memorization conceptual learning',
          'School & board syllabus alignment',
        ],
      },
      {
        number: '02',
        title: 'Analytical & Numerical Conditioning',
        description:
          'Introducing higher-order thinking and quantitative problem solving at a comfortable pace.',
        topics: [
          'Multi-concept application problems',
          'Scientific reasoning & data interpretation',
          'Early introduction to Class 11 bridge concepts',
        ],
      },
      {
        number: '03',
        title: 'Assessment & Mentorship',
        description:
          'Regular objective and subjective testing paired with personal mentorship from Dheeraj Sir.',
        topics: [
          'Periodic foundation level tests',
          'Time-management & accuracy habits',
          'Individual feedback & doubt clinics',
        ],
      },
    ],
    idealFor: [
      'Class 9 and 10 students who plan to pursue Science (PCM/PCB) in Classes 11 and 12.',
      'Future IIT-JEE and NEET aspirants who want to build an early conceptual edge.',
      'Learners who enjoy understanding the "why" and "how" behind scientific concepts.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'Establishing strong basics that serve both school exams and future entrance tests.',
      },
      {
        step: '02',
        title: 'Application',
        description: 'Developing logical reasoning through graded analytical problem sets.',
      },
      {
        step: '03',
        title: 'Revision',
        description: 'Regular assessments and close mentor guidance to track conceptual growth.',
      },
    ],
    faqs: [
      {
        question: 'Will the Foundation Course affect my child’s regular school exam preparation?',
        answer:
          'Not at all—in fact, it strengthens school performance. We build from the school syllabus upward so students score high in school exams while developing deeper analytical skills.',
      },
      {
        question: 'Who should enrol in the Foundation Course?',
        answer:
          'Any Class 9 or 10 student who wishes to build strong basics in science and prepare smoothly for Class 11–12 and future JEE/NEET studies.',
      },
      {
        question: 'Who mentors the students in this program?',
        answer:
          'Classes and mentorship are led by Dheeraj Sir, drawing on 15+ years of teaching experience across school and competitive levels.',
      },
      {
        question: 'What is the duration and fee for the Foundation Course?',
        answer:
          'The program runs for a full foundation year with a course fee of ₹34,000.',
      },
    ],
    seoTitle: 'Class 9 & 10 Foundation Course for JEE/NEET in Gurugram | ConceptnSolution',
    seoDescription:
      'Build strong basics and competitive readiness early with our Foundation Course for Classes 9th & 10th at ConceptnSolution, Gurugram. Mentored by Dheeraj Sir.',
  },
  {
    slug: 'chemistry-coaching-11-12',
    title: 'Chemistry Coaching',
    tagline: 'Complete Physical, Organic & Inorganic Chemistry mastery for Classes 11th & 12th',
    category: 'Classes 11th & 12th',
    classLevel: 'Class 11-12',
    duration: 'November to February',
    fee: 34000,
    badge: 'PCM Core',
    featured: true,
    mentor: 'Dheeraj Sir',
    image:
      'https://plus.unsplash.com/premium_photo-1681426678542-613c306013e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    imageAlt: 'Senior secondary Chemistry coaching session with Dheeraj Sir',
    description:
      'Focused coaching for Chemistry with concept-led teaching, doubt solving, and board preparation strategy.',
    longDescription: [
      'Chemistry in Classes 11 and 12 often feels overwhelming when treated as a collection of isolated reactions and formulas. Our specialized Chemistry Coaching program transforms Physical, Organic, and Inorganic Chemistry into a logical, interconnected subject.',
      'Running intensively from November to February under Dheeraj Sir, this course emphasizes complete NCERT mastery, mechanism-based organic chemistry, step-by-step physical chemistry numericals, and targeted board examination strategy.',
    ],
    highlights: [
      'NCERT mastery',
      'Board-focused learning',
      'Doubt sessions',
      'Organic & Physical numerical clarity',
    ],
    learningOutcomes: [
      'Complete command over NCERT Class 11 and 12 Chemistry textbook exercises and exemplar problems.',
      'Logical understanding of Organic Chemistry reaction mechanisms, named reactions, and conversions.',
      'Confidence in solving Physical Chemistry numericals with accurate units and stepwise working.',
      'Structured revision of Inorganic Chemistry trends, coordination compounds, and board-weightage topics.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'Physical Chemistry & Numericals',
        description:
          'Mastering core physical principles, formulas, and calculation techniques for full step-marks.',
        topics: [
          'Thermodynamics, Equilibrium & Kinetics',
          'Solutions & Electrochemistry numericals',
          'Stepwise board numerical presentation',
        ],
      },
      {
        number: '02',
        title: 'Organic Chemistry & Mechanisms',
        description:
          'Understanding electron movement, functional group transformations, and named reactions without rote learning.',
        topics: [
          'General Organic Chemistry (GOC) & Isomerism',
          'Named reactions & mechanism pathways',
          'Organic conversions & distinction tests',
        ],
      },
      {
        number: '03',
        title: 'Inorganic Mastery & Board Strategy',
        description:
          'Consolidating periodic trends, bonding, coordination compounds, and full-length board paper practice.',
        topics: [
          'Chemical Bonding & Coordination Chemistry',
          'Line-by-line NCERT Inorganic highlights',
          'Past board paper drills & doubt sessions',
        ],
      },
    ],
    idealFor: [
      'Class 11 and Class 12 science students seeking crystal-clear understanding in Chemistry.',
      'Learners preparing for upcoming school finals and Class 12 Board Examinations.',
      'Students who struggle with Organic conversions or Physical Chemistry numerical problems.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'Mechanism-first and logic-driven explanation of every NCERT Chemistry chapter.',
      },
      {
        step: '02',
        title: 'Application',
        description: 'Intensive practice of NCERT exercises, conversions, and numerical problems.',
      },
      {
        step: '03',
        title: 'Revision',
        description: 'Board-pattern test papers and dedicated doubt-solving sessions.',
      },
    ],
    faqs: [
      {
        question: 'What is the schedule and duration of the Class 11–12 Chemistry Coaching?',
        answer:
          'This focused batch runs from November to February, covering the essential curriculum, NCERT mastery, and board exam preparation.',
      },
      {
        question: 'Does this course cover both Organic and Physical Chemistry thoroughly?',
        answer:
          'Yes. All three branches—Physical, Organic, and Inorganic Chemistry—are covered with special focus on reaction mechanisms, conversions, and numerical problem solving.',
      },
      {
        question: 'How does this course help with Class 12 Board Exams?',
        answer:
          'Every line of NCERT is emphasized alongside previous years’ board questions, marking-scheme answer formats, and regular doubt sessions.',
      },
      {
        question: 'What is the fee for the Class 11–12 Chemistry Coaching program?',
        answer:
          'The complete course fee for the November to February session is ₹34,000.',
      },
    ],
    seoTitle: 'Class 11 & 12 Chemistry Coaching in Gurugram | Dheeraj Sir | ConceptnSolution',
    seoDescription:
      'Master Class 11 & 12 Physical, Organic & Inorganic Chemistry with Dheeraj Sir at ConceptnSolution, Gurugram. NCERT mastery, doubt sessions & board strategy.',
  },
  {
    slug: 'chemistry-for-jee',
    title: 'Chemistry for IIT-JEE',
    tagline: 'Rigorous conceptual depth and multi-concept problem solving for JEE Main & Advanced',
    category: 'JEE & NEET Preparation',
    classLevel: 'JEE Main / Advanced',
    duration: 'November to May',
    fee: 100000,
    badge: 'JEE',
    featured: true,
    mentor: 'Dheeraj Sir',
    image:
      'https://images.unsplash.com/photo-1725404343886-a111bc5555c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    imageAlt: 'IIT-JEE aspirant solving advanced chemistry problems',
    description:
      'Advanced chemistry preparation designed for JEE aspirants with rigorous practice, conceptual depth, and exam strategy.',
    longDescription: [
      'In IIT-JEE (Main & Advanced), Chemistry is often the decisive rank-booster when backed by deep conceptual clarity and rapid problem-solving accuracy. Our Chemistry for IIT-JEE program is crafted to take aspirants from fundamental principles to complex, multi-concept JEE Advanced problems.',
      'Guided by Dheeraj Sir from November to May, students master stereochemistry, reaction intermediates, advanced thermodynamics, electrochemistry, and inorganic exceptions through structured problem sets and full-length CBT mock tests.',
    ],
    highlights: [
      'High-level problem solving',
      'Advanced concepts',
      'Mock tests',
      'JEE Main & Advanced strategy',
    ],
    learningOutcomes: [
      'Ability to solve multi-step Organic synthesis and stereochemistry problems with precision.',
      'Speed and accuracy in Physical Chemistry integer-type and single/multiple-choice questions.',
      'Deep conceptual command over Chemical Bonding, Coordination Chemistry, and Salt Analysis.',
      'Refined question-selection and time-management strategy for JEE Main and JEE Advanced.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'Advanced Physical Chemistry',
        description:
          'Mastering quantitative chemistry with rigorous numerical drills and graphical problem analysis.',
        topics: [
          'Mole Concept, Atomic Structure & Gaseous State',
          'Thermodynamics, Chemical & Ionic Equilibrium',
          'Electrochemistry, Kinetics & Surface/Solid State',
        ],
      },
      {
        number: '02',
        title: 'Mechanism-Driven Organic Chemistry',
        description:
          'Building deep intuition for reaction mechanisms, stereochemistry, and multi-step reagent pathways.',
        topics: [
          'Electronic effects, Aromaticity & Stereochemistry',
          'Reaction intermediates & reagent specificity',
          'Multi-step road-map problems & Biomolecules',
        ],
      },
      {
        number: '03',
        title: 'Inorganic Depth & JEE Mock Series',
        description:
          'Linking Inorganic facts to bonding principles and testing readiness under real JEE pressure.',
        topics: [
          'Chemical Bonding, Coordination & Block Chemistry',
          'PYQ analysis (JEE Main & Advanced)',
          'Full-length mock tests & error-log review',
        ],
      },
    ],
    idealFor: [
      'JEE Main and JEE Advanced aspirants aiming to maximize their Chemistry percentile and rank.',
      'Students who want deep conceptual clarity for complex, multi-concept JEE problems.',
      'Learners looking for intensive problem-solving practice and mentor-guided test analysis from November to May.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'First-principles coverage of advanced Physical, Organic, and Inorganic concepts.',
      },
      {
        step: '02',
        title: 'Application',
        description: 'Graded problem sheets covering single-choice, multi-correct, and numerical value questions.',
      },
      {
        step: '03',
        title: 'Revision & Mock Tests',
        description: 'Full-pattern JEE mock tests, PYQ drills, and personalized doubt resolution.',
      },
    ],
    faqs: [
      {
        question: 'Does this course cover both JEE Main and JEE Advanced levels?',
        answer:
          'Yes. The curriculum builds systematically from NCERT and JEE Main fundamentals up to advanced multi-concept problem solving required for JEE Advanced.',
      },
      {
        question: 'What is the duration of the Chemistry for IIT-JEE program?',
        answer:
          'The course runs from November to May, providing structured preparation through both JEE Main sessions and JEE Advanced.',
      },
      {
        question: 'Are mock tests and previous years’ questions (PYQs) included?',
        answer:
          'Yes, topic-wise PYQ discussions and full-pattern mock tests are core components of the program.',
      },
      {
        question: 'What is the course fee for Chemistry for IIT-JEE?',
        answer:
          'The fee for the complete November to May IIT-JEE Chemistry program is ₹1,00,000.',
      },
    ],
    seoTitle: 'Chemistry for IIT-JEE (Main & Advanced) in Gurugram | ConceptnSolution',
    seoDescription:
      'Crack JEE Main & Advanced Chemistry with Dheeraj Sir at ConceptnSolution, Gurugram. Advanced concepts, high-level problem solving, and mock tests (Nov–May).',
  },
  {
    slug: 'chemistry-for-neet',
    title: 'Chemistry for NEET',
    tagline: 'NCERT line-by-line precision, speed accuracy, and high-retention revision for NEET aspirants',
    category: 'JEE & NEET Preparation',
    classLevel: 'NEET',
    duration: 'November to May',
    fee: 100000,
    badge: 'NEET',
    featured: true,
    mentor: 'Dheeraj Sir',
    image:
      'https://plus.unsplash.com/premium_photo-1681487118711-2c8e629d4313?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    imageAlt: 'NEET medical aspirant revising NCERT chemistry concepts and mock tests',
    description:
      'NEET chemistry coaching that strengthens fundamentals, improves accuracy, and builds confidence in competitive exams.',
    longDescription: [
      'A high score in NEET Chemistry requires complete command over every line, table, and exception in NCERT, paired with the ability to solve 45 questions rapidly with minimal negative marking. Our Chemistry for NEET program is engineered around these exact requirements.',
      'From November to May, Dheeraj Sir guides medical aspirants through NCERT-centric theory, statement-based and assertion-reason practice, time-saving calculation techniques, and targeted revision cycles.',
    ],
    highlights: [
      'NCERT based',
      'Speed accuracy',
      'Targeted revision',
      'NEET mock test series',
    ],
    learningOutcomes: [
      'Thorough retention of NCERT Class 11 & 12 Chemistry facts, trends, graphs, and named reactions.',
      'High accuracy in statement-based, match-the-column, and assertion-reason NEET questions.',
      'Fast calculation methods for Physical Chemistry numericals without getting stuck under time pressure.',
      'Reduced negative marking through disciplined mock-test analysis and error tracking.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'NCERT Line-by-Line Foundation',
        description:
          'Extracting every testable concept, table, and exception directly from Class 11 & 12 NCERT texts.',
        topics: [
          'Inorganic & Organic NCERT deep-dive',
          'Statement-based & Assertion-Reason practice',
          'Memory maps & periodic trend summaries',
        ],
      },
      {
        number: '02',
        title: 'Speed Numericals & Reaction Mastery',
        description:
          'Solving Physical Chemistry calculations and Organic reaction chains rapidly and accurately.',
        topics: [
          'Fast calculation approximations for NEET',
          'Named reactions, reagents & intermediate stability',
          'High-yield chapter question banks',
        ],
      },
      {
        number: '03',
        title: 'Targeted Revision & NEET Mock Drills',
        description:
          'Multi-round revision and full-syllabus NEET pattern tests to peak at the right time.',
        topics: [
          'NEET previous years question mastery',
          'Timed OMR-pattern practice tests',
          'One-on-one doubt clearing & weak-area recovery',
        ],
      },
    ],
    idealFor: [
      'NEET UG aspirants aiming for a top score in Chemistry to boost their overall medical rank.',
      'Students who want structured, line-by-line NCERT coverage alongside speed-accuracy training.',
      'Learners seeking disciplined revision and regular mock testing from November to May.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'Clear, NCERT-rooted explanation of Physical, Organic, and Inorganic concepts.',
      },
      {
        step: '02',
        title: 'Application & Speed',
        description: 'Timed MCQ drills designed to build speed and eliminate negative marking.',
      },
      {
        step: '03',
        title: 'Targeted Revision',
        description: 'Cumulative revision cycles, NEET mock tests, and personalized doubt support.',
      },
    ],
    faqs: [
      {
        question: 'How closely does this course follow the NCERT textbook for NEET?',
        answer:
          '100%. Every chapter, in-text example, summary point, and reaction in Class 11 and 12 NCERT is covered thoroughly, as NEET Chemistry is heavily rooted in NCERT.',
      },
      {
        question: 'How do you help students improve speed and avoid negative marking?',
        answer:
          'Through timed MCQ drills, statement-question practice, and post-test reviews where students learn question selection and elimination techniques.',
      },
      {
        question: 'What is the duration of the Chemistry for NEET batch?',
        answer:
          'The batch runs from November to May, right up to the NEET examination window.',
      },
      {
        question: 'What is the fee for the Chemistry for NEET course?',
        answer:
          'The complete course fee for the November to May program is ₹1,00,000.',
      },
    ],
    seoTitle: 'Chemistry for NEET Coaching in Gurugram | NCERT Mastery | ConceptnSolution',
    seoDescription:
      'Prepare for NEET Chemistry with Dheeraj Sir at ConceptnSolution, Gurugram. NCERT-based learning, speed-accuracy training, and targeted revision (Nov–May).',
  },
  {
    slug: 'competitive-exam-preparation',
    title: 'Competitive Examination Preparation',
    tagline: 'Disciplined mentorship, exam-pattern conditioning, and strategic test practice',
    category: 'JEE & NEET Preparation',
    classLevel: 'Competitive Exams',
    duration: 'November to May',
    fee: 100000,
    badge: 'Competitive',
    featured: false,
    mentor: 'Dheeraj Sir',
    image:
      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    imageAlt: 'Student preparing for competitive science entrance examinations with mentor support',
    description:
      'A comprehensive coaching path for students preparing for elite competitive examinations with disciplined mentoring.',
    longDescription: [
      'Cracking competitive entrance examinations requires more than just knowing the syllabus—it requires exam-pattern familiarity, psychological resilience, and a disciplined revision strategy. Our Competitive Examination Preparation program provides an end-to-end guided pathway.',
      'Running from November to May under Dheeraj Sir’s close mentorship, this course combines conceptual strengthening, intensive exam-pattern practice tests, and individualized performance reviews so aspirants can perform at their peak on exam day.',
    ],
    highlights: [
      'Exam pattern training',
      'Practice tests',
      'Mentorship',
      'Strategic revision planning',
    ],
    learningOutcomes: [
      'Comprehensive mastery of high-weightage competitive examination topics and problem types.',
      'Strong exam temperament built through regular timed practice tests and simulated assessments.',
      'Personalized study and revision schedules tailored to each student’s strengths and gaps.',
      'Effective problem-solving heuristics to maximize score under strict time constraints.',
    ],
    curriculumModules: [
      {
        number: '01',
        title: 'Core Concept Consolidation',
        description:
          'Strengthening high-yield topics and bridging any conceptual gaps across the syllabus.',
        topics: [
          'High-weightage topic strengthening',
          'Cross-chapter concept integration',
          'Formula & reaction rapid-revision sheets',
        ],
      },
      {
        number: '02',
        title: 'Exam Pattern Conditioning',
        description:
          'Intensive practice across diverse objective and numerical question formats.',
        topics: [
          'Timed sectional & topic-wise tests',
          'Mixed-bag problem-solving sessions',
          'Accuracy & speed optimization strategies',
        ],
      },
      {
        number: '03',
        title: 'Full-Length Mocks & Mentorship',
        description:
          'Simulated full-syllabus examinations followed by 1-on-1 strategy and doubt sessions.',
        topics: [
          'Full-length mock test series',
          'Paper-attempt strategy & time allocation',
          'Personal mentorship with Dheeraj Sir',
        ],
      },
    ],
    idealFor: [
      'Students preparing for national and state-level science & engineering/medical entrance exams.',
      'Aspirants who need structured test practice, disciplined schedules, and personal faculty mentorship.',
      'Learners aiming to convert their conceptual knowledge into high competitive exam scores between November and May.',
    ],
    learningApproach: [
      {
        step: '01',
        title: 'Concept building',
        description: 'Consolidating core fundamentals and high-yield competitive exam concepts.',
      },
      {
        step: '02',
        title: 'Application',
        description: 'Rigorous exam-pattern training and timed problem-solving drills.',
      },
      {
        step: '03',
        title: 'Revision & Mentorship',
        description: 'Full-length practice tests and personalized mentoring by Dheeraj Sir.',
      },
    ],
    faqs: [
      {
        question: 'What makes the Competitive Examination Preparation program unique?',
        answer:
          'It focuses heavily on exam-pattern conditioning, timed practice tests, and direct personal mentorship to help students convert their subject knowledge into actual exam scores.',
      },
      {
        question: 'Who conducts the classes and mentorship sessions?',
        answer:
          'All sessions and academic mentoring are led by Dheeraj Sir (15+ years of teaching experience).',
      },
      {
        question: 'What is the timeline for this program?',
        answer:
          'The program runs from November to May, covering complete syllabus consolidation, testing, and final revision.',
      },
      {
        question: 'What is the fee for the Competitive Examination Preparation course?',
        answer:
          'The total course fee for the November to May program is ₹1,00,000.',
      },
    ],
    seoTitle: 'Competitive Examination Preparation in Gurugram | ConceptnSolution',
    seoDescription:
      'Disciplined coaching for competitive science entrance examinations at ConceptnSolution, Gurugram. Exam pattern training, practice tests, and mentorship by Dheeraj Sir.',
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

export const courseCategories = [
  'All Programs',
  'Classes 9th & 10th',
  'Classes 11th & 12th',
  'JEE & NEET Preparation',
];

export const coursesPageFaqs: CourseFaq[] = [
  {
    question: 'Which academic levels and exams does ConceptnSolution coach students for?',
    answer:
      'We offer structured coaching across three core tracks: Classes 9th & 10th (CBSE Board Preparation, ICSE Board Preparation, and Foundation Courses), Classes 11th & 12th (Chemistry Coaching), and JEE & NEET Preparation (Chemistry for IIT-JEE, Chemistry for NEET, and Competitive Examination Preparation).',
  },
  {
    question: 'Who teaches the courses at ConceptnSolution?',
    answer:
      'All programs are mentored by Dheeraj Sir, who brings over 15+ years of teaching experience in building conceptual clarity for both school board exams and competitive entrance tests.',
  },
  {
    question: 'Why do you keep a focused target of 20 admissions?',
    answer:
      'We believe genuine conceptual learning requires personal attention. Limiting batch intake allows us to monitor every student’s progress closely, review test papers in detail, and resolve individual doubts effectively.',
  },
  {
    question: 'What are the course fees and durations?',
    answer:
      'Our Class 9–10 programs (Year-long / Foundation year) and Class 11–12 Chemistry Coaching (November to February) are priced at ₹34,000 each. Our specialized JEE, NEET, and Competitive Examination programs (November to May) are priced at ₹1,00,000 each.',
  },
  {
    question: 'How can I enrol or speak with a counselor before choosing a course?',
    answer:
      'You can click "Enroll now" on any course card to proceed directly to checkout, or visit our Contact page to schedule an admission enquiry with our academic team in Gurugram.',
  },
];
