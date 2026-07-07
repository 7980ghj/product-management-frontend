import { FaMapMarkerAlt, FaPhone, FaIndustry, FaUsers, FaStar, FaLeaf } from 'react-icons/fa'
import ImageSlider from '../components/ImageSlider'
const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Dayaram Revekar',
      experience: '54 Years',
      post: 'Head',
      contact: '798********',
      address: 'Dhamangaon Badhe, Tal-Motala, Dis-Buldhana',
      image: '/dayaram.jpg',
    },
    {
      name: 'Kishor Revekar',
      experience: '31 Years',
      post: 'Co-Head',
      contact: '9090********',
      address: 'Dhamangaon Badhe, Tal-Motala, Dis-Buldhana',
      image: '/kishor4.jpg',
    },
    {
      name: 'Dipak Revekar',
      experience: '29 Years',
      post: 'Factory Manager',
      contact: '779********',
      address: 'Dhamangaon Badhe, Tal-Motala, Dis-Buldhana',
      image: '/dipak.jpg',
    },
    {
      name: 'Eshvar Revekar',
      experience: '26 Years',
      post: 'HR',
      contact: '798********',
      address: 'Dhamangaon Badhe, Tal-Motala, Dis-Buldhana',
      image: '/eshvar.jpg',
    },
  ]

  const materials = ['POP', 'Eco-Friendly', 'Shadu Mati', 'Marble']

  const categories = [
    'Ganesh Murti',
    'Durga Murti',
    'Lakshmi Mata Murti',
    'Shiv Murti',
    'Krishna Murti',
    'Saraswati Murti',
    'Hanuman Murti',
    'Ram Darbar',
    'Sai Baba Murti',
    'Radha Krishna',
    'Buddha Murti',
    'Vishnu Murti',
  ]

  return (
  
    <div>
      {/* Auto-Sliding Factory Images */}
      <ImageSlider />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 p-8 lg:p-10 mb-8 shadow-xl shadow-purple-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">🪔 Eshvar Murti Kala Kendra</h1>
          <p className="text-purple-100/80 text-lg max-w-2xl">
            Crafting divine idols with devotion and tradition for over 5 decades. We specialize in creating beautiful murtis for homes, temples, and festivals.
          </p>
        </div>
      </div>

      {/* Factory Information */}
      <div className="glass-card rounded-2xl p-6 lg:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <FaIndustry className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Factory Information</h2>
            <p className="text-sm text-purple-500">Est. since generations</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl p-5 mb-6 border border-purple-100/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
              <FaMapMarkerAlt className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Factory Address</h3>
              <p className="text-gray-600 leading-relaxed">
                Pimpalgaon Devi Road, Dhamangaon Badhe<br />
                Taluka - Motala<br />
                District - Buldhana<br />
                Maharashtra, India
              </p>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaLeaf className="text-green-500" /> Materials We Work With
          </h3>
          <div className="flex flex-wrap gap-3">
            {materials.map((material, index) => (
              <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-5 py-2.5 rounded-xl text-sm font-semibold border border-purple-200/50 shadow-sm hover:shadow-md transition-all">
                {material}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaStar className="text-amber-500" /> Idol Categories We Offer
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category, index) => (
              <div key={index} className="bg-white/60 border border-purple-100/50 rounded-xl p-3 text-center hover:bg-purple-50/50 hover:border-purple-300/50 transition-all cursor-default">
                <p className="text-sm font-medium text-gray-700">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="glass-card rounded-2xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <FaUsers className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Our Team</h2>
            <p className="text-sm text-purple-500">The artisans behind every murti</p>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white/60 rounded-2xl border border-purple-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              {/* Photo */}
              <div className="h-56 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                {/* Name */}
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>

                {/* Post Badge */}
                <span className="inline-block mt-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                  {member.post}
                </span>

                {/* Details */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaStar className="text-purple-500 text-xs" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">Experience</p>
                      <p className="text-sm font-semibold text-gray-700">{member.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-pink-500 text-xs" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">Contact</p>
                      <p className="text-sm font-semibold text-gray-700">{member.contact}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-500 text-xs" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">Address</p>
                      <p className="text-xs text-gray-600">{member.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 p-6 glass-card rounded-2xl">
        <p className="text-2xl mb-2">🙏</p>
        <p className="text-gray-700 font-medium">
          "Every idol we create carries the blessing of devotion and the art of tradition"
        </p>
        <p className="text-purple-500 text-sm mt-2 font-medium">— Eshvar Murti Kala Kendra Family</p>
      </div>
    </div>
  )
}

export default AboutUs