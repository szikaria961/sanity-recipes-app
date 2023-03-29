import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img className="w-48 object-contain cursor-pointer" src="https://res.cloudinary.com/sabazikaria/image/upload/v1679403616/recipe-logo_tlr0tc.png"
          alt=""></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;