import Card from "../common/Card";

export default function ContactCard({ title, name, photo }) {
  return (
    <Card className="flex justify-between items-center mb-4">
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <button className="mt-2 bg-lime-400 text-black text-xs px-3 py-1 rounded-full">
          Contact
        </button>
      </div>
      <img
        src={photo}
        alt={name}
        className="w-20 h-24 object-cover rounded"
      />
    </Card>
  );
}