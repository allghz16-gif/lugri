export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border-2 border-blue-900 rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}