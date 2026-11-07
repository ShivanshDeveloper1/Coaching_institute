import HeroLearnerSection from "@/components/(Homepage)/HeroLearnerSection";
import AcademicFoundationsSection from "@/components/(Homepage)/AcademicFoundationsSection";
import TeacherShowcaseSection from "@/components/(Homepage)/TeacherShowcaseSection";
import ApproachSection from "@/components/(Homepage)/ApproachSection";
import StorySection from "@/components/(Homepage)/StorySection";
import PopularCoursesSection from "@/components/(Homepage)/PopularCoursesSection";
import TestimonialsSection from "@/components/(Homepage)/Reviews";
import AdmissionEnquirySection from "@/components/(Homepage)/AdmissionEnquirySection";

export default function HomePage() {
  return (
    <>
      <HeroLearnerSection />
      <AcademicFoundationsSection />
      <TeacherShowcaseSection />
      <ApproachSection />
      <StorySection />
      <PopularCoursesSection />
      <TestimonialsSection />
      <AdmissionEnquirySection />
    </>
  );
}
