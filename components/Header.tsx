import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img className="w-48 object-contain cursor-pointer" src="https://res.cloudinary.com/sabazikaria/image/upload/v1679403616/recipe-logo_tlr0tc.png"
          alt=""></img>
        </Link>
        <div className="hidden md:inline-flex item-center space-x-10">
          <h3 className="text-white bg-sky-500 px-4 py-1 rounded-full ml-16">About</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-sky-500">
        <h3 className="border px-4 rounded-full border-sky-500">Sign In</h3>
      </div>
    </header>
  );
}

export default Header;