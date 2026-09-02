export default function ProfileCard({ name, role, photo }) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-blue-400/30">
      <img src={photo} alt={name} className="w-full h-64 object-cover" />
      <div className="bg-[#0a1a4d] p-2 text-center">
        <p className="text-white font-semibold text-sm">{role}</p>
        <p className="text-blue-200 text-xs">{name}</p>
      </div>
    </div>
  );
}