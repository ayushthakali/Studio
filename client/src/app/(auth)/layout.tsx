import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-2xl shadow-blue-950">
        <div className="flex justify-center my-4">
          <Image
            src="/logoinwebp.webp"
            alt="logo"
            width={160}
            height={50}
            priority
            className="h-12 w-auto"
          />
        </div>
        <div className="px-4 space-y-6">{children}</div>
      </div>
    </div>
  );
}
