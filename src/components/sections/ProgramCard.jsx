import Card from "../common/Card";

export default function ProgramCard({ title, description, image }) {
  return (
    <Card className="mb-6">
      <h3 className="text-lime-300 font-bold text-lg mb-2">{title}</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <p className="text-blue-100 text-sm flex-1">{description}</p>
        <img
          src={image}
          alt={title}
          className="w-full md:w-40 h-32 object-cover rounded"
        />
      </div>
      <button className="mt-3 text-xs text-lime-300 underline">
        Read more
      </button>
    </Card>
  );
}