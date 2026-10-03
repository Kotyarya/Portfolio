import {createServer} from 'node:http';

const block = {title: 'Portfolio', subtitle: 'Evidence', text: 'Recruiter-facing portfolio content'};
const home = {
    aboutMe: {...block, imgId: 'about.png'},
    skills: [],
    skillsPreview: block,
    projects: [],
    projectsPreview: block,
    contactMe: block,
};
const responses = {
    '/home': home,
    '/projects': [],
    '/skills': [],
    '/blocks/about_me': {...block, imgId: 'about.png'},
    '/blocks/skills_preview': block,
    '/blocks/projects_preview': block,
    '/blocks/contact_me': block,
    '/blocks/whats_next': {...block, whatsNextList: []},
    '/blocks/certificates': {...block, certificatesImgList: []},
};

const server = createServer((request, response) => {
    if (request.headers['x-api-key'] !== 'ci-secret') {
        response.writeHead(401, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({status: 401, message: 'Unauthorized', data: null}));
        return;
    }

    const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
    const data = responses[pathname];
    response.writeHead(data === undefined ? 404 : 200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({status: data === undefined ? 404 : 200, message: data === undefined ? 'Not found' : 'Success', data: data ?? null}));
});

server.listen(4010, '127.0.0.1', () => process.stdout.write('Mock API ready\n'));
