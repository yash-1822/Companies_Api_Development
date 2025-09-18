import React from 'react';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Building, 
  UserCheck, 
  Edit, 
  Trash2, 
  Mail,
  Briefcase
} from 'lucide-react';

const Card = ({ company, onEdit, onDelete }) => {
  const {
    name,
    address,
    industry,
    email,
    employeeCount,
    foundedYear,
    description,
    location,
    totalBranches,
    totalClients,
    imageUrl
  } = company;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Company Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={imageUrl || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div
          className="
            absolute top-2 right-2 flex space-x-1
            opacity-100 lg:opacity-0 lg:group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <button
            onClick={() => onEdit(company)}
            className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            title="Edit Company"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(company)}
            className="p-2 bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            title="Delete Company"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className='flex justify-between'>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Briefcase className="w-4 h-4 mr-1" />
              <span className="font-medium">{industry}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-1 leading-relaxed">
          {description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <div>
              <span className="text-gray-500 text-xs">Employees</span>
              <p className="font-semibold text-gray-900 text-sm">{employeeCount?.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-green-500" />
            <div>
              <span className="text-gray-500 text-xs">Founded</span>
              <p className="font-semibold text-gray-900 text-sm">{foundedYear}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Building className="w-4 h-4 text-purple-500" />
            <div>
              <span className="text-gray-500 text-xs">Branches</span>
              <p className="font-semibold text-gray-900 text-sm">{totalBranches}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <UserCheck className="w-4 h-4 text-orange-500" />
            <div>
              <span className="text-gray-500 text-xs">Clients</span>
              <p className="font-semibold text-gray-900 text-sm">{totalClients}</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-100 pt-3 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors truncate">
              {email}
            </a>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1 text-xs">{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
