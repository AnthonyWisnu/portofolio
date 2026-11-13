import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CURATED_PROJECTS } from "@/data/projects";
import { OWNER_PROFILE } from "@/data/owner";
import { ProjectDetailView } from "@/features/projects/ProjectDetailView";
import { Footer } from "@/features/contact/Footer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CURATED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = CURATED_PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: `Proyek Tidak Ditemukan | ${OWNER_PROFILE.name}`,
    };
  }

  return {
    title: `${project.shortTitle} | ${OWNER_PROFILE.name}`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} - Studi Kasus Rekayasa`,
      description: project.summary,
      images: [
        {
          url: project.coverImage || "/images/og-portrait.jpg",
          width: project.screenshots[0]?.width ?? 1200,
          height: project.screenshots[0]?.height ?? 675,
          alt: project.screenshots[0]?.alt ?? project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const currentIndex = CURATED_PROJECTS.findIndex((item) => item.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = CURATED_PROJECTS[currentIndex];
  const prevProject =
    CURATED_PROJECTS[(currentIndex - 1 + CURATED_PROJECTS.length) % CURATED_PROJECTS.length];
  const nextProject = CURATED_PROJECTS[(currentIndex + 1) % CURATED_PROJECTS.length];

  return (
    <>
      <ProjectDetailView
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
      <Footer variant="dark" />
    </>
  );
}
