import type { ContactInput } from "@/lib/contact-schema";
import { PERSON } from "@/lib/site";

export interface ContactResponse {
    message: string;
}

const SEND_FAILED = `The message couldn't be sent. Please try again, or email ${PERSON.email}.`;

export async function submitContact(input: ContactInput): Promise<ContactResponse> {
    let res: Response;
    try {
        res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
    } catch {
        throw new Error(SEND_FAILED);
    }
    const data = (await res.json().catch(() => ({ message: "" }))) as ContactResponse;
    if (res.ok) return data;
    // Only validation messages are written for visitors; server errors can hold internal detail.
    throw new Error(res.status < 500 && data.message ? data.message : SEND_FAILED);
}
