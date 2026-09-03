export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border-2 border-[#97E614] rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  )
}