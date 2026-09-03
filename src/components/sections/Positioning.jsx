import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

export default function Positioning() {
  return (
    <Card className="mb-6">
      <SectionTitle>Positioning</SectionTitle>
      <div className="mt-4">
        <img
          src="/images/logo/positioning.png"
          alt="Positioning - The Distributor, The Accelerator, The Connector"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </Card>
  );
}