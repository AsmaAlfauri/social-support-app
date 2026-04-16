export default function Step3() {
  return (
    <div>
      <h3 className="font-semibold mb-4">Situation Description</h3>

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Current Financial Situation"
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Reason for applying"
      />
    </div>
  );
}