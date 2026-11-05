import { useMutation } from "@tanstack/react-query";
import { submitContact } from "@/lib/contact";
import type { ContactInput } from "@/lib/contact-schema";

export function useContactMutation(sendFailed?: string) {
  return useMutation({
    mutationFn: (input: ContactInput) => submitContact(input, sendFailed),
  });
}
