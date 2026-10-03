import {getProjectsPage} from "@/api/getProjectsPage";
import Projects from "@/components/Projects";
import SkillsPreview from "@/components/SkillsPreview";
import ContactMe from "@/components/ContactMe";
import {getProject, getProjectById, getProjectsFilterParam} from "@/api/getProjects";
import type {Metadata} from "next";
import {hasActiveSearchParams} from '@/utils/queryMetadata';
import {buildPageMetadata} from '@/utils/siteMetadata';


interface ProjectsSearchParams {
    q?: string;
    category?: string;
    status?: string;
    stacks?: string | string[];
    projectId?: string;
}


const pageMetadata: Metadata = buildPageMetadata({
    title: 'Full-Stack Projects | Maksym Aksamitnyi',
    description: 'Explore evidence-based case studies by Maksym Aksamitnyi covering Next.js, React, NestJS, PostgreSQL, C# and product delivery decisions.',
    path: '/projects',
});

export async function generateMetadata({searchParams}: {searchParams: Promise<ProjectsSearchParams>}): Promise<Metadata> {
    const params = await searchParams;
    const hasQuery = hasActiveSearchParams(params);

    return hasQuery
        ? {...pageMetadata, robots: {index: false, follow: true}}
        : pageMetadata;
}

export default async function Page({searchParams}: { searchParams: Promise<ProjectsSearchParams> }) {

    const params = await searchParams
    const {skills, skillsPreview, projectsPreview, contactMe} = await getProjectsPage();
    const filterOptions = await getProjectsFilterParam();
    const rawProjectId = params.projectId;
    const projectId = rawProjectId ? Number(rawProjectId) : undefined;
    const validProjectId = Number.isFinite(projectId) ? projectId : undefined;
    const {q = "", category = "", status = ""} = params;

    const stacks = Array.isArray(params.stacks)
        ? params.stacks
        : params.stacks?.split(",") ?? [];

    const projects = await getProject(category, stacks, status, q);

    let project;
    if (validProjectId) {
        project = await getProjectById(validProjectId);
    } else {
        project = undefined;
    }


    return (
        <>

            <Projects projectsPreview={projectsPreview}
                      filterOptions={filterOptions} projects={projects}
                      searchParams={{q, category, status, stacks, projectId: validProjectId}} activeProject={project}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}
