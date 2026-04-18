export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-gray-400">
        <p>© 2026 Social Support Portal</p>
        <div className="flex gap-5">
          <span className="hover:text-gray-600 cursor-pointer transition">Privacy</span>
          <span className="hover:text-gray-600 cursor-pointer transition">Terms</span>
          <span className="hover:text-gray-600 cursor-pointer transition">Help</span>
        </div>
      </div>
    </footer>
  );
}