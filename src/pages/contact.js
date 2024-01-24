import PublicLayout from "@/HOC/public-layouts/PublicLayout";

const Contact = () => {
  return (
    <PublicLayout pageTitle={"Contact"}>
     <div className="bg-gray-900">
        <div className="py-34 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                This is contact page
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contact;
