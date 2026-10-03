interface ProjectFilters {
    query: string;
    category?: string;
    status?: string;
    stacks: string[];
}

export const buildProjectsQuery = (current: string, filters: ProjectFilters) => {
    const params = new URLSearchParams(current);

    params.delete('q');
    params.delete('category');
    params.delete('status');
    params.delete('stacks');

    if (filters.query) params.set('q', filters.query);
    if (filters.category) params.set('category', filters.category);
    if (filters.status) params.set('status', filters.status);
    if (filters.stacks.length) params.set('stacks', filters.stacks.join(','));

    return params.toString();
};

export const setProjectModalQuery = (current: string, projectId?: number) => {
    const params = new URLSearchParams(current);

    if (projectId) {
        params.set('projectId', projectId.toString());
    } else {
        params.delete('projectId');
    }

    return params.toString();
};
