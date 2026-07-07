const Loader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 border-4 border-purple-200 rounded-full"></div>
          <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center">
          <p className="text-gray-700 font-medium">Loading</p>
          <p className="text-purple-400 text-xs mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader