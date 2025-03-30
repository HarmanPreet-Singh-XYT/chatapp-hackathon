import { Shield, Cpu, Users, Database, Terminal, Settings, CheckCircle2 } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Powerful Messaging for Everyone</h2>
          <p className="text-xl text-gray-600">
            Secure, fast, and feature-rich communication built for individuals, teams, and businesses.
          </p>
        </div>


          <div className="feature-grid">
            {[
              {
                icon: Shield,
                title: "End-to-End Encryption",
                description: "Industry-leading security ensuring private and secure conversations for individuals and businesses.",
                features: ["E2E Encryption", "Two-Factor Authentication", "Privacy Controls", "Secure Cloud Backups"]
              },
              {
                icon: Cpu,
                title: "Lightning-Fast Performance",
                description: "Optimized infrastructure for instant messaging, seamless media sharing, and reliable connectivity.",
                features: ["Low Latency", "Efficient Media Compression", "Global Server Optimization", "Offline Messaging"]
              },
              {
                icon: Users,
                title: "Group & Team Chats",
                description: "Powerful collaboration tools for personal, professional, and enterprise-level messaging.",
                features: ["Large Group Chats", "Admin Controls", "Mentions & Replies", "Read Receipts"]
              },
              {
                icon: Database,
                title: "Smart Data Management",
                description: "Cloud-based and on-device storage solutions to manage messages, media, and backups efficiently.",
                features: ["Automatic Backups", "Local Storage Control", "Multi-Device Sync", "Chat History Export"]
              },
              {
                icon: Terminal,
                title: "Developer API & Bots",
                description: "Custom automation and integration capabilities for businesses, customer support, and workflow automation.",
                features: ["Custom Chatbots", "Business API", "Webhook Support", "AI-powered Responses"]
              },
              {
                icon: Settings,
                title: "Customization & Personalization",
                description: "Tailor your chat experience with themes, notifications, and advanced settings.",
                features: ["Custom Themes", "Notification Controls", "Privacy Settings", "Chat Filters"]
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`bg-gradient-to-r from-green-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, j) => (
                    <li key={j} className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Features