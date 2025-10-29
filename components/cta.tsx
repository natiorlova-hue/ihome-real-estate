import { Button } from "./ui/button";

const CTA = () => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-12">
        <h3>Didn’t find what you’re looking for?</h3>
        <Button size="xl">Contact Us Today</Button>
      </div>
    </div>
  );
};

export default CTA;
