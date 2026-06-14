export default function LinkNotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Link Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          The shortened URL you're trying to access
          does not exist.
        </p>
      </div>
    </main>
  );
}