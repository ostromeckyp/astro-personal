export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">
          © {year} Paweł Ostromecki Enterprise Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
