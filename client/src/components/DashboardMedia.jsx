const MediaLibraryPage = ({ darkMode }) => {
  const mediaItems = [
    { id: 1, name: 'hero-image.jpg', size: '2.4 MB', date: 'Oct 20, 2024', type: 'image' },
    { id: 2, name: 'blog-cover.png', size: '1.8 MB', date: 'Oct 18, 2024', type: 'image' },
    { id: 3, name: 'tutorial-video.mp4', size: '15.2 MB', date: 'Oct 15, 2024', type: 'video' },
    { id: 4, name: 'infographic.svg', size: '456 KB', date: 'Oct 12, 2024', type: 'image' },
  ];
  const darkMode = false

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <button className={`px-4 py-2 rounded-lg ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            All Media
          </button>
          <button className={`px-4 py-2 rounded-lg ${
            darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'
          } transition`}>
            Images
          </button>
          <button className={`px-4 py-2 rounded-lg ${
            darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'
          } transition`}>
            Videos
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition">
          <Upload className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div key={item.id} className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-xl overflow-hidden hover:shadow-lg transition`}>
            <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              {item.type === 'image' ? (
                <Image className="w-16 h-16 text-white opacity-50" />
              ) : (
                <FileText className="w-16 h-16 text-white opacity-50" />
              )}
            </div>
            <div className="p-4">
              <p className={`font-medium mb-1 truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.size}</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.date}</span>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                  View
                </button>
                <button className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibraryPage