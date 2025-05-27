function HeroSection() {
  return (
    <section className="bg-white py-16 pt-72">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Note Weave</h1>
          <p className="text-xl text-gray-600 mb-6">
            Write Naturally. Weave Beautiful Notes. <br/>Seamless note-taking with instant Markdown formatting —
            no distractions, just flow.
          </p>
          <a
            href="/try"
            className="inline-block bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Try Note-Weave now
          </a>
        </div>

        {/* Image Placeholder */}
        <div className="w-full lg:w-1/2">
          {/* Replace with actual image path */}
          <img src="/hero_img2.png" alt="Note Weave Interface" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;