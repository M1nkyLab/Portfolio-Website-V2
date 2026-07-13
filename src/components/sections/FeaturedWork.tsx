"use client";



const projects = [
  {
    title: "Cave",
    image: "/images/coming-soon.svg",
    link: "#"
  }
];

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-syedhaziq-surface min-h-screen py-24 px-6 md:px-12 lg:px-24">
      
      <div className="max-w-[1600px] mx-auto">
        
        {/* Quote Section */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-4 mb-24">
          <p className="text-syedhaziq-text/80 font-body max-w-4xl text-2xl md:text-4xl lg:text-5xl leading-relaxed font-medium">
            &quot;Even though it&apos;s not the perfect project, it&apos;s a part of the learning process for me to make it better in the future.&quot;
          </p>
        </div>
        
        {/* Projects Section */}
        <div className="mb-16 w-full">
          <h2 className="text-3xl md:text-5xl font-body font-bold text-syedhaziq-gold">
            Things I&apos;m proud of
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <a 
              key={i}
              href={project.link}
              className="group relative flex flex-col w-full"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-sm bg-black/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Text Below */}
              <div className="mt-2 inline-block">
                <h3 className="text-xl md:text-2xl font-body font-bold text-syedhaziq-gold transition-colors">
                  {project.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
