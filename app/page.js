import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
      <p className="mb-4">Click the button below to access the Component Builder.</p>
      <Link
        href="/component-builder"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Component Builder
      </Link>
      <p className="mb-4">Click the button below to access the Asset Builder.</p>
      <Link
        href="/asset-builder"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Asset Builder
      </Link>
    </main>
  );
}
