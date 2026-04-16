export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind is Working
        </h1>
        <p className="mt-4 text-gray-600">If you see styling, you're good.</p>
        <div className="bg-red-500 text-white p-10">Tailwind Fixed</div>
      </div>
    </main>
  );
}
