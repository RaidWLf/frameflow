import { SignIn } from "@clerk/nextjs";
import "tailwindcss/tailwind.css";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <SignIn />
      </div>
    </div>
  );
}
