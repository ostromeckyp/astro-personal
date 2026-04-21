interface TimelineCardProps {
  title: string;
  subtitle: string;
  year: string;
  description?: string;
  skills?: string[];
}

export function TimelineCard({ title, subtitle, year, description, skills }: TimelineCardProps) {
  return (
    <div className="relative pl-12 pb-12 last:pb-0">
      <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-primary" aria-hidden="true" />
      </div>
      <div className="card hover:shadow-lg">
        <span className="text-sm text-gray-500 dark:text-gray-400">{year}</span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
        {description && (
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        )}
        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-300 rounded-full ring-1 ring-primary/10 dark:ring-primary/30"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
