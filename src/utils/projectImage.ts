const isDirectImageSource = (image: string) => image.startsWith('/') || /^https?:\/\//.test(image);

export const getProjectImageSource = (image: string) => (
    isDirectImageSource(image)
        ? image
        : `${process.env.NEXT_PUBLIC_API_URL}/media/${image}`
);
