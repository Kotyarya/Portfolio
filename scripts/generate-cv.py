from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "Maksym-Aksamitnyi-CV-2026.pdf"
PAGE_WIDTH, PAGE_HEIGHT = A4
INK = colors.HexColor("#181A19")
GOLD = colors.HexColor("#AD9255")
MUTED = colors.HexColor("#5B625F")
PALE = colors.HexColor("#F3F0E9")


def link(url: str, label: str) -> str:
    return f'<link href="{url}" color="#7B642F"><u>{label}</u></link>'


def build_cv() -> None:
    output_dir = OUTPUT.parent
    output_dir.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=17 * mm,
        rightMargin=17 * mm,
        topMargin=14 * mm,
        bottomMargin=13 * mm,
        title="Maksym Aksamitnyi - Full-Stack TypeScript Developer CV",
        author="Maksym Aksamitnyi",
        subject="Curriculum Vitae - updated October 2026",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="cv",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    def paint_background(canvas, _doc):
        canvas.saveState()
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
        canvas.restoreState()

    doc.addPageTemplates([PageTemplate(id="one-page", frames=[frame], onPage=paint_background)])

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle(
        "Name",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=27,
        leading=30,
        textColor=INK,
        alignment=TA_CENTER,
        spaceAfter=2 * mm,
    )
    role_style = ParagraphStyle(
        "Role",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=15,
        textColor=GOLD,
        alignment=TA_CENTER,
        spaceAfter=2.5 * mm,
    )
    contact_style = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=4 * mm,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=GOLD,
        spaceBefore=3.2 * mm,
        spaceAfter=1.8 * mm,
        borderWidth=0,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12.4,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=1.5 * mm,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=4 * mm,
        firstLineIndent=-2.5 * mm,
        bulletIndent=0,
        spaceAfter=1.1 * mm,
    )
    small_style = ParagraphStyle(
        "Small",
        parent=body_style,
        fontSize=8,
        leading=10.5,
        textColor=MUTED,
    )

    story = [
        Paragraph("MAKSYM AKSAMITNYI", name_style),
        Paragraph("FULL-STACK TYPESCRIPT DEVELOPER", role_style),
        Paragraph(
            "Warsaw, Poland &nbsp;&nbsp;|&nbsp;&nbsp; "
            + link("mailto:aksamitnyi@icloud.com", "aksamitnyi@icloud.com")
            + " &nbsp;&nbsp;|&nbsp;&nbsp; "
            + link("https://aksamitny.com", "aksamitny.com")
            + " &nbsp;&nbsp;|&nbsp;&nbsp; "
            + link("https://github.com/Kotyarya", "GitHub")
            + " &nbsp;&nbsp;|&nbsp;&nbsp; "
            + link("https://www.linkedin.com/in/maksym-aksamitnyi-0b0967330/", "LinkedIn"),
            contact_style,
        ),
        Table(
            [[Paragraph(
                "I build and deploy accessible web products across the full stack with Next.js, React, "
                "NestJS and PostgreSQL. My work combines recruiter-focused UX, technical SEO, API security "
                "and production deployment. Open to remote and hybrid roles.",
                body_style,
            )]],
            colWidths=[doc.width],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#D8CFBB")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]),
        ),
        Paragraph("CORE SKILLS", section_style),
        Table(
            [
                [Paragraph("Frontend", small_style), Paragraph("TypeScript, React, Next.js App Router, semantic HTML, responsive UI, accessibility", body_style)],
                [Paragraph("Backend", small_style), Paragraph("Node.js, NestJS, REST APIs, DTO validation, rate limiting, email delivery", body_style)],
                [Paragraph("Data & delivery", small_style), Paragraph("PostgreSQL, Prisma, Git/GitHub, Vercel, Render, CI-ready workflows", body_style)],
                [Paragraph("Quality", small_style), Paragraph("Technical SEO, structured data, security headers, linting, builds and focused tests", body_style)],
            ],
            colWidths=[31 * mm, doc.width - 31 * mm],
            style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.25, colors.HexColor("#E1DDD4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
            ]),
        ),
        Paragraph("SELECTED PROJECT", section_style),
        Paragraph(
            f"<b>Portfolio Website - Full-Stack Case Study</b> &nbsp; "
            f"{link('https://aksamitny.com', 'Live product')} &nbsp; "
            f"{link('https://github.com/Kotyarya/Portfolio', 'Frontend')} &nbsp; "
            f"{link('https://github.com/Kotyarya/Portfolio-Server', 'Backend')}",
            body_style,
        ),
        Paragraph(
            "Solo full-stack developer responsible for product structure, UI, API, data model, security and deployment.",
            small_style,
        ),
        Paragraph("Designed an end-to-end platform with a server-rendered Next.js interface, NestJS REST API and PostgreSQL content storage.", bullet_style, bulletText="-"),
        Paragraph("Built recruiter-first project case studies, responsive navigation and an accessible contact workflow with inline validation and safe feedback.", bullet_style, bulletText="-"),
        Paragraph("Added technical SEO foundations: canonical URLs, sitemap, robots rules, semantic headings and Person structured data.", bullet_style, bulletText="-"),
        Paragraph("Hardened the API with strict validation, security headers, fail-closed access controls and contact rate limiting; deployed independently on Vercel and Render.", bullet_style, bulletText="-"),
        Paragraph("ENGINEERING APPROACH", section_style),
        Paragraph("Prefer small, reviewable changes, explicit validation boundaries and server-rendered metadata. Treat accessibility, performance, security and recruiter clarity as product requirements.", body_style),
        Paragraph("EDUCATION", section_style),
        Paragraph("<b>Vistula University, Warsaw</b> - Computer Science", body_style),
        Paragraph("March 2023 - Present", small_style),
        Spacer(1, 4 * mm),
        Paragraph("Updated October 2026. References and additional project details are available at aksamitny.com.", small_style),
    ]

    doc.build(story)


if __name__ == "__main__":
    build_cv()
