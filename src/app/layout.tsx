import type {Metadata} from 'next';
import {Cinzel, Lato, Lora, Taviraj} from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import Script from "next/script";


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
    title: "Maksym Aksamitnyi — Portfolio",
    description: "Maksym Aksamitnyi (Максим Аксамітний) personal portfolio.",
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
            <Script
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
                        url: "https://YOUR-DOMAIN.COM",
                        sameAs: [
                            "https://github.com/USERNAME",
                            "https://www.linkedin.com/in/USERNAME",
                            "https://www.instagram.com/USERNAME"
                        ]
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
