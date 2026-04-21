interface FormattedDateProps {
  date: string | Date;
  className?: string;
}

export function FormattedDate({ date, className }: FormattedDateProps) {
  const d = typeof date === "string" ? new Date(date) : date;
  const formatted = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
  return (
    <time dateTime={d.toISOString()} className={className}>
      {formatted}
    </time>
  );
}
