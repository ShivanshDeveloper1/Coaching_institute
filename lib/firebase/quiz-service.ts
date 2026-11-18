import { adminDb, isAdminConfigured } from "./admin";
import { Quiz, Question, QuizSection } from "@/types/quiz";

/**
 * Built-in initial mock quizzes for coaching institute test series
 * Used as fallback or seed data when Firestore collection is empty or credentials are not configured.
 */
export const initialMockQuizzes: Quiz[] = [
  {
    id: "quiz_neet_mock_01",
    _id: "quiz_neet_mock_01",
    title: "NEET Full Syllabus Chemistry & Biology Challenger",
    description: "Complete NCERT-focused mock test designed by Dheeraj Sir for NEET 2026 aspirants.",
    examType: "NEET",
    classLevel: "Class 12",
    language: "English",
    duration: 180,
    totalDuration: 180,
    totalMarks: 720,
    marks: 720,
    totalQuestions: 15,
    difficulty: "Medium",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Chemical Bonding and Molecular Structure",
      "Thermodynamics & Equilibrium",
      "Organic Chemistry Basics & Hydrocarbons",
      "Cell Biology & Genetics",
      "Human Physiology"
    ],
    instructions: [
      "Total duration of this mock exam is 180 minutes.",
      "Each correct response will be awarded +4 marks.",
      "For each incorrect answer, 1 mark will be deducted (-1 negative marking).",
      "Unattempted questions will be awarded 0 marks.",
      "Use the Question Palette on the right to navigate between questions.",
      "You can mark questions for review and return to them before final submission."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    sections: [
      {
        id: "sec_chem",
        name: "Chemistry",
        subject: "Chemistry",
        instructions: "Attempt all questions in this section.",
        questions: [
          {
            id: "q_chem_1",
            _id: "q_chem_1",
            question: "Which of the following molecules has a permanent dipole moment?",
            questionText: "Which of the following molecules has a permanent dipole moment?",
            options: [
              { id: "A", text: "$BF_3$" },
              { id: "B", text: "$NF_3$" },
              { id: "C", text: "$CO_2$" },
              { id: "D", text: "$CCl_4$" }
            ],
            correctAnswer: 1,
            correctOptionId: "B",
            explanation: "$NF_3$ has a pyramidal geometry with a lone pair on Nitrogen, resulting in a net non-zero dipole moment, unlike symmetrical $BF_3$, $CO_2$, and $CCl_4$.",
            subject: "Chemistry",
            marks: 4,
            negativeMarks: 1,
          },
          {
            id: "q_chem_2",
            _id: "q_chem_2",
            question: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous at all temperatures if:",
            questionText: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous at all temperatures if:",
            options: [
              { id: "A", text: "$\\Delta S > 0$ and $T\\Delta S > \\Delta H$" },
              { id: "B", text: "$\\Delta S < 0$" },
              { id: "C", text: "$\\Delta H < T\\Delta S$ at low temperature" },
              { id: "D", text: "Never spontaneous at low temperature" }
            ],
            correctAnswer: 0,
            correctOptionId: "A",
            explanation: "According to Gibbs-Helmholtz equation $\\Delta G = \\Delta H - T\\Delta S$. For spontaneity $\\Delta G < 0$, which requires $\\Delta S > 0$ and $T\\Delta S > \\Delta H$.",
            subject: "Chemistry",
            marks: 4,
            negativeMarks: 1,
          },
          {
            id: "q_chem_3",
            _id: "q_chem_3",
            question: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
            questionText: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
            options: [
              { id: "A", text: "4-methylpent-3-en-2-one" },
              { id: "B", text: "2-methylpent-2-en-4-one" },
              { id: "C", text: "3-methylpent-2-en-4-one" },
              { id: "D", text: "Mesitly oxide" }
            ],
            correctAnswer: 0,
            correctOptionId: "A",
            explanation: "Numbering starts from the carbonyl carbon giving 4-methylpent-3-en-2-one.",
            subject: "Chemistry",
            marks: 4,
            negativeMarks: 1,
          }
        ]
      }
    ],
    // Flat questions list fallback for legacy QuizEngine
    questions: [
      {
        id: "q_chem_1",
        _id: "q_chem_1",
        question: "Which of the following molecules has a permanent dipole moment?",
        questionText: "Which of the following molecules has a permanent dipole moment?",
        options: [
          "$BF_3$",
          "$NF_3$",
          "$CO_2$",
          "$CCl_4$"
        ],
        correctAnswer: 1,
        correctOptionId: "B",
        explanation: "$NF_3$ has a pyramidal geometry with a lone pair on Nitrogen, resulting in a net non-zero dipole moment.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      },
      {
        id: "q_chem_2",
        _id: "q_chem_2",
        question: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous when:",
        questionText: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous when:",
        options: [
          "$\\Delta S > 0$ and $T\\Delta S > \\Delta H$",
          "$\\Delta S < 0$",
          "$\\Delta H < T\\Delta S$ at low temperature",
          "Never spontaneous"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Spontaneity requires $\\Delta G = \\Delta H - T\\Delta S < 0$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      },
      {
        id: "q_chem_3",
        _id: "q_chem_3",
        question: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
        questionText: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
        options: [
          "4-methylpent-3-en-2-one",
          "2-methylpent-2-en-4-one",
          "3-methylpent-2-en-4-one",
          "Mesityl oxide"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Numbered from the right to prioritize the ketone carbonyl: 4-methylpent-3-en-2-one.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "quiz_jee_mock_01",
    _id: "quiz_jee_mock_01",
    title: "JEE Main Physics & Chemistry Grand Mock 01",
    description: "High-yield conceptual and numerical problems curated for JEE Main aspirants.",
    examType: "JEE",
    classLevel: "Class 12",
    language: "English",
    duration: 180,
    totalDuration: 180,
    totalMarks: 300,
    marks: 300,
    totalQuestions: 15,
    difficulty: "Hard",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Electrostatics & Current Electricity",
      "Rotational Dynamics",
      "Coordination Compounds",
      "Chemical Kinetics & Solutions"
    ],
    instructions: [
      "Total duration is 180 minutes.",
      "Marks: +4 for correct answer, -1 for wrong answer, 0 for unattempted.",
      "Calculators and rough tables are strictly prohibited."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    questions: [
      {
        id: "q_jee_1",
        _id: "q_jee_1",
        question: "A particle executes SHM with amplitude $A$. At what distance from the mean position is its kinetic energy equal to its potential energy?",
        questionText: "A particle executes SHM with amplitude $A$. At what distance from the mean position is its kinetic energy equal to its potential energy?",
        options: [
          "$A / 2$",
          "$A / \\sqrt{2}$",
          "$A / 4$",
          "$\\sqrt{3}A / 2$"
        ],
        correctAnswer: 1,
        correctOptionId: "B",
        explanation: "$KE = \\frac{1}{2}k(A^2 - x^2)$ and $PE = \\frac{1}{2}kx^2$. Equating gives $A^2 - x^2 = x^2 \\implies x = A / \\sqrt{2}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1,
      },
      {
        id: "q_jee_2",
        _id: "q_jee_2",
        question: "The rate constant of a first order reaction is $k = 10^{-3} s^{-1}$. What is the half life $t_{1/2}$?",
        questionText: "The rate constant of a first order reaction is $k = 10^{-3} s^{-1}$. What is the half life $t_{1/2}$?",
        options: [
          "$693\\text{ s}$",
          "$346.5\\text{ s}$",
          "$1000\\text{ s}$",
          "$69.3\\text{ s}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "$t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{10^{-3}} = 693\\text{ s}$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "quiz_foundation_mock_01",
    _id: "quiz_foundation_mock_01",
    title: "Class 10th Board & Foundation Diagnostic Mock",
    description: "Strengthen your core foundation in Science and Mathematics for board exam readiness.",
    examType: "Foundation",
    classLevel: "Class 10",
    language: "English",
    duration: 60,
    totalDuration: 60,
    totalMarks: 100,
    marks: 100,
    totalQuestions: 10,
    difficulty: "Easy",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Light - Reflection and Refraction",
      "Electricity"
    ],
    instructions: [
      "Total duration is 60 minutes.",
      "+4 for correct, -1 for wrong.",
      "Read each question carefully before submitting."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    questions: [
      {
        id: "q_fnd_1",
        _id: "q_fnd_1",
        question: "When dilute hydrochloric acid is added to iron filings, what gas is produced?",
        questionText: "When dilute hydrochloric acid is added to iron filings, what gas is produced?",
        options: [
          "Hydrogen gas and Iron chloride are produced",
          "Chlorine gas and Iron hydroxide are produced",
          "No reaction takes place",
          "Iron salt and water are produced"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "$Fe + 2HCl \\rightarrow FeCl_2 + H_2\\uparrow$. Hydrogen gas and Iron(II) chloride are formed.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "quiz_jee_grand_challenger_01",
    _id: "quiz_jee_grand_challenger_01",
    title: "JEE Ultimate Grand Challenger Test 01",
    description: "High-yield 8-question sectional mock featuring 4 advanced Chemistry and 4 conceptual Physics questions with step-by-step KaTeX explanations.",
    overview: "High-yield 8-question sectional mock featuring 4 advanced Chemistry and 4 conceptual Physics questions with step-by-step KaTeX explanations.",
    examType: "JEE",
    classLevel: "Class 12",
    language: "English",
    duration: 45,
    totalDuration: 45,
    totalMarks: 32,
    marks: 32,
    totalQuestions: 8,
    difficulty: "Hard",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Thermodynamics & Thermochemistry",
      "Chemical Equilibrium & Le Chatelier Principle",
      "Coordination Compounds & Crystal Field Theory",
      "Aldehydes, Ketones & Nucleophilic Addition",
      "Work, Energy and Power",
      "Rotational Dynamics & Moment of Inertia",
      "Current Electricity & Kirchhoff Laws",
      "Wave Optics & Young Double Slit Experiment"
    ],
    instructions: [
      "Test contains 8 single-correct questions (4 Chemistry + 4 Physics).",
      "Each correct answer yields +4 marks; incorrect answers incur -1 negative mark.",
      "Carefully review KaTeX scientific notation and explanations upon completion."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    questions: [
      // Chemistry Question 1
      {
        id: "q_jee_gc_c1",
        _id: "q_jee_gc_c1",
        question: "For the gaseous reaction: $\\text{PCl}_5(g) \\rightleftharpoons \\text{PCl}_3(g) + \\text{Cl}_2(g)$, the degree of dissociation is $\\alpha$ at total pressure $P$. Which expression represents the equilibrium constant $K_p$ in terms of $P$ and $\\alpha$?",
        questionText: "For the gaseous reaction: $\\text{PCl}_5(g) \\rightleftharpoons \\text{PCl}_3(g) + \\text{Cl}_2(g)$, the degree of dissociation is $\\alpha$ at total pressure $P$. Which expression represents the equilibrium constant $K_p$ in terms of $P$ and $\\alpha$?",
        options: [
          "$K_p = \\frac{\\alpha^2 P}{1 - \\alpha^2}$",
          "$K_p = \\frac{\\alpha P}{1 - \\alpha}$",
          "$K_p = \\frac{(1 - \\alpha^2)P}{\\alpha^2}$",
          "$K_p = \\frac{\\alpha^2}{P(1 - \\alpha^2)}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "At equilibrium, moles are $(1-\\alpha), \\alpha, \\alpha$. Total moles $= 1+\\alpha$. Partial pressures are $P_{\\text{PCl}_3} = \\frac{\\alpha}{1+\\alpha}P$, $P_{\\text{Cl}_2} = \\frac{\\alpha}{1+\\alpha}P$, $P_{\\text{PCl}_5} = \\frac{1-\\alpha}{1+\\alpha}P$. Hence, $K_p = \\frac{P_{\\text{PCl}_3} \\cdot P_{\\text{Cl}_2}}{P_{\\text{PCl}_5}} = \\frac{\\alpha^2 P}{1 - \\alpha^2}$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Chemistry Question 2
      {
        id: "q_jee_gc_c2",
        _id: "q_jee_gc_c2",
        question: "Which among the following octahedral complex ions exhibits the maximum Crystal Field Stabilization Energy (CFSE) in terms of $\\Delta_o$ in a low-spin state?",
        questionText: "Which among the following octahedral complex ions exhibits the maximum Crystal Field Stabilization Energy (CFSE) in terms of $\\Delta_o$ in a low-spin state?",
        options: [
          "$[\\text{Co}(\\text{CN})_6]^{3-}$ ($d^6$, low spin)",
          "$[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}$ ($d^6$, high spin)",
          "$[\\text{Cr}(\\text{H}_2\\text{O})_6]^{3+}$ ($d^3$)",
          "$[\\text{Ni}(\\text{NH}_3)_6]^{2+}$ ($d^8$)"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "In $[\\text{Co}(\\text{CN})_6]^{3-}$, $\\text{Co}^{3+}$ has $d^6$ configuration. Strong field ligand $\\text{CN}^-$ forces pairing: $t_{2g}^6 e_g^0$. CFSE $= 6(-0.4\\Delta_o) + 3P = -2.4\\Delta_o + 3P$, which is the highest stabilization.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Chemistry Question 3
      {
        id: "q_jee_gc_c3",
        _id: "q_jee_gc_c3",
        question: "For a spontaneous isothermal and isobaric process in a closed system, what are the mandatory thermodynamic signs of Gibbs free energy change ($\\Delta G$) and total entropy change of the universe ($\\Delta S_{\\text{total}}$)?",
        questionText: "For a spontaneous isothermal and isobaric process in a closed system, what are the mandatory thermodynamic signs of Gibbs free energy change ($\\Delta G$) and total entropy change of the universe ($\\Delta S_{\\text{total}}$)?",
        options: [
          "$\\Delta G < 0$ and $\\Delta S_{\\text{total}} > 0$",
          "$\\Delta G > 0$ and $\\Delta S_{\\text{total}} < 0$",
          "$\\Delta G < 0$ and $\\Delta S_{\\text{total}} = 0$",
          "$\\Delta G = 0$ and $\\Delta S_{\\text{total}} > 0$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "By the Second Law of Thermodynamics, any spontaneous real process requires $\\Delta S_{\\text{total}} = \\Delta S_{\\text{sys}} + \\Delta S_{\\text{surr}} > 0$. At constant temperature and pressure, $\\Delta G_{\\text{sys}} = -T\\Delta S_{\\text{total}} < 0$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Chemistry Question 4
      {
        id: "q_jee_gc_c4",
        _id: "q_jee_gc_c4",
        question: "An organic compound $A$ (molecular formula $\\text{C}_3\\text{H}_6\\text{O}$) gives a positive 2,4-DNP test and forms a yellow crystalline precipitate with $\\text{I}_2 / \\text{NaOH}$ (iodoform test), but does not reduce Tollens reagent. Identify compound $A$:",
        questionText: "An organic compound $A$ (molecular formula $\\text{C}_3\\text{H}_6\\text{O}$) gives a positive 2,4-DNP test and forms a yellow crystalline precipitate with $\\text{I}_2 / \\text{NaOH}$ (iodoform test), but does not reduce Tollens reagent. Identify compound $A$:",
        options: [
          "Propanone (Acetone, $\\text{CH}_3\\text{COCH}_3$)",
          "Propanal ($\\text{CH}_3\\text{CH}_2\\text{CHO}$)",
          "Prop-2-en-1-ol ($\\text{CH}_2=\\text{CH}-\\text{CH}_2\\text{OH}$)",
          "Methoxyethene ($\\text{CH}_3-\\text{O}-\\text{CH}=\\text{CH}_2$)"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Positive 2,4-DNP indicates a carbonyl group (aldehyde or ketone). Failing Tollens test proves it is a ketone, not an aldehyde. A positive iodoform test requires a methyl ketone group ($\\text{CH}_3\\text{C=O}$), confirming Propanone (acetone).",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 1
      {
        id: "q_jee_gc_p1",
        _id: "q_jee_gc_p1",
        question: "A particle of mass $m = 2\\text{ kg}$ moves along the x-axis under a conservative force field with potential energy function $U(x) = (3x^2 - 12x + 8)\\text{ J}$. Find the position of stable equilibrium and the angular frequency $\\omega$ of small oscillations about it:",
        questionText: "A particle of mass $m = 2\\text{ kg}$ moves along the x-axis under a conservative force field with potential energy function $U(x) = (3x^2 - 12x + 8)\\text{ J}$. Find the position of stable equilibrium and the angular frequency $\\omega$ of small oscillations about it:",
        options: [
          "$x = 2\\text{ m}, \\quad \\omega = \\sqrt{3}\\text{ rad/s}$",
          "$x = 4\\text{ m}, \\quad \\omega = 3\\text{ rad/s}$",
          "$x = 2\\text{ m}, \\quad \\omega = 6\\text{ rad/s}$",
          "$x = 0\\text{ m}, \\quad \\omega = 2\\text{ rad/s}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Equilibrium occurs when $F = -dU/dx = -(6x - 12) = 0 \\implies x = 2\\text{ m}$. Since $d^2U/dx^2 = 6 > 0$, it is stable equilibrium with effective spring constant $k = 6\\text{ N/m}$. Angular frequency $\\omega = \\sqrt{k/m} = \\sqrt{6/2} = \\sqrt{3}\\text{ rad/s}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 2
      {
        id: "q_jee_gc_p2",
        _id: "q_jee_gc_p2",
        question: "A solid uniform cylinder of mass $M$ and radius $R$ rolls without slipping down an inclined plane of inclination angle $\\theta$. What is the linear acceleration $a$ of its center of mass?",
        questionText: "A solid uniform cylinder of mass $M$ and radius $R$ rolls without slipping down an inclined plane of inclination angle $\\theta$. What is the linear acceleration $a$ of its center of mass?",
        options: [
          "$a = \\frac{2}{3} g \\sin\\theta$",
          "$a = \\frac{1}{2} g \\sin\\theta$",
          "$a = \\frac{5}{7} g \\sin\\theta$",
          "$a = g \\sin\\theta$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "For pure rolling down an incline, acceleration $a = \\frac{g \\sin\\theta}{1 + I_{\\text{cm}}/(MR^2)}$. For a solid cylinder, $I_{\\text{cm}} = \\frac{1}{2}MR^2$, giving $a = \\frac{g \\sin\\theta}{1 + 1/2} = \\frac{2}{3}g \\sin\\theta$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 3
      {
        id: "q_jee_gc_p3",
        _id: "q_jee_gc_p3",
        question: "In a series LCR circuit connected to an AC source $V(t) = V_0 \\sin(\\omega t)$, the resistance is $R = 40\\ \\Omega$, inductive reactance $X_L = 80\\ \\Omega$, and capacitive reactance $X_C = 50\\ \\Omega$. What is the power factor $\\cos\\phi$ of this circuit?",
        questionText: "In a series LCR circuit connected to an AC source $V(t) = V_0 \\sin(\\omega t)$, the resistance is $R = 40\\ \\Omega$, inductive reactance $X_L = 80\\ \\Omega$, and capacitive reactance $X_C = 50\\ \\Omega$. What is the power factor $\\cos\\phi$ of this circuit?",
        options: [
          "$0.80$",
          "$0.60$",
          "$1.00$",
          "$0.50$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Net reactance is $X = X_L - X_C = 80 - 50 = 30\\ \\Omega$. Total impedance is $Z = \\sqrt{R^2 + X^2} = \\sqrt{40^2 + 30^2} = 50\\ \\Omega$. The power factor is $\\cos\\phi = \\frac{R}{Z} = \\frac{40}{50} = 0.80$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 4
      {
        id: "q_jee_gc_p4",
        _id: "q_jee_gc_p4",
        question: "In Young double slit experiment with monochromatic light of wavelength $\\lambda = 600\\text{ nm}$, the slit separation is $d = 1.2\\text{ mm}$ and screen distance is $D = 2.0\\text{ m}$. What is the linear separation between the central maximum and the 3rd dark fringe on the screen?",
        questionText: "In Young double slit experiment with monochromatic light of wavelength $\\lambda = 600\\text{ nm}$, the slit separation is $d = 1.2\\text{ mm}$ and screen distance is $D = 2.0\\text{ m}$. What is the linear separation between the central maximum and the 3rd dark fringe on the screen?",
        options: [
          "$2.5\\text{ mm}$",
          "$3.0\\text{ mm}$",
          "$1.5\\text{ mm}$",
          "$5.0\\text{ mm}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Fringe width $\\beta = \\frac{\\lambda D}{d} = \\frac{600 \\times 10^{-9} \\times 2.0}{1.2 \\times 10^{-3}} = 1.0\\text{ mm}$. The position of the $n$-th dark fringe is $y_n = (n - 1/2)\\beta$. For the 3rd dark fringe ($n = 3$), $y_3 = (3 - 0.5)(1.0\\text{ mm}) = 2.5\\text{ mm}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "quiz_neet_mastery_mock_02",
    _id: "quiz_neet_mastery_mock_02",
    title: "NEET Foundation & Senior Mastery Mock 02",
    description: "Curated 8-question speed & accuracy mock test consisting of 4 high-yield NEET Chemistry questions and 4 NCERT Physics questions with full solutions.",
    overview: "Curated 8-question speed & accuracy mock test consisting of 4 high-yield NEET Chemistry questions and 4 NCERT Physics questions with full solutions.",
    examType: "NEET",
    classLevel: "Class 11-12",
    language: "English",
    duration: 40,
    totalDuration: 40,
    totalMarks: 32,
    marks: 32,
    totalQuestions: 8,
    difficulty: "Moderate",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Structure of Atom & Bohr Model",
      "Chemical Bonding & Hybridization",
      "Solutions & Colligative Properties",
      "Equilibrium & pH Calculations",
      "Kinematics & Projectile Motion",
      "Gravitation & Escape Velocity",
      "Electrostatics & Gauss Law",
      "Optics & Lens Formula"
    ],
    instructions: [
      "Test contains 8 single-correct MCQs (4 Chemistry + 4 Physics).",
      "Each correct response receives +4 marks; each wrong response deducts -1 mark.",
      "Focus on NCERT precision, correct formula substitution, and units."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    questions: [
      // Chemistry Question 1
      {
        id: "q_neet_mm_c1",
        _id: "q_neet_mm_c1",
        question: "According to VSEPR theory, what is the geometric shape and hybridisation of the central iodine atom in the triiodide anion ($\\text{I}_3^-$)?",
        questionText: "According to VSEPR theory, what is the geometric shape and hybridisation of the central iodine atom in the triiodide anion ($\\text{I}_3^-$)?",
        options: [
          "Linear geometry with $sp^3d$ hybridisation",
          "Bent geometry with $sp^3$ hybridisation",
          "T-shaped geometry with $sp^3d$ hybridisation",
          "Trigonal planar with $sp^2$ hybridisation"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "In $\\text{I}_3^-$, the central iodine atom has 7 valence electrons $+ 1$ negative charge $= 8$ electrons. It forms 2 single covalent bonds with terminal iodine atoms and retains 3 lone pairs. Steric number $= 2 + 3 = 5$, indicating $sp^3d$ hybridisation. The three lone pairs occupy equatorial positions, resulting in a strictly linear molecular geometry ($180^\\circ$).",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Chemistry Question 2
      {
        id: "q_neet_mm_c2",
        _id: "q_neet_mm_c2",
        question: "What is the pH of a buffer solution prepared by mixing $50\\text{ mL}$ of $0.1\\text{ M } \\text{CH}_3\\text{COOH}$ with $50\\text{ mL}$ of $0.1\\text{ M } \\text{CH}_3\\text{COONa}$? (Given: $pK_a$ of acetic acid $= 4.76$)",
        questionText: "What is the pH of a buffer solution prepared by mixing $50\\text{ mL}$ of $0.1\\text{ M } \\text{CH}_3\\text{COOH}$ with $50\\text{ mL}$ of $0.1\\text{ M } \\text{CH}_3\\text{COONa}$? (Given: $pK_a$ of acetic acid $= 4.76$)",
        options: [
          "$4.76$",
          "$7.00$",
          "$5.06$",
          "$3.86$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Applying the Henderson-Hasselbalch equation: $\\text{pH} = pK_a + \\log\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right)$. Since equal volumes of equimolar solutions are mixed, $[\\text{Salt}] = [\\text{Acid}] = 0.05\\text{ M}$. Thus $\\log(1) = 0$, giving $\\text{pH} = pK_a = 4.76$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Chemistry Question 3
      {
        id: "q_neet_mm_c3",
        _id: "q_neet_mm_c3",
        question: "A $5\\% \\text{ (w/v)}$ aqueous solution of an unknown non-volatile solute $X$ is isotonic with a $2\\% \\text{ (w/v)}$ aqueous solution of urea ($\\text{Molar mass} = 60\\text{ g/mol}$) at the same temperature. What is the molar mass of solute $X$?",
        questionText: "A $5\\% \\text{ (w/v)}$ aqueous solution of an unknown non-volatile solute $X$ is isotonic with a $2\\% \\text{ (w/v)}$ aqueous solution of urea ($\\text{Molar mass} = 60\\text{ g/mol}$) at the same temperature. What is the molar mass of solute $X$?",
        options: [
          "$150\\text{ g/mol}$",
          "$120\\text{ g/mol}$",
          "$60\\text{ g/mol}$",
          "$300\\text{ g/mol}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "For isotonic solutions at constant $T$, osmotic pressures are equal: $\\pi_1 = \\pi_2 \\implies C_1 = C_2$. Therefore: $\\frac{5/M_X}{100\\text{ mL}} = \\frac{2/60}{100\\text{ mL}} \\implies \\frac{5}{M_X} = \\frac{1}{30} \\implies M_X = 150\\text{ g/mol}$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Chemistry Question 4
      {
        id: "q_neet_mm_c4",
        _id: "q_neet_mm_c4",
        question: "Which orbital transition in a hydrogen atom emits a photon of the shortest wavelength (highest frequency and energy)?",
        questionText: "Which orbital transition in a hydrogen atom emits a photon of the shortest wavelength (highest frequency and energy)?",
        options: [
          "$n = \\infty \\to n = 1$ (Lyman series limit)",
          "$n = 2 \\to n = 1$",
          "$n = 3 \\to n = 2$ (Balmer series)",
          "$n = 4 \\to n = 3$ (Paschen series)"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Energy of emitted photon is $\\Delta E = 13.6\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)\\text{ eV}$. Shortest wavelength corresponds to maximum energy transition ($\\Delta E = hc/\\lambda$). The transition $n = \\infty \\to n = 1$ gives $\\Delta E = 13.6\\text{ eV}$, the theoretical maximum in hydrogen.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 1
      {
        id: "q_neet_mm_p1",
        _id: "q_neet_mm_p1",
        question: "A projectile is launched from ground level with speed $u = 40\\text{ m/s}$ at an angle $\\theta = 30^\\circ$ above the horizontal. Taking $g = 10\\text{ m/s}^2$, what is the radius of curvature $R$ of its trajectory at the highest point?",
        questionText: "A projectile is launched from ground level with speed $u = 40\\text{ m/s}$ at an angle $\\theta = 30^\\circ$ above the horizontal. Taking $g = 10\\text{ m/s}^2$, what is the radius of curvature $R$ of its trajectory at the highest point?",
        options: [
          "$120\\text{ m}$",
          "$80\\text{ m}$",
          "$160\\text{ m}$",
          "$60\\text{ m}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "At the apex, vertical velocity $v_y = 0$, so speed $v = u \\cos\\theta = 40 \\cos 30^\\circ = 20\\sqrt{3}\\text{ m/s}$. The normal acceleration perpendicular to velocity is purely gravity $a_n = g = 10\\text{ m/s}^2$. Radius of curvature is $R = \\frac{v^2}{a_n} = \\frac{(20\\sqrt{3})^2}{10} = \\frac{1200}{10} = 120\\text{ m}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 2
      {
        id: "q_neet_mm_p2",
        _id: "q_neet_mm_p2",
        question: "The escape velocity from the surface of Earth is $v_e = 11.2\\text{ km/s}$. A hypothetical planet has twice the radius of Earth ($R_p = 2R_e$) and three times the mass of Earth ($M_p = 3M_e$). What is the escape velocity from the surface of this planet?",
        questionText: "The escape velocity from the surface of Earth is $v_e = 11.2\\text{ km/s}$. A hypothetical planet has twice the radius of Earth ($R_p = 2R_e$) and three times the mass of Earth ($M_p = 3M_e$). What is the escape velocity from the surface of this planet?",
        options: [
          "$11.2 \\times \\sqrt{1.5}\\text{ km/s} \\approx 13.72\\text{ km/s}$",
          "$22.4\\text{ km/s}$",
          "$11.2 \\times \\sqrt{3}\\text{ km/s}$",
          "$5.6\\text{ km/s}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Escape velocity is $v_e = \\sqrt{\\frac{2GM}{R}}$. For the new planet: $v_{e,p} = \\sqrt{\\frac{2G(3M_e)}{2R_e}} = \\sqrt{\\frac{3}{2}} \\cdot \\sqrt{\\frac{2GM_e}{R_e}} = \\sqrt{1.5} \\times 11.2\\text{ km/s} \\approx 13.72\\text{ km/s}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 3
      {
        id: "q_neet_mm_p3",
        _id: "q_neet_mm_p3",
        question: "An electric dipole composed of charges $\\pm 2\\ \\mu\\text{C}$ separated by distance $2a = 4\\text{ cm}$ is placed in a uniform electric field $E = 10^5\\text{ N/C}$ at an angle of $30^\\circ$ to the field lines. What is the magnitude of torque experienced by the dipole?",
        questionText: "An electric dipole composed of charges $\\pm 2\\ \\mu\\text{C}$ separated by distance $2a = 4\\text{ cm}$ is placed in a uniform electric field $E = 10^5\\text{ N/C}$ at an angle of $30^\\circ$ to the field lines. What is the magnitude of torque experienced by the dipole?",
        options: [
          "$4.0 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$",
          "$8.0 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$",
          "$2.0 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$",
          "$1.6 \\times 10^{-2}\\text{ N}\\cdot\\text{m}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Dipole moment $p = q \\cdot 2a = (2 \\times 10^{-6}\\text{ C})(0.04\\text{ m}) = 8 \\times 10^{-8}\\text{ C}\\cdot\\text{m}$. Torque is $\\tau = pE \\sin\\theta = (8 \\times 10^{-8})(10^5)(\\sin 30^\\circ) = 8 \\times 10^{-3} \\times 0.5 = 4.0 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      },
      // Physics Question 4
      {
        id: "q_neet_mm_p4",
        _id: "q_neet_mm_p4",
        question: "A thin equiconvex glass lens of refractive index $\\mu = 1.5$ has focal length $f = 20\\text{ cm}$ in air. What will be its focal length $f_w$ when completely immersed in water of refractive index $\\mu_w = 4/3$?",
        questionText: "A thin equiconvex glass lens of refractive index $\\mu = 1.5$ has focal length $f = 20\\text{ cm}$ in air. What will be its focal length $f_w$ when completely immersed in water of refractive index $\\mu_w = 4/3$?",
        options: [
          "$80\\text{ cm}$",
          "$40\\text{ cm}$",
          "$20\\text{ cm}$",
          "$10\\text{ cm}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Using the Lens Maker formula: In air, $\\frac{1}{f_a} = (\\mu_g - 1)\\left(\\frac{2}{R}\\right) = (1.5 - 1)\\left(\\frac{2}{R}\\right) = \\frac{1}{R} \\implies R = 20\\text{ cm}$. In water, $\\frac{1}{f_w} = \\left(\\frac{\\mu_g}{\\mu_w} - 1\\right)\\left(\\frac{2}{R}\\right) = \\left(\\frac{1.5}{4/3} - 1\\right)\\left(\\frac{2}{20}\\right) = \\left(\\frac{9}{8} - 1\\right)(0.1) = \\frac{1}{8} \\times 0.1 = \\frac{1}{80} \\implies f_w = 80\\text{ cm}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

/**
 * The existing QuizEngine UI reads `question_text` and `correct_answer` (snake_case).
 * Normalize every question so both naming styles are always present.
 */
function normalizeQuestion(q: Question): Question {
  const raw = q as Question & {
    question_text?: string;
    correct_answer?: number | string;
    question_image?: string | null;
  };
  return {
    ...q,
    question_text: raw.question_text ?? q.questionText ?? q.question ?? "",
    questionText: q.questionText ?? q.question ?? raw.question_text ?? "",
    correct_answer: raw.correct_answer ?? q.correctAnswer,
    // Admin builder stores the picture as `question_image`; the student engine reads `imageUrl`.
    imageUrl: q.imageUrl || raw.question_image || undefined,
  } as Question;
}

function normalizeQuiz(quiz: Quiz): Quiz {
  const questions = Array.isArray(quiz.questions)
    ? quiz.questions.map((item) =>
        Array.isArray(item) ? item.map(normalizeQuestion) : normalizeQuestion(item)
      )
    : quiz.questions;
  return { ...quiz, questions };
}

export async function getQuizzesFromFirestore(filters?: {
  examType?: string;
  classLevel?: string;
}): Promise<Quiz[]> {
  const list = await fetchQuizzesRaw(filters);
  return list
    .map(normalizeQuiz)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function getQuizByIdFromFirestore(id: string): Promise<Quiz | null> {
  const quiz = await fetchQuizByIdRaw(id);
  return quiz ? normalizeQuiz(quiz) : null;
}

/* ==========================================================================
 * ADMIN WRITE HELPERS (Step 11)
 * All admin quiz data is stored in the Firestore `quizzes` collection.
 * Scoring rule (confirmed by owner): +4 per correct, NO negative marking.
 * ========================================================================== */

export class AdminNotConfiguredError extends Error {
  constructor() {
    super(
      "Firebase Admin is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to .env.local and restart the server."
    );
  }
}

/** Firestore rejects `undefined` values and nested arrays, so clean the payload first. */
function toFirestoreSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value ?? null));
}

/** Convert whatever the admin UI sends into a clean quiz document. */
export function buildQuizDocument(input: any): Omit<Quiz, "id"> {
  let questions: any[] = Array.isArray(input?.questions) ? input.questions : [];
  // Flatten legacy nested format: questions: [[...]]
  if (questions.length && Array.isArray(questions[0])) questions = questions.flat();

  const cleanQuestions = questions.map((q: any, i: number) => {
    const correct = q.correct_answer ?? q.correctAnswer ?? 0;
    return {
      id: q.id || q._id || `q_${Date.now()}_${i}`,
      subject: q.subject || "General",
      question_text: q.question_text ?? q.questionText ?? q.question ?? "",
      questionText: q.question_text ?? q.questionText ?? q.question ?? "",
      imageUrl: q.imageUrl || q.question_image || "",
      question_image: q.question_image || q.imageUrl || "",
      options: Array.isArray(q.options)
        ? q.options.map((o: any) => (typeof o === "string" ? o : o?.text ?? ""))
        : ["", "", "", ""],
      option_images: Array.isArray(q.option_images) ? q.option_images : [],
      correct_answer: typeof correct === "string" && /^\d+$/.test(correct) ? Number(correct) : correct,
      correctAnswer: typeof correct === "string" && /^\d+$/.test(correct) ? Number(correct) : correct,
      explanation: q.explanation || "",
      marks: 4,
      negativeMarks: 0,
    };
  });

  const now = new Date().toISOString();
  const duration = Number(input?.duration) || 60;

  return toFirestoreSafe({
    title: (input?.title || "Untitled Quiz").trim(),
    description: input?.description || input?.overview || "",
    overview: input?.overview || input?.description || "",
    examType: input?.examType || "Mock Test",
    classLevel: input?.classLevel || "",
    language: input?.language || "English",
    duration,
    totalDuration: duration,
    totalQuestions: cleanQuestions.length,
    totalMarks: cleanQuestions.length * 4,
    marks: cleanQuestions.length * 4,
    difficulty: input?.difficulty || "moderate",
    isPublished: input?.isPublished !== undefined ? Boolean(input.isPublished) : true,
    isLocked: Boolean(input?.isLocked),
    isFree: input?.isFree !== undefined ? Boolean(input.isFree) : true,
    instructions: Array.isArray(input?.instructions)
      ? input.instructions.filter((s: string) => s && s.trim())
      : [],
    syllabus: Array.isArray(input?.syllabus) ? input.syllabus : [],
    markingScheme: { correct: 4, incorrect: 0, unattempted: 0 },
    questions: cleanQuestions,
    createdAt: input?.createdAt || now,
    updatedAt: now,
  }) as Omit<Quiz, "id">;
}

/** Create a new quiz document. Returns the saved quiz with its id. */
export async function createQuizInFirestore(input: any): Promise<Quiz> {
  const doc = buildQuizDocument(input);

  if (isAdminConfigured() && adminDb) {
    try {
      const ref = await adminDb.collection("quizzes").add(doc);
      return normalizeQuiz({ ...(doc as Quiz), id: ref.id, _id: ref.id });
    } catch (e) {
      console.warn("Firestore quiz creation failed, falling back to local memory store:", e);
    }
  }

  // Local fallback: generate ID and append to mock list
  const fallbackId = `quiz_${Date.now()}`;
  const localQuiz: Quiz = normalizeQuiz({
    ...(doc as Quiz),
    id: fallbackId,
    _id: fallbackId,
  });
  initialMockQuizzes.unshift(localQuiz);
  return localQuiz;
}

/** Create or overwrite a quiz by id (used by the admin editor). */
export async function updateQuizInFirestore(id: string, input: any): Promise<Quiz> {
  if (isAdminConfigured() && adminDb) {
    try {
      const existing = await adminDb.collection("quizzes").doc(id).get();
      const createdAt = existing.exists ? existing.get("createdAt") : input?.createdAt;
      const doc = buildQuizDocument({ ...input, createdAt });
      await adminDb.collection("quizzes").doc(id).set(doc);
      return normalizeQuiz({ ...(doc as Quiz), id, _id: id });
    } catch (e) {
      console.warn("Firestore update failed, falling back to local memory store:", e);
    }
  }

  // Local fallback
  const doc = buildQuizDocument(input);
  const updatedQuiz = normalizeQuiz({ ...(doc as Quiz), id, _id: id });
  const idx = initialMockQuizzes.findIndex((q) => q.id === id || q._id === id);
  if (idx !== -1) {
    initialMockQuizzes[idx] = updatedQuiz;
  } else {
    initialMockQuizzes.unshift(updatedQuiz);
  }
  return updatedQuiz;
}

/** Delete a quiz by id. */
export async function deleteQuizFromFirestore(id: string): Promise<void> {
  if (isAdminConfigured() && adminDb) {
    try {
      await adminDb.collection("quizzes").doc(id).delete();
      return;
    } catch (e) {
      console.warn("Firestore delete failed, removing from local memory store:", e);
    }
  }

  // Local fallback
  const idx = initialMockQuizzes.findIndex((q) => q.id === id || q._id === id);
  if (idx !== -1) {
    initialMockQuizzes.splice(idx, 1);
  }
}

/**
 * Fetch all published quizzes with optional filters
 */
async function fetchQuizzesRaw(filters?: {
  examType?: string;
  classLevel?: string;
}): Promise<Quiz[]> {
  try {
    if (isAdminConfigured() && adminDb) {
      let query: FirebaseFirestore.Query = adminDb.collection("quizzes");

      if (filters?.examType && filters.examType.toUpperCase() !== "ALL") {
        query = query.where("examType", "==", filters.examType);
      }

      if (filters?.classLevel && filters.classLevel.toUpperCase() !== "ALL") {
        query = query.where("classLevel", "==", filters.classLevel);
      }

      const snapshot = await query.get();

      if (!snapshot.empty) {
        const firestoreQuizzes: Quiz[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Partial<Quiz>;
          firestoreQuizzes.push({
            id: doc.id,
            _id: doc.id, // For backward compatibility with components using item._id
            title: data.title || "Untitled Quiz",
            description: data.description || "",
            overview: data.overview || data.description || "",
            examType: data.examType || "Mock Test",
            classLevel: data.classLevel || "",
            language: data.language || "English",
            duration: data.duration || 60,
            totalDuration: data.totalDuration || data.duration || 60,
            totalMarks: data.totalMarks || 100,
            marks: data.marks || data.totalMarks || 100,
            totalQuestions: data.totalQuestions || (data.questions ? data.questions.length : 0),
            difficulty: data.difficulty || "Medium",
            isPublished: data.isPublished !== undefined ? data.isPublished : true,
            isLocked: data.isLocked || false,
            isFree: data.isFree !== undefined ? data.isFree : true,
            syllabus: data.syllabus || [],
            instructions: data.instructions || [],
            markingScheme: data.markingScheme || { correct: 4, incorrect: 1, unattempted: 0 },
            sections: data.sections || [],
            questions: data.questions || [],
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
          });
        });
        return firestoreQuizzes;
      }
    }
  } catch (error) {
    console.warn("Firestore quiz fetch failed, falling back to initial mock quizzes:", error);
  }

  // Fallback to built-in mock quizzes if Firestore collection is empty or not configured
  let result = [...initialMockQuizzes];

  if (filters?.examType && filters.examType.toUpperCase() !== "ALL") {
    result = result.filter(
      (q) => q.examType?.toLowerCase() === filters.examType?.toLowerCase()
    );
  }

  if (filters?.classLevel && filters.classLevel.toUpperCase() !== "ALL") {
    result = result.filter(
      (q) => q.classLevel?.toLowerCase() === filters.classLevel?.toLowerCase()
    );
  }

  return result;
}

/**
 * Fetch a single quiz by ID with full questions and sections
 */
async function fetchQuizByIdRaw(id: string): Promise<Quiz | null> {
  try {
    if (isAdminConfigured() && adminDb) {
      const docRef = adminDb.collection("quizzes").doc(id);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data() as Partial<Quiz>;
        return {
          id: doc.id,
          _id: doc.id,
          title: data.title || "Untitled Quiz",
          description: data.description || "",
          overview: data.overview || data.description || "",
          examType: data.examType || "Mock Test",
          classLevel: data.classLevel || "",
          language: data.language || "English",
          duration: data.duration || 60,
          totalDuration: data.totalDuration || data.duration || 60,
          totalMarks: data.totalMarks || 100,
          marks: data.marks || data.totalMarks || 100,
          totalQuestions: data.totalQuestions || (data.questions ? data.questions.length : 0),
          difficulty: data.difficulty || "Medium",
          isPublished: data.isPublished !== undefined ? data.isPublished : true,
          isLocked: data.isLocked || false,
          isFree: data.isFree !== undefined ? data.isFree : true,
          syllabus: data.syllabus || [],
          instructions: data.instructions || [],
          markingScheme: data.markingScheme || { correct: 4, incorrect: 1, unattempted: 0 },
          sections: data.sections || [],
          questions: data.questions || [],
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.warn(`Firestore getQuizById(${id}) failed, checking mock quizzes:`, error);
  }

  // Fallback to built-in mock quizzes
  const mockMatch = initialMockQuizzes.find((q) => q.id === id || q._id === id);
  return mockMatch || null;
}

// In-memory attempts store for local development fallback
export const mockQuizAttempts: any[] = [];

/**
 * Save student quiz attempt to Firestore (with local memory fallback)
 */
export async function saveQuizAttemptInFirestore(attempt: any): Promise<any> {
  const attemptId = attempt.attemptId || `attempt_${attempt.quizId || "quiz"}_${Date.now()}`;
  const record = {
    ...attempt,
    attemptId,
    id: attemptId,
    _id: attemptId,
    submittedAt: attempt.submittedAt || new Date().toISOString(),
  };

  if (isAdminConfigured() && adminDb) {
    try {
      await adminDb.collection("quiz_attempts").doc(attemptId).set(record);
      return record;
    } catch (error) {
      console.warn("Firestore saveQuizAttempt failed, falling back to local store:", error);
    }
  }

  // Local memory store fallback
  const existingIdx = mockQuizAttempts.findIndex((a) => a.attemptId === attemptId);
  if (existingIdx !== -1) {
    mockQuizAttempts[existingIdx] = record;
  } else {
    mockQuizAttempts.unshift(record);
  }
  return record;
}

/**
 * Fetch student quiz attempts by userId, sorted by most recent
 */
export async function getUserQuizAttemptsFromFirestore(userId: string): Promise<any[]> {
  if (!userId) return [];

  if (isAdminConfigured() && adminDb) {
    try {
      const snapshot = await adminDb
        .collection("quiz_attempts")
        .where("userId", "==", userId)
        .get();

      if (!snapshot.empty) {
        const attempts: any[] = [];
        snapshot.forEach((doc) => {
          attempts.push({ id: doc.id, ...doc.data() });
        });
        // Sort descending in memory to avoid requiring a composite Firestore index
        attempts.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
        return attempts;
      }
    } catch (error) {
      console.warn("Firestore getUserQuizAttempts failed, falling back to local store:", error);
    }
  }

  // Local fallback
  return mockQuizAttempts
    .filter((a) => a.userId === userId || (!userId && a.userId === "student-demo-user"))
    .sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
}

/**
 * Fetch a single quiz attempt by attemptId
 */
export async function getQuizAttemptByIdFromFirestore(attemptId: string): Promise<any | null> {
  if (!attemptId) return null;

  if (isAdminConfigured() && adminDb) {
    try {
      const doc = await adminDb.collection("quiz_attempts").doc(attemptId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (error) {
      console.warn("Firestore getQuizAttemptById failed:", error);
    }
  }

  const match = mockQuizAttempts.find((a) => a.attemptId === attemptId || a.id === attemptId);
  return match || null;
}
