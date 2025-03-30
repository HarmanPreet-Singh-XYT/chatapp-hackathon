import React from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Network 
} from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "How AI is Enhancing Chat Conversations",
      category: "Product Updates",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQGeQPqQLh_PUQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1698198023609?e=2147483647&v=beta&t=5uG2Lz8B5jdnLh0kZOPyYSOYWdyHrxlWsOK-bgscDpM",
      date: "March 15, 2025",
      readTime: "5 min read",
      excerpt: "Discover how AI-powered chatbots, smart replies, and voice recognition are transforming real-time messaging experiences.",
      tags: ["AI", "Messaging", "Chatbots"]
    },
    {
      title: "End-to-End Encryption: How Secure is Your Chat?",
      category: "Security",
      image: "https://techcrunch.com/wp-content/uploads/2016/07/facebook-messenger-encryption1.png",
      date: "March 12, 2025",
      readTime: "7 min read",
      excerpt: "A deep dive into the latest advancements in chat security, including end-to-end encryption, zero-knowledge protocols, and privacy best practices.",
      tags: ["Encryption", "Privacy", "Cybersecurity"]
    },
    {
      title: "Building Scalable Chat Apps with WebSockets",
      category: "Engineering",
      image: "https://www.jurist.org/commentary/wp-content/uploads/sites/3/2021/06/whatsapp-2842640_640.png",
      date: "March 10, 2025",
      readTime: "6 min read",
      excerpt: "Explore how WebSockets power real-time communication, ensuring seamless messaging experiences at scale.",
      tags: ["WebSockets", "Real-time", "Scalability"]
    }
];

const CategoryIcons = {
    "Product Updates": Zap,
    "Security": ShieldCheck,
    "Engineering": Network
};

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-5">
          <h2 className="text-6xl font-black text-transparent bg-clip-text 
            bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent 
            tracking-tight leading-tight">
            Insights & Innovation
          </h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Cutting-edge perspectives at the intersection of technology, strategy, and innovation
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            const CategoryIcon = CategoryIcons[post.category] || Zap;

            return (
              <div 
                key={index} 
                className="group relative transform transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  {/* Post Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <CategoryIcon className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 space-y-4">
                    {/* Category */}
                    <div className="text-sm text-indigo-600 font-medium flex items-center space-x-2">
                      <span>{post.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span>{post.date}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      {/* Read More Arrow */}
                      <ArrowRight 
                        className="w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Blog;