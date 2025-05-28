export default function NavBar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start py-1">
          {/* Logo */}
          <div className="flex items-start">
            <img 
              src="/logo.png" 
              alt="NoteWeave Logo" 
              className="h-15 w-auto" 
            />
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex space-x-8 items-center pt-2">
            {['Home', 'About', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 font-medium relative after:block after:h-0.5 after:bg-teal-500 after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100"
              >
                {item}
              </a>
            ))}

            <a
              href="/login"
              className="bg-teal-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition"
            >
              Login
            </a>

          </div>
        </div>
      </div>
    </nav>
  );
}