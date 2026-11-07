import { notFound } from "next/navigation";
import { courses } from "../../site-data";
import CheckoutClient from "@/components/CheckoutClient";


export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.slug }));
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = await params;
  const course = courses.find((item) => item.slug === resolvedParams.courseId);

  if (!course) {
    return notFound();
  }

  return <CheckoutClient course={course} />;
}