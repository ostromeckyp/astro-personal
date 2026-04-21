import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";
import { FormattedDate } from "./FormattedDate";

interface BlogCardProps {
    title: string;
    image: string;
    category: string;
    date: string;
    slug: string;
}

export function BlogCard({title, image, category, date, slug}: BlogCardProps) {
    return (
        <article
            className="overflow-hidden rounded-xl shadow-lg dark:shadow-gray-900/10 hover:shadow-xl dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1"
        >
            <Link href={`/blog/${slug}`}>
                <ViewTransition name={`post-image-${slug}`}>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </ViewTransition>
                <div className="p-6 bg-white dark:bg-dark-card">
                    <ViewTransition name={`post-title-${slug}`}>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h2>
                    </ViewTransition>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 px-3 py-1 rounded-full">
                            {category}
                        </span>
                        <span className="mx-2" aria-hidden="true">•</span>
                        <FormattedDate date={date}/>
                    </div>
                </div>
            </Link>
        </article>
    );
}
