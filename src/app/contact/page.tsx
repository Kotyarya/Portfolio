import Contact from "@/components/Contact";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact Me — Maksym Aksamitnyi",
    description:
        "Contact Maksym Aksamitnyi for collaboration, freelance work or job opportunities.",
    alternates: {canonical: '/contact'},
};

export default async function Page() {

    return (
        <>
            <Contact/>
        </>
    );
}
