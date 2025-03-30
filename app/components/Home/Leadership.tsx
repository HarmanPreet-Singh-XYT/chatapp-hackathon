
const Leadership = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Industry veterans building the future of software development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Anderson",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
                bio: "Former VP of Engineering at Google Cloud, 15+ years of enterprise software experience"
              },
              {
                name: "David Chen",
                role: "Chief Technology Officer",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
                bio: "Previously led infrastructure at AWS, scaled systems serving millions of users"
              },
              {
                name: "Emily Rodriguez",
                role: "VP of Product",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
                bio: "Product leader with experience at Microsoft, Stripe, and early-stage startups"
              }
            ].map((member, i) => (
              <div key={i} className="team-card-hover bg-white rounded-3xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Leadership