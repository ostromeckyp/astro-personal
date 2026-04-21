import { useMutation } from "@tanstack/react-query";
import { submitContact } from '@/lib/contact';

export function useContactMutation(onSuccess: () => void) {
    return useMutation({
        mutationFn: submitContact,
        onSuccess,
    });
}
