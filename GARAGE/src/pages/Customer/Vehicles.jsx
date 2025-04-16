import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaCarAlt, FaSearch } from 'react-icons/fa';

const Vehicles = () => {
  const { currentUser } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    vin: '',
    color: '',
    mileage: ''
  });
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchVehicles = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockVehicles = [
        { 
          id: 1, 
          make: 'Toyota', 
          model: 'Camry', 
          year: 2018, 
          licensePlate: 'ABC123', 
          vin: '1HGCM82633A123456',
          color: 'Silver',
          mileage: 35000,
          lastService: '2023-09-15' 
        },
        { 
          id: 2, 
          make: 'Honda', 
          model: 'Civic', 
          year: 2020, 
          licensePlate: 'XYZ789', 
          vin: '2HGFC2F52LH123456',
          color: 'Blue',
          mileage: 15000,
          lastService: '2023-10-05' 
        },
        { 
          id: 3, 
          make: 'Ford', 
          model: 'F-150', 
          year: 2019, 
          licensePlate: 'DEF456', 
          vin: '1FTEW1EP7JFA12345',
          color: 'Black',
          mileage: 28000,
          lastService: '2023-08-20' 
        }
      ];
      
      setVehicles(mockVehicles);
      setLoading(false);
    };
    
    fetchVehicles();
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchString = searchTerm.toLowerCase();
    return (
      vehicle.make.toLowerCase().includes(searchString) ||
      vehicle.model.toLowerCase().includes(searchString) ||
      vehicle.year.toString().includes(searchString) ||
      vehicle.licensePlate.toLowerCase().includes(searchString)
    );
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddVehicle = () => {
    setFormData({
      make: '',
      model: '',
      year: '',
      licensePlate: '',
      vin: '',
      color: '',
      mileage: ''
    });
    setShowAddModal(true);
  };
  
  const handleEditVehicle = (vehicle) => {
    setCurrentVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin || '',
      color: vehicle.color || '',
      mileage: vehicle.mileage || ''
    });
    setShowEditModal(true);
  };
  
  const handleDeleteVehicle = (vehicle) => {
    setCurrentVehicle(vehicle);
    setShowDeleteModal(true);
  };
  
  const submitAddVehicle = () => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just update the state
    
    const newVehicle = {
      id: Date.now(),
      ...formData,
      year: parseInt(formData.year),
      mileage: parseInt(formData.mileage),
      lastService: 'Never'
    };
    
    setVehicles([...vehicles, newVehicle]);
    setShowAddModal(false);
  };
  
  const submitEditVehicle = () => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just update the state
    
    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle.id === currentVehicle.id) {
        return {
          ...vehicle,
          ...formData,
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage)
        };
      }
      return vehicle;
    });
    
    setVehicles(updatedVehicles);
    setShowEditModal(false);
  };
  
  const submitDeleteVehicle = () => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just update the state
    
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== currentVehicle.id);
    setVehicles(updatedVehicles);
    setShowDeleteModal(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Vehicles</h1>
            <p className="text-gray-600">Manage your registered vehicles</p>
          </div>
          <button
            onClick={handleAddVehicle}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <FaPlus className="mr-2" />
            Add Vehicle
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        {/* Vehicles List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading vehicles...</p>
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Plate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mileage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVehicles.map(vehicle => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <FaCarAlt className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-gray-500">{vehicle.year} • {vehicle.color}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.licensePlate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.vin || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.mileage?.toLocaleString() || 'N/A'} miles</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.lastService}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditVehicle(vehicle)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaCarAlt className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No vehicles found</h3>
              {searchTerm ? (
                <p className="text-gray-500">No vehicles match your search criteria. Try a different search.</p>
              ) : (
                <p className="text-gray-500 mb-4">You haven't added any vehicles yet.</p>
              )}
              {!searchTerm && (
                <button
                  onClick={handleAddVehicle}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  <FaPlus className="mr-2" />
                  Add Your First Vehicle
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Vehicle</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="make">
                    Make *
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="model">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="year">
                    Year *
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="licensePlate">
                    License Plate *
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="vin">
                  VIN (Vehicle Identification Number)
                </label>
                <input
                  type="text"
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="color">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="mileage">
                    Mileage
                  </label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitAddVehicle}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Add Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Vehicle Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Edit Vehicle</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-make">
                    Make *
                  </label>
                  <input
                    type="text"
                    id="edit-make"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-model">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="edit-model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-year">
                    Year *
                  </label>
                  <input
                    type="number"
                    id="edit-year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-licensePlate">
                    License Plate *
                  </label>
                  <input
                    type="text"
                    id="edit-licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-vin">
                  VIN (Vehicle Identification Number)
                </label>
                <input
                  type="text"
                  id="edit-vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-color">
                    Color
                  </label>
                  <input
                    type="text"
                    id="edit-color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-mileage">
                    Mileage
                  </label>
                  <input
                    type="number"
                    id="edit-mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitEditVehicle}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete the {currentVehicle.make} {currentVehicle.model} ({currentVehicle.year})? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitDeleteVehicle}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles; 