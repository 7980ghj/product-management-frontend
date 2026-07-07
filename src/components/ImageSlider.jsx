import { useState, useEffect } from 'react'

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: '/factory1.jpg', caption: ' Our Factory - Dhamangaon Badhe' },
    { src: '/factory2.jpg', caption: ' Artists Painting Murtis' },
    { src: '/factory3.jpg', caption: ' Idol Making Process' },
    { src: '/factory4.jpeg', caption: ' Finished Divine Collection' },
    { src: '/factory5.avif', caption: ' Pimpalgaon Devi Road, Motala' },
  ]

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl mb-8 shadow-xl shadow-purple-500/20">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full relative">
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-72 lg:h-96 object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent"></div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white text-lg font-semibold drop-shadow-lg">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-6 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-7'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
        <p className="text-white text-xs font-medium">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

export default ImageSlider