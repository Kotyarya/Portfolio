interface IBlock {
    title: string;
    subtitle: string;
    text: string;
}

interface IBlockImg extends IBlock {
    imgId: string;
}


interface IBlockBeyondCode extends IBlock {
    tagList: [string];
}

interface IWhatsNextElement {
    title: string;
    imgId: string;
    subtasksList: [string];
}

interface IBlockWhatsNext extends IBlock {
    whatsNextList: [IWhatsNextElement];
}


interface IBlockCertificates extends IBlock {
    certificatesImgList: [string];
}

interface ISkill {
    id: number;
    name: string;
    importance: number;
    img: string;
    text: string;
}

interface IProject {
    id: number,
    name: string,
    githubLink: string,
    link: string,
    text: string,
    importance: number,
    img: string,
    skills: {
        name: string;
        importance: number;
    }[],
    category: {
        name: string
    },
    status: {
        name: string,
        img: string
    }
}


export type {
    IBlock,
    IBlockImg,
    IBlockBeyondCode,
    IWhatsNextElement,
    IBlockWhatsNext,
    IBlockCertificates,
    ISkill,
    IProject
};
