import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import Card from "../components/Card";
import CompanyLoading from "../components/Company/CompanyLoading";
import CompanyErrorState from "../components/Company/CompanyErrorState";
import CompanyEmptyState from "../components/Company/CompanyEmptyState";
import CompanyModal from "../components/Modal/CompanyModal";
import DeleteModal from "../components/Modal/DeleteModal";
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../helpers/productApis";
import { toast } from "react-toastify";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  // Window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch companies with filters, search, and pagination
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getCompanies({
        page,
        limit: 9,
        search: searchTerm,
        industry: filters.industry,
        location: filters.location,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      setCompanies(response.data);
      setTotalPages(response.totalPages || 1);

      if (searchTerm || filters.industry || filters.location) {
        toast.success(`Found ${response.data.length} companies`, { autoClose: 3000 });
      }
    } catch (err) {
      setError('Failed to load companies. Please try again.');
      toast.error('Failed to load companies');
      setCompanies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, filters]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch companies when filters/search/page changes
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Handle modal actions
  const handleAddCompany = () => {
    setModalMode('add');
    setSelectedCompany(null);
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
    setModalMode('edit');
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleDeleteCompany = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleModalSubmit = async (companyData) => {
    setModalLoading(true);
    try {
      if (modalMode === 'add') {
        await createCompany(companyData);
      } else {
        await updateCompany(selectedCompany._id, companyData);
      }
      setShowModal(false);
      fetchCompanies();
    } catch (err) {} 
    finally {
      setModalLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setModalLoading(true);
    try {
      await deleteCompany(selectedCompany._id);
      setShowDeleteModal(false);
      fetchCompanies();
    } catch (err) {} 
    finally {
      setModalLoading(false);
    }
  };

  // Filter/search handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setPage(1);
  };

  // Pagination handlers
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const renderPagination = () => (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        disabled={page <= 1}
        onClick={handlePrevPage}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-4 py-2 rounded ${
            page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page >= totalPages}
        onClick={handleNextPage}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        searchTerm={searchInput}
        onSearchChange={handleSearchChange}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onAddCompany={handleAddCompany}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onAddCompany={handleAddCompany}
          isMobile={isMobile}
          isTablet={isTablet}
        />

        {/* Main */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Companies {companies.length > 0 && `(${companies.length})`}
            </h2>

            {loading && <CompanyLoading />}
            {error && !loading && <CompanyErrorState error={error} onRetry={fetchCompanies} />}
            {!loading && !error && companies.length === 0 && (
              <CompanyEmptyState
                searchTerm={searchTerm}
                filters={filters}
                onAddCompany={handleAddCompany}
              />
            )}
            {!loading && companies.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies.map((company) => (
                    <Card
                      key={company._id}
                      company={company}
                      onEdit={handleEditCompany}
                      onDelete={handleDeleteCompany}
                    />
                  ))}
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CompanyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        company={selectedCompany}
        mode={modalMode}
        loading={modalLoading}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        company={selectedCompany}
        loading={modalLoading}
      />
    </div>
  );
};

export default CompanyPage;
