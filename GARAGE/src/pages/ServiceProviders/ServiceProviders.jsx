import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaTools, FaFilter } from 'react-icons/fa';

const ServiceProviders = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    speciality: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Available filter options
  const states = ['All States', 'California', 'New York', 'Texas', 'Florida', 'Illinois' ,"Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];
  const cities = ['All Cities', 'Los Angeles', 'New York City', 'Houston', 'Miami', 'Chicago'];
  const specialities = ['All Specialities', 'Oil Change', 'Brake Repair', 'Engine Repair', 'Transmission', 'Electrical'];
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchServiceProviders = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockServiceProviders = [
        {
          id: 1,
          name: 'Quick Fix Garage',
          rating: 4.8,
          reviewCount: 124,
          address: '123 Main St, Los Angeles, CA 90001',
          state: 'California',
          city: 'Los Angeles',
          specialities: ['Oil Change', 'Brake Repair', 'Tire Service'],
          description: 'Full-service auto repair shop with certified mechanics.',
          image: 'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SaeSMP9n988DOya9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzEzNzg5MmQwYWVkN2Q2ZTIyYzY3MTgzN2NlZmEwNGNhBGdwb3MDMjkEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dgarage%2Bimage%26type%3DE210IN885G0%26fr%3Dmcafee%26h%3D800%26tt%3D28%252B%2BThree%2BCar%2BGarage%2BImages%2B-%2BHome%2BInspiration%26w%3D1200%26imgurl%3Dhttps%253A%252F%252Fassets.architecturaldesigns.com%252Fplan_assets%252F325001874%252Foriginal%252F68586VR_Render_1551968383.jpg%253F1551968383%26rurl%3Dhttps%253A%252F%252Fwoomore.blogspot.com%252F2019%252F11%252F28-three-car-garage-images.html%26turl%3Dhttps%253A%252F%252Ftse1.mm.bing.net%252Fth%253Fid%253DOIP.hRI5_f0qWlIg4ETAUnLPDAHaE8%2526pid%253DApi%26tw%3D474%26th%3D316%26sigr%3DPqcz64Sb6H_v%26sigi%3Dw.CVzB.ttn9X%26sigt%3DwqLPNKxZohIy%26sigit%3Dwm3KN1rsDtzZ%26tab%3Dorganic%26ri%3D29&w=2450&h=1633&imgurl=perfomax.ca%2Fwp-content%2Fuploads%2Fgarage-mecanique-generale-concessionnaire-min.jpg&rurl=https%3A%2F%2Fperfomax.ca%2Fgarage-mecanique-generale-ou-concessionnaire-lequel-choisir%2F&size=557KB&p=garage+image&oid=137892d0aed7d6e22c671837cefa04ca&fr2=&fr=mcafee&tt=Garage+de+m%C3%A9canique+g%C3%A9n%C3%A9ral+ou+le+concessionnaire%3F+%7C+Perfomax&b=0&ni=160&no=29&ts=&tab=organic&sigr=VefE7Ryhhak3&sigb=H_BU45mGIUp1&sigi=c_ke3DxwjJad&sigt=c2tZOvedwUTb&.crumb=.zFbbPLVTyn&fr=mcafee&type=E210IN885G0'
        },
        {
          id: 2,
          name: 'Smith Auto Repair',
          rating: 4.5,
          reviewCount: 89,
          address: '456 Oak Ave, New York City, NY 10001',
          state: 'New York',
          city: 'New York City',
          specialities: ['Engine Repair', 'Transmission', 'Diagnostics'],
          description: 'Specializing in engine and transmission repairs for all makes and models.',
          image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 3,
          name: 'Elite Auto Care',
          rating: 4.9,
          reviewCount: 156,
          address: '789 Pine Blvd, Houston, TX 77001',
          state: 'Texas',
          city: 'Houston',
          specialities: ['Oil Change', 'AC Repair', 'Electrical'],
          description: 'Premium auto care with state-of-the-art diagnostic equipment.',
          image: 'https://images.unsplash.com/photo-1632823471565-1ecdf5cc2f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 4,
          name: 'Precision Auto Works',
          rating: 4.7,
          reviewCount: 112,
          address: '321 Maple Dr, Miami, FL 33101',
          state: 'Florida',
          city: 'Miami',
          specialities: ['Brake Repair', 'Suspension', 'Alignment'],
          description: 'Precision repairs and maintenance for domestic and foreign vehicles.',
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 5,
          name: 'City Garage',
          rating: 4.6,
          reviewCount: 78,
          address: '654 Elm St, Chicago, IL 60601',
          state: 'Illinois',
          city: 'Chicago',
          specialities: ['Oil Change', 'Tire Service', 'Battery Service'],
          description: 'Convenient downtown location with quick service options.',
          image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
        },{
          id: 1,
          name: 'Mumbai Auto Hub',
          rating: 4.5,
          reviewCount: 120,
          address: '12 Link Rd, Andheri West, Mumbai, MH 400053',
          state: 'Maharashtra',
          city: 'Mumbai',
          specialities: ['Engine Repair', 'Oil Change', 'AC Service'],
          description: 'Trusted garage with experienced technicians in the heart of Mumbai.',
          image: 'https://images.unsplash.com/photo-1597006882461-24b256c3c52c?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 2,
          name: 'Delhi Car Care',
          rating: 4.2,
          reviewCount: 85,
          address: 'C-5, Janakpuri, New Delhi, DL 110058',
          state: 'Delhi',
          city: 'New Delhi',
          specialities: ['Wheel Alignment', 'Battery Replacement', 'Denting & Painting'],
          description: 'Affordable car service center with fast turnaround.',
          image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 3,
          name: 'Chennai Auto Works',
          rating: 4.8,
          reviewCount: 140,
          address: '45 Mount Rd, Teynampet, Chennai, TN 600018',
          state: 'Tamil Nadu',
          city: 'Chennai',
          specialities: ['Clutch Repair', 'AC Repair', 'Brake Service'],
          description: 'Premium garage with modern equipment and expert staff.',
          image: 'https://images.unsplash.com/photo-1617301600500-c24b7f4cba80?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 4,
          name: 'Ahmedabad Garage Point',
          rating: 4.4,
          reviewCount: 95,
          address: 'SG Highway, Thaltej, Ahmedabad, GJ 380059',
          state: 'Gujarat',
          city: 'Ahmedabad',
          specialities: ['Suspension', 'Oil Change', 'Tyre Replacement'],
          description: 'Reliable garage offering full car maintenance services.',
          image: 'https://images.unsplash.com/photo-1608495242680-bd6cde71c417?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 5,
          name: 'Bangalore Auto Zone',
          rating: 4.6,
          reviewCount: 112,
          address: 'HSR Layout, Sector 7, Bangalore, KA 560102',
          state: 'Karnataka',
          city: 'Bangalore',
          specialities: ['Battery Service', 'Engine Tuning', 'Washing & Detailing'],
          description: 'Professional-grade service with customer-friendly staff.',
          image: 'https://images.unsplash.com/photo-1582102372649-02c6bd4f28c9?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 6,
          name: 'Jaipur Vehicle Fixers',
          rating: 4.3,
          reviewCount: 70,
          address: 'Malviya Nagar, Jaipur, RJ 302017',
          state: 'Rajasthan',
          city: 'Jaipur',
          specialities: ['Full Car Service', 'Oil Change', 'Brake Repair'],
          description: 'One-stop solution for all vehicle maintenance needs.',
          image: 'https://images.unsplash.com/photo-1608666635797-373aa8e92f39?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 7,
          name: 'Hyderabad Car Spa',
          rating: 4.7,
          reviewCount: 88,
          address: 'Gachibowli, Hyderabad, TG 500032',
          state: 'Telangana',
          city: 'Hyderabad',
          specialities: ['Washing', 'Interior Cleaning', 'Polishing'],
          description: 'Specializes in detailed car cleaning and restoration.',
          image: 'https://images.unsplash.com/photo-1597764691330-5308e18c9b45?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 8,
          name: 'Kolkata Motor Garage',
          rating: 4.1,
          reviewCount: 63,
          address: 'Salt Lake Sector 5, Kolkata, WB 700091',
          state: 'West Bengal',
          city: 'Kolkata',
          specialities: ['AC Gas Filling', 'Engine Service', 'Tyre Rotation'],
          description: 'Decades-old garage known for genuine parts and service.',
          image: 'https://images.unsplash.com/photo-1589363461939-25e8f06b7814?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 9,
          name: 'Lucknow Auto Clinic',
          rating: 4.0,
          reviewCount: 55,
          address: 'Aliganj, Lucknow, UP 226024',
          state: 'Uttar Pradesh',
          city: 'Lucknow',
          specialities: ['Coolant Check', 'Electrical Diagnostics', 'Wheel Balancing'],
          description: 'Neighborhood-friendly garage with quick service delivery.',
          image: 'https://images.unsplash.com/photo-1597765026632-dfdfb17d58ab?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 10,
          name: 'Bhopal Car Tech',
          rating: 4.3,
          reviewCount: 77,
          address: 'MP Nagar, Bhopal, MP 462011',
          state: 'Madhya Pradesh',
          city: 'Bhopal',
          specialities: ['Full Checkup', 'Battery Check', 'Oil Change'],
          description: 'Budget-friendly garage with all-round service packages.',
          image: 'https://images.unsplash.com/photo-1615187547320-9c212c3653ae?auto=format&fit=crop&w=300&q=80'
        }
      
        
      ];
      
      setServiceProviders(mockServiceProviders);
      setLoading(false);
    };
    
    fetchServiceProviders();
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      state: '',
      city: '',
      speciality: ''
    });
  };
  
  const filteredProviders = serviceProviders.filter(provider => {
    // Search term filter
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // State filter
    const matchesState = !filters.state || filters.state === 'All States' || provider.state === filters.state;
    
    // City filter
    const matchesCity = !filters.city || filters.city === 'All Cities' || provider.city === filters.city;
    
    // Speciality filter
    const matchesSpeciality = !filters.speciality || 
                             filters.speciality === 'All Specialities' || 
                             provider.specialities.includes(filters.speciality);
    
    return matchesSearch && matchesState && matchesCity && matchesSpeciality;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Service Providers</h1>
          <p className="text-gray-600">Find the best automotive service providers in your area</p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {/* Search Bar */}
            <div className="flex-grow mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, service, or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* State Filter */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="state">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All States</option>
                    {states.slice(1).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                {/* City Filter */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Cities</option>
                    {cities.slice(1).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                {/* Speciality Filter */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="speciality">
                    Speciality
                  </label>
                  <select
                    id="speciality"
                    name="speciality"
                    value={filters.speciality}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Specialities</option>
                    {specialities.slice(1).map(speciality => (
                      <option key={speciality} value={speciality}>{speciality}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Service Providers List */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">Loading service providers...</p>
            </div>
          ) : filteredProviders.length > 0 ? (
            filteredProviders.map(provider => (
              <div key={provider.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 bg-gray-200">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h2>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"} 
                                size={16}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm">
                            {provider.rating} ({provider.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-start mb-3">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 mr-1 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{provider.address}</span>
                        </div>
                      </div>
                      <Link
                        to={`/service-providers/${provider.id}`}
                        className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                      >
                        View Details
                      </Link>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{provider.description}</p>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Specialities:</h3>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialities.map(speciality => (
                          <span 
                            key={speciality} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <FaTools className="mr-1 text-gray-500" size={12} />
                            {speciality}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaTools className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No service providers found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filters.state || filters.city || filters.speciality
                  ? "No service providers match your search criteria. Try adjusting your filters."
                  : "There are no service providers available at this time."}
              </p>
              {(searchTerm || filters.state || filters.city || filters.speciality) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders; 