import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col  min-h-screen">
      {/* <h2>Not Found</h2> */}
      <h1 className="text-red-400">404 - Not Found</h1>
      <p>This page does not exist.</p>
      <Link
        href="/"
        className="bg-[#393939] p-2 text-white rounded mt-4 hover:bg-[#2f2f2f] transition"
      >
        Return Home
      </Link>
    </div>
  );
}
