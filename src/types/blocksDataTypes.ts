interface IBlock {
    title: string;
    subtitle: string;
    text: string;
}

interface IBlockImg extends IBlock  {
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

interface IBlockWhatsNext extends IBlock  {
    whatsNextList: [IWhatsNextElement];
}



interface IBlockCertificates extends IBlock {
    certificatesImgList: [string];
}


export type {
    IBlock,
    IBlockImg,
    IBlockBeyondCode,
    IWhatsNextElement,
    IBlockWhatsNext,
    IBlockCertificates
};
