import { useEffect, useState, type FormEvent } from "react";

export default function Contact() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const formEntries = Object.fromEntries(formData.entries());

        setError('');
        setMessage('');
        setIsLoading(true);

        await fetch(`/api/contact?data=${encodeURIComponent(JSON.stringify(formEntries))}`, {
            method: 'POST',
            body: JSON.stringify(formEntries)
        }).then(async (res) => {
            const data = await res.json();
            
            if (res.ok) {
                setMessage(data.message);
                return;
            }
            setIsLoading(false);
            setError(data.message);
        }).catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
     }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-text">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              autoComplete="off"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primaryShadowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:bg-gray-400"
            >
              Send Message
            </button>
          </div>
          {message && (
            
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                <div>{message}</div>
                <div>Thank you for a contact</div>
                </p>
            
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </form>
      );
}


const useFetch = (url: string, method: string) => {
    const [address, setAddress] = useState(url);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
    }, [address]);

    return { data, error };
}