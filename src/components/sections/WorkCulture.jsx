import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

export default function WorkCulture() {
  return (
    <Card className="mb-6">
      <SectionTitle>Work Culture</SectionTitle>
      <div className="mt-4">
        <img
          src="/images/logo/workculture.png"
          alt="Work Culture - Rational Decision Making Model, 4 Respect, Human Centered Design"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </Card>
  );
}