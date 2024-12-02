import { session } from "@/libs/session";
import { redirect } from "next/navigation";

export async function GET() {
await session().set('grantId', null)
await session().set('email', null)
redirect('/?logged-out=1')
}