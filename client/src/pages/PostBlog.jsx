import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, X, Plus, Minus, DollarSign, Compass, Search } from 'lucide-react';

export default function TourBookingForm() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
    childrenAges: []
  });

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    tourType: ''
  });

  // Tour types - you can modify these based on your app
  const tourTypes = [
    { value: '', label: 'All Types' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'beach', label: 'Beach & Relaxation' },
    { value: 'city', label: 'City Tours' },
    { value: 'wildlife', label: 'Wildlife & Nature' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'budget', label: 'Budget Friendly' },
    { value: 'family', label: 'Family' }
  ];

  // Fetch destinations from backend
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/destinations/all-destinations');
      const data = await response.json();
      
      // Assuming your API returns array of destinations
      // Format: [{ _id, name, country }] or similar
      setDestinations(data);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      // Fallback to hardcoded destinations
      setDestinations([
        { _id: '1', name: 'Paris, France' },
        { _id: '2', name: 'Tokyo, Japan' },
        { _id: '3', name: 'New York, USA' },
        { _id: '4', name: 'Dubai, UAE' },
        { _id: '5', name: 'London, UK' },
        { _id: '6', name: 'Barcelona, Spain' },
        { _id: '7', name: 'Rome, Italy' },
        { _id: '8', name: 'Bali, Indonesia' },
        { _id: '9', name: 'Sydney, Australia' },
        { _id: '10', name: 'Maldives' }
      ]);
    }
  };

  const filteredDestinations = destinations.filter(dest =>
    dest.name?.toLowerCase().includes(destination.toLowerCase())
  );

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const newValue = operation === 'increase' 
        ? prev[type] + 1 
        : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1);
      
      const updated = { ...prev, [type]: newValue };
      
      if (type === 'children') {
        if (operation === 'increase') {
          updated.childrenAges = [...prev.childrenAges, ''];
        } else if (newValue < prev.children) {
          updated.childrenAges = prev.childrenAges.slice(0, -1);
        }
      }
      
      return updated;
    });
  };

  const handleChildAgeChange = (index, age) => {
    setGuests(prev => ({
      ...prev,
      childrenAges: prev.childrenAges.map((a, i) => i === index ? age : a)
    }));
  };

  const getGuestSummary = () => {
    const parts = [];
    if (guests.adults > 0) parts.push(`${guests.adults} Adult${guests.adults > 1 ? 's' : ''}`);
    if (guests.children > 0) parts.push(`${guests.children} Child${guests.children > 1 ? 'ren' : ''}`);
    parts.push(`${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const validateForm = () => {
    if (!destination) {
      setError('Please select a destination');
      return false;
    }
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return false;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date');
      return false;
    }
    if (guests.children > 0 && guests.childrenAges.some(age => age === '')) {
      setError('Please specify ages for all children');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Prepare the search data
    const searchData = {
      destination,
      checkIn,
      checkOut,
      guests: {
        adults: guests.adults,
        children: guests.children,
        rooms: guests.rooms,
        childrenAges: guests.childrenAges
      },
      filters: {
        minPrice: filters.priceRange.min,
        maxPrice: filters.priceRange.max,
        tourType: filters.tourType
      }
    };

    console.log(searchData)

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/tours/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(searchData)
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      console.log('Search results:', data);
      
      // Handle the response - you might want to navigate to results page
      // or update state to show results
      alert(`Search successful! Found ${data.tours?.length || 0} tours. Check console for details.`);
      
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search tours. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Find Your Perfect Getaway</h1>
          <p className="text-gray-600">Discover amazing destinations around the world</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Main Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Destination Input */}
            <div className="relative lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowDestinations(true);
                  }}
                  onFocus={() => setShowDestinations(true)}
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {showDestinations && destination && filteredDestinations.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredDestinations.map((dest) => (
                      <div
                        key={dest._id}
                        onClick={() => {
                          setDestination(dest.name);
                          setShowDestinations(false);
                        }}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{dest.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Guests Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guests & Rooms
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={getGuestSummary()}
                readOnly
                onClick={() => setShowGuestModal(true)}
                placeholder="Add guests and rooms"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer transition"
              />
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Filters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Price Range (per person)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                      }))}
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                      }))}
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="text-sm text-gray-600 text-center">
                    ${filters.priceRange.min} - ${filters.priceRange.max}
                  </div>
                </div>
              </div>

              {/* Tour Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tour Type
                </label>
                <select
                  value={filters.tourType}
                  onChange={(e) => setFilters(prev => ({ ...prev, tourType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {tourTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                {/* Quick Tour Type Buttons */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {tourTypes.slice(1, 5).map(type => (
                    <button
                      key={type.value}
                      onClick={() => setFilters(prev => ({ ...prev, tourType: type.value }))}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        filters.tourType === type.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search Tours
              </>
            )}
          </button>
        </div>

        {/* Guest Modal */}
        {showGuestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h3 className="text-xl font-bold text-gray-800">Guests & Rooms</h3>
                <button
                  onClick={() => setShowGuestModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Adults</p>
                    <p className="text-sm text-gray-500">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGuestChange('adults', 'decrease')}
                      disabled={guests.adults <= 1}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-lg">{guests.adults}</span>
                    <button
                      onClick={() => handleGuestChange('adults', 'increase')}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Children</p>
                    <p className="text-sm text-gray-500">Ages 0-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGuestChange('children', 'decrease')}
                      disabled={guests.children <= 0}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-lg">{guests.children}</span>
                    <button
                      onClick={() => handleGuestChange('children', 'increase')}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children Ages */}
                {guests.children > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                    <p className="font-medium text-gray-800 text-sm">Children's Ages</p>
                    <div className="grid grid-cols-2 gap-3">
                      {guests.childrenAges.map((age, idx) => (
                        <div key={idx}>
                          <label className="block text-xs text-gray-600 mb-1">
                            Child {idx + 1}
                          </label>
                          <select
                            value={age}
                            onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          >
                            <option value="">Select age</option>
                            {[...Array(13)].map((_, i) => (
                              <option key={i} value={i}>
                                {i} {i === 1 ? 'year' : 'years'}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Rooms</p>
                    <p className="text-sm text-gray-500">Number of rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGuestChange('rooms', 'decrease')}
                      disabled={guests.rooms <= 1}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-lg">{guests.rooms}</span>
                    <button
                      onClick={() => handleGuestChange('rooms', 'increase')}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl">
                <button
                  onClick={() => setShowGuestModal(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}