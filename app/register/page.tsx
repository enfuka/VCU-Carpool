import Image from "next/image";
import Form from "@/components/form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen px-5 items-center justify-center bg-black">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href="/">
            <Image
              src="/vcu_logo.svg"
              alt="Logo"
              className="h-10 w-32"
              width={20}
              height={20}
            />
          </a>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <Form type="register" />
      </div>
    </div>
  );
}
