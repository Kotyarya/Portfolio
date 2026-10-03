import type {Metadata} from 'next';
import {Cinzel, Lato, Lora, Taviraj} from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import {buildPageMetadata} from '@/utils/siteMetadata';


const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
    weight: ["400", "700"],
});

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["400", "700"],
});

const taviraj = Taviraj({
    variable: "--font-taviraj",
    subsets: ["latin"],
    weight: ["400", "700"],
})

const cinzel = Cinzel({
    variable: "--font-cinzel",
    subsets: ["latin"],
    weight: ["400", "700"],
})


export const metadata: Metadata = {
    metadataBase: new URL('https://aksamitny.com'),
    ...buildPageMetadata({
        title: 'Maksym Aksamitnyi | Full-Stack TypeScript Developer',
        description: 'Full-stack developer portfolio featuring production work with Next.js, React, NestJS and PostgreSQL, plus software and iOS learning projects.',
        path: '/',
    }),
    robots: {index: true, follow: true},
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="max-ipad:" lang="en">
        <head>
            <script
                id="person-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "Maksym Aksamitnyi",
                        alternateName: [
                            "Максим Аксамітний",
                            "Maksym Aksamitnyy"
                        ],
                        url: "https://aksamitny.com",
                        jobTitle: "Full-Stack TypeScript Developer",
                        sameAs: [
                            "https://github.com/Kotyarya",
                            "https://www.linkedin.com/in/maksym-aksamitnyi-0b0967330/",
                            "https://www.instagram.com/kotyarya_/"
                        ],
                        knowsAbout: [
                            "TypeScript",
                            "Next.js",
                            "React",
                            "NestJS",
                            "PostgreSQL"
                        ],
                    }),
                }}
            />
        </head>
        <body
            className={`${lora.variable} ${lato.variable} ${taviraj.variable} ${cinzel.variable} antialiased relative`}
        >
        <Header/>
        <main className='flex flex-col gap-36 items-center w-full overflow-x-hidden'>
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
