import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{userAgent: "*", allow: "/"}],
        sitemap: 'https://aksamitny.com/sitemap.xml',
        host: 'https://aksamitny.com',
    };
}
