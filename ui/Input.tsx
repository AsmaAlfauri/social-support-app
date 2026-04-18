export default function Input({ label, error, required, icon, ...props }: any) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
            text-sm text-gray-900 placeholder:text-gray-400
            focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            outline-none transition
            ${icon ? "pl-10" : ""}
          `}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}