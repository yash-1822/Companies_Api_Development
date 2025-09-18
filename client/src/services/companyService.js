// Mock API service - replace with actual backend endpoints
const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API

// Mock data for development
const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    address: "123 Tech Street, Silicon Valley, CA",
    industry: "Technology",
    email: "contact@techcorp.gmail.com",
    employeeCount: 250,
    foundedYear: 2015,
    description: "Leading technology solutions provider specializing in enterprise software and cloud infrastructure.",
    location: "Silicon Valley",
    totalBranches: 5,
    totalClients: 150,
    imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    name: "Green Energy Inc",
    address: "456 Renewable Ave, Austin, TX",
    industry: "Energy",
    email: "info@greenenergy.gmail.com",
    employeeCount: 180,
    foundedYear: 2012,
    description: "Innovative renewable energy solutions for sustainable future. Solar and wind power specialists.",
    location: "Austin",
    totalBranches: 8,
    totalClients: 200,
    imageUrl: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    name: "HealthTech Innovations",
    address: "789 Medical Plaza, Boston, MA",
    industry: "Healthcare",
    email: "contact@healthtech.gmail.com",
    employeeCount: 120,
    foundedYear: 2018,
    description: "Revolutionary healthcare technology solutions improving patient care and medical efficiency.",
    location: "Boston",
    totalBranches: 3,
    totalClients: 85,
    imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    name: "FinanceFlow Systems",
    address: "321 Wall Street, New York, NY",
    industry: "Finance",
    email: "hello@financeflow.gmail.com",
    employeeCount: 320,
    foundedYear: 2010,
    description: "Advanced financial management systems and investment solutions for modern businesses.",
    location: "New York",
    totalBranches: 12,
    totalClients: 300,
    imageUrl: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

// Mock options for filters
export const industryOptions = ["Technology", "Energy", "Healthcare", "Finance", "Manufacturing", "Retail", "Education"];
export const locationOptions = ["Silicon Valley", "Austin", "Boston", "New York", "Seattle", "Chicago", "Miami"];

class CompanyService {
  async getCompanies(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCompanies = [...mockCompanies];
    
    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCompanies = filteredCompanies.filter(company =>
        company.name.toLowerCase().includes(searchLower) ||
        company.description.toLowerCase().includes(searchLower) ||
        company.address.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.industry) {
      filteredCompanies = filteredCompanies.filter(company => 
        company.industry === filters.industry
      );
    }
    
    if (filters.location) {
      filteredCompanies = filteredCompanies.filter(company => 
        company.location === filters.location
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      filteredCompanies.sort((a, b) => {
        let aVal = a[filters.sortBy];
        let bVal = b[filters.sortBy];
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (filters.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    
    return {
      data: filteredCompanies,
      total: filteredCompanies.length
    };
  }

  async createCompany(companyData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newCompany = {
      id: Math.max(...mockCompanies.map(c => c.id)) + 1,
      ...companyData
    };
    
    mockCompanies.push(newCompany);
    return { data: newCompany, success: true };
  }

  async updateCompany(id, companyData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCompanies[index] = { ...mockCompanies[index], ...companyData };
      return { data: mockCompanies[index], success: true };
    }
    throw new Error('Company not found');
  }

  async deleteCompany(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCompanies.splice(index, 1);
      return { success: true };
    }
    throw new Error('Company not found');
  }
}

export default new CompanyService();