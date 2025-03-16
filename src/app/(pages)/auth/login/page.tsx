import LoginForm from "@/app/components/LoginForm/LoginForm";
import Logo from "@/app/components/Logo/Logo";
import Image from "next/image";

const LoginPage = () => {
  return (
    <section className="custom-container py-4 flex flex-col gap-x-4 gap-y-8 bg-white rounded-xl my-4 md:flex-row">
      <div className="w-full bg-white flex flex-col items-center justify-between gap-8 md:w-1/2">
        {/* logo */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mx-auto">
            <Logo bg={false} />
          </div>
          <h1 className="text-xl text-primary-dark -mt-2">
            شرکت داده پردازی نوین
          </h1>
        </div>
        {/* Form */}
        <LoginForm />

        {/* wavy shape */}
        <div className="relative w-full h-44 hidden md:block">
          <Image
            src={"/images/wavy-shape.svg"}
            alt="wavy-image"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      {/* vector */}
      <div className="relative min-h-100 w-full overflow-hidden md:w-1/2 md:min-h-120">
        <Image
          src={"/images/auth-vector.png"}
          alt="wavy-image"
          fill
          style={{
            height: "100%",
            width: "100%",
            minHeight: "400px",
            // objectFit: "cover",
          }}
        />
      </div>
    </section>
  );
};

export default LoginPage;
