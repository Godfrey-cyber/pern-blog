const CategoriesPage = ({ darkMode }) => {
  const categories = [
    { id: 1, name: 'Development', slug: 'development', posts: 45, color: 'purple' },
    { id: 2, name: 'Design', slug: 'design', posts: 32, color: 'blue' },
    { id: 3, name: 'Backend', slug: 'backend', posts: 28, color: 'green' },
    { id: 4, name: 'DevOps', slug: 'devops', posts: 15, color: 'orange' },
  ];
  const darkMode = false
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Manage Categories
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-xl p-6 hover:shadow-lg transition`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                category.color === 'purple' ? 'from-purple-500 to-purple-600' :
                category.color === 'blue' ? 'from-blue-500 to-blue-600' :
                category.color === 'green' ? 'from-green-500 to-green-600' :
                'from-orange-500 to-orange-600'
              } flex items-center justify-center`}>
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.name}
            </h4>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              /{category.slug}
            </p>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">{category.posts}</span> posts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage