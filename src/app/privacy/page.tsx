import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy — Maksym Aksamitnyi',
    description: 'How contact form data is handled on aksamitny.com.',
    alternates: {canonical: '/privacy'},
};

export default function PrivacyPage() {
    return (
        <article className="mx-auto w-[90vw] max-w-3xl py-20 font-lora text-white">
            <h1 className="mb-8 font-cinzel text-3xl font-bold text-gold-primary mobile:text-4xl">
                Privacy
            </h1>
            <div className="space-y-7 text-2xs leading-relaxed mobile:text-xs">
                <section>
                    <h2 className="mb-2 font-cinzel text-lg font-bold text-gold-primary">Contact form</h2>
                    <p>
                        When you submit the contact form, your name, email address and message are sent to the site
                        owner by email so your enquiry can be answered. New submissions are not stored in the
                        portfolio application database.
                    </p>
                </section>
                <section>
                    <h2 className="mb-2 font-cinzel text-lg font-bold text-gold-primary">Retention and access</h2>
                    <p>
                        Messages may remain in the private mailbox only for as long as they are useful for responding
                        and keeping necessary correspondence. Mailbox access is limited to the site owner. Application
                        error logs intentionally exclude your name, email address and message content.
                    </p>
                </section>
                <section>
                    <h2 className="mb-2 font-cinzel text-lg font-bold text-gold-primary">Your request</h2>
                    <p>
                        You can ask for your contact message to be deleted by sending a request through the{' '}
                        <Link href="/contact" className="text-gold-primary underline underline-offset-2">
                            contact page
                        </Link>{' '}
                        from the same email address. Please do not submit passwords, payment details or other sensitive
                        information.
                    </p>
                </section>
            </div>
        </article>
    );
}
