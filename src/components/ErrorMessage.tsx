export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-red-500 text-center mb-3">
      <h1>{message}</h1>
    </div>
  );
}