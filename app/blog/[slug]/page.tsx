import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { FormattedDate } from "@/components/FormattedDate";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

interface Params {
    slug: string;
}

export function generateStaticParams(): Params[] {
    return getAllSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const {slug} = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {title: "Post not found"};
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: "article",
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({params}: { params: Promise<Params> }) {
    const {slug} = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();

    return (
        <article className="prose prose-primary dark:prose-invert max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 not-prose">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 no-underline"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Blog
                </Link>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ViewTransition name={`post-image-${slug}`}>
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-[400px] object-cover rounded-xl shadow-lg dark:shadow-gray-900/10"
                    />
                </ViewTransition>
            </div>
            <div className="mx-auto">
                <div className="mb-8 not-prose">
                    <ViewTransition name={`post-title-${slug}`}>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {post.title}
                        </h1>
                    </ViewTransition>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                        </span>
                        <span className="mx-2" aria-hidden="true">•</span>
                        <FormattedDate date={post.date}/>
                    </div>
                </div>
                <div
                    className="dark:text-gray-300"
                    dangerouslySetInnerHTML={{__html: post.contentHtml}}
                />
            </div>
        </article>
    );
}
