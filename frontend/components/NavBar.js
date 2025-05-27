export default function NavBar() {
  return (
    <nav className="bg-white  fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start py-1">
          {/* Logo */}
          <div className="flex items-start">
            <img 
              src="/logo.png" 
              alt="NoteWeave Logo" 
              className="h-40 w-auto" 
            />
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex space-x-8 items-start pt-2">
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
            >
              About
            </a>
            <a 
              href="/faq" 
              className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
            >
              FAQ
            </a>
            <a 
              href="/login" 
              className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}