import {ImageResponse} from 'next/og';

export const alt = 'Maksym Aksamitnyi — Full-Stack TypeScript Developer';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '72px 80px',
                    color: '#f6e7b0',
                    background: 'linear-gradient(135deg, #090909 0%, #17130c 62%, #3a2a0d 100%)',
                    fontFamily: 'serif',
                }}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
                    <div
                        style={{
                            width: 76,
                            height: 76,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid #d9ba65',
                            borderRadius: 18,
                            fontSize: 42,
                            fontWeight: 700,
                        }}
                    >
                        MA
                    </div>
                    <div style={{fontSize: 28, letterSpacing: 5, textTransform: 'uppercase'}}>Portfolio</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
                    <div style={{fontSize: 72, fontWeight: 700, lineHeight: 1.05}}>Maksym Aksamitnyi</div>
                    <div style={{fontSize: 38, color: '#ffffff'}}>Full-Stack TypeScript Developer</div>
                    <div style={{fontSize: 25, color: '#c9b879'}}>Next.js · React · NestJS · PostgreSQL</div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#d9ba65'}}>
                    <span>Selected projects, decisions and results</span>
                    <span>aksamitny.com</span>
                </div>
            </div>
        ),
        size,
    );
}
