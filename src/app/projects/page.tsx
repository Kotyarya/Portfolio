import {getProjectsPage} from "@/api/getProjectsPage";
import Projects from "@/components/Projects";
import SkillsPreview from "@/components/SkillsPreview";
import ContactMe from "@/components/ContactMe";
import {getProject, getProjectById, getProjectsFilterParam} from "@/api/getProjects";


interface ProjectsSearchParams {
    q?: string;
    category?: string;
    status?: string;
    stacks?: string | string[];
    projectId?: number;
}


export default async function Page({searchParams}: { searchParams: ProjectsSearchParams }) {

    const params = await searchParams
    const {skills, skillsPreview, projectsPreview, contactMe} = await getProjectsPage();
    const filterOptions = await getProjectsFilterParam();
    const {q = "", category = "", status = "", projectId} = params;

    const stacks = Array.isArray(params.stacks)
        ? params.stacks
        : params.stacks?.split(",") ?? [];

    const projects = await getProject(category, stacks, status, q);

    let project;
    if (projectId) {
        project = await getProjectById(projectId);
    } else {
        project = undefined;
    }


    return (
        <>

            <Projects projectsPreview={projectsPreview}
                      filterOptions={filterOptions} projects={projects}
                      searchParams={{q, category, status, stacks, projectId}} activeProject={project}/>
            <SkillsPreview skills={skills} skillsPreview={skillsPreview}/>
            <ContactMe contactMe={contactMe}/>
        </>
    );
}