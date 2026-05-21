import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <section className="py-24 text-center">
      <div className="container-custom">
        <h1 className="text-6xl font-black text-[#0B1220]">404</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <div className="mt-8">
          <Button to="/">Go Home</Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;