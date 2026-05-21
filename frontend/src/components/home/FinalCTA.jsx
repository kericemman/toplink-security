import Button from "../common/Button";

const FinalCTA = () => {
  return (
    <section className="bg-blue-gradient py-8 text-white">
      <div className="container-custom text-center">
        <h2 className="mx-auto max-w-3xl text-2xl font-black md:text-4xl">
          Strong Security Starts With Awareness, Structure, and Preparedness.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-blue-100">
          Begin your journey to better security with practical guidance,
          structured assessments, and professional support.
        </p>

        <div className="mt-8">
          <Button to="/contact" variant="secondary">
            Schedule Your Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;