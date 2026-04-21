import type { ContactInput } from "@/lib/contact-schema";

export interface ContactResponse {
    message: string;
}

export async function submitContact(input: ContactInput): Promise<ContactResponse> {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    const data = (await res.json().catch(() => ({ message: "Unexpected error" }))) as ContactResponse;
    if (!res.ok) throw new Error(data.message || "Failed to send message");
    return data;
}
