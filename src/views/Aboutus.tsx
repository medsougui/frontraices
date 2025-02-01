import { useState, useEffect } from 'react'
import '../css/Aboutus.css';
const EnhancedAbout = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
      
      const sections = ['about', 'version', 'rules']
      const currentSection = sections[Math.floor(position / window.innerHeight)]
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const versions = [
    {
      version: "🌱",
      date: "",
      features: ["We offer high-quality fruits and vegetables that are sustainably grown and carefully selected, ensuring freshness and superior taste ."],
      highlight: " Sustainable Quality "
    },
    {
      version: "🍎",
      date: "",
      features: ["Our commitment to freshness guarantees that every product delivers rich, natural flavors, enhancing a healthy and nutritious lifestyle."],
      highlight: "Freshness & Flavor"
    },
    {
      version: "🌍",
      date: "",
      features: ["Through eco-friendly practices and mindful sourcing, we promote a responsible way of consuming food, supporting both personal well-being and environmental sustainability."],
      highlight: "Conscious Living"
    }
  ]

  const rules = [
    {
      title: "Commitment to Sustainability",
      points: ["We prioritize eco-friendly practices, ensuring responsible sourcing and minimal environmental impact to protect our planet."]
    },
    {
      title: "Quality & Well-being",
      points: ["Our carefully selected organic products guarantee freshness, superior taste, and essential nutrition for a healthier lifestyle."]
    },
    {
      title: "Social Responsibility",
      points: ["We support local producers, ethical consumption, and initiatives that create a positive impact on communities and all living beings."]
    }
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden w-full bg-[#e6ddd1]">
      {/* Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/4 z-50 space-y-4">
        {['about', 'version', 'rules'].map((section) => (
          <div
            key={section}
            onClick={() => document.getElementById(section)!.scrollIntoView({ behavior: 'smooth' })}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              activeSection === section ? 'bg-[#8B4513] scale-125' : 'bg-[#D2691E] hover:bg-[#8B4513]'
            }`}
          />
        ))}
      </div>

      {/* About Section */}
      <section
        id="about"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 100%)'
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("/api/placeholder/1920/1080")',
            backgroundSize: 'cover',
            transform: `translateY(${scrollPosition * 0.5}px)`
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-8 text-[#8B4513]">
           Our Vision & About Us
          </h1>
          <p className="text-xl leading-relaxed mb-8 text-[#5C3317]">

At Raíces Naturales, we are committed to being the leading brand in healthy and sustainable food, providing fresh, natural products while protecting the planet. Through eco-friendly practices, we minimize impact, reduce waste, and promote conscious consumption.

Founded in 2021, Raíces Naturales is Tunisia’s first premium store dedicated to selling organic and high-quality fruits and vegetables. We specialize in offering the freshest produce, ensuring both quality and sustainability in every bite. Welcome to a healthier way of living!
          </p>
        </div>
      </section>

      {/* Version History Section */}
      <section
  id="version"
  className="relative h-full flex items-center bg-[#e6ddd1]"
>
  <div className="max-w-6xl mx-auto px-6 py-12">
    <h2 className="text-4xl font-bold text-[#8B4513] mt-8 mb-12 text-center">
      Our Mission
    </h2>
    <div className="space-y-8">
      {versions.map((item, index) => (
        <div
          key={item.version}
          className={`relative flex items-center ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
          style={{
            opacity: Math.min(
              1,
              (scrollPosition - window.innerHeight * 0.5) * 0.004
            ),
            transform: `translateX(${
              index % 2 === 0
                ? Math.min(0, -100 + (scrollPosition - window.innerHeight * 0.8) * 0.75)
                : Math.max(0, 100 - (scrollPosition - window.innerHeight * 0.8) * 0.75)
            }px)`,
          }}
        >
          <div className="flex-shrink-0 w-32 text-right">
            <span className="text-3xl font-bold text-[#CD853F]">{item.version}</span>
            <div className="text-[#8B4513] text-sm">{item.date}</div>
          </div>
          <div className="flex-grow ml-8 p-6 bg-[#DEB887] rounded-lg shadow-lg">
            <div className="text-[#8B4513] text-lg font-semibold mb-2">
              {item.highlight}
            </div>
            <ul className="text-[#5C3317] space-y-2">
              {item.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Rules Section */}
      <section
        id="rules"
        className="relative h-screen flex items-center"
        style={{
          background: 'linear-gradient(135deg, #DEB887 0%, #D2B48C 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-12 text-center">Platform Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rules.map((rule) => (
              <div
                key={rule.title}
                className="bg-[#F5DEB3] bg-opacity-90 rounded-lg p-6 shadow-lg"
                style={{
                  transform: `translateY(${Math.min(0, 100 - (scrollPosition - window.innerHeight * 1.8) * 0.2)}px)`,
                  opacity: Math.min(1, (scrollPosition - window.innerHeight * 1.5) * 0.002)
                }}
              >
                <h3 className="text-xl font-semibold text-[#8B4513] mb-4">{rule.title}</h3>
                <ul className="space-y-3">
                  {rule.points.map((point, idx) => (
                    <li key={idx} className="text-[#5C3317] flex items-center">
                      <span className="w-2 h-2 bg-[#CD853F] rounded-full mr-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EnhancedAbout
