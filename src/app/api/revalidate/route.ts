import {NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

export async function POST(req: Request) {
    try {
        const {token, tag} = await req.json();

        if (!token || token !== process.env.REVALIDATE_TOKEN) {
            return NextResponse.json({ok: false, error: "Unauthorized"}, {status: 401});
        }

        if (!tag || typeof tag !== "string") {
            return NextResponse.json({ok: false, error: "Missing tag"}, {status: 400});
        }

        revalidateTag(tag);

        return NextResponse.json({ok: true, revalidated: tag});
    } catch {
        return NextResponse.json({ok: false, error: "Bad request"}, {status: 400});
    }
}