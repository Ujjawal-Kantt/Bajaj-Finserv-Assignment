import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";
import ActiveFilters from "./components/ActiveFilters";
import LandingPage from "./components/LandingPage";
import { FilterState } from "./types/doctor";
import useDoctorData from "./hooks/useDoctorData";
import { syncFiltersToUrl, getFiltersFromUrl } from "./utils/urlUtils";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showContent, setShowContent] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    consultationType: "",
    specialties: [],
    sortBy: "",
  });

  const handleClearAllFilters = () => {
    setFilters({
      search: "",
      consultationType: "",
      specialties: [],
      sortBy: "",
    });
  };
  const { doctors, loading, error, specialtyList, getAutocompleteSuggestions } =
    useDoctorData(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setFilters(getFiltersFromUrl());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update filters
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    syncFiltersToUrl(updatedFilters);
  };

  // Handle search input
  const handleSearch = (searchTerm: string) => {
    handleFilterChange({ search: searchTerm });
  };

  // Remove a specific filter
  const handleRemoveFilter = (type: keyof FilterState, value?: string) => {
    if (type === "specialties" && value) {
      const updatedSpecialties = filters.specialties.filter(
        (specialty) => specialty !== value
      );
      handleFilterChange({ specialties: updatedSpecialties });
    } else if (type === "search") {
      handleFilterChange({ search: "" });
    } else if (type === "consultationType") {
      handleFilterChange({ consultationType: "" });
    } else if (type === "sortBy") {
      handleFilterChange({ sortBy: "" });
    }
  };

  // Toggle mobile filter panel
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <LandingPage />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white sticky top-0 z-30">
          <div className="container px-4 py-6 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <motion.div
                  className="text-2xl font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  <Stethoscope className="inline-block w-8 h-8 mr-2" />
                  MediConnect
                </motion.div>
              </div>
              <div className="w-full md:w-auto">
                <SearchBar
                  initialValue={filters.search}
                  onSearch={handleSearch}
                  getSuggestions={getAutocompleteSuggestions}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 mx-auto">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 text-white bg-error rounded-md"
            >
              <p>{error}</p>
            </motion.div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <AnimatePresence>
                {(isMobileFilterOpen || !isMobile) && (
                  <FilterPanel
                    filters={filters}
                    specialtyList={specialtyList}
                    onFilterChange={handleFilterChange}
                    isMobile={isMobile}
                    isOpen={isMobileFilterOpen}
                    toggleOpen={toggleMobileFilter}
                  />
                )}
              </AnimatePresence>

              <div className="flex-1">
                <div className="mb-4">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600"
                  >
                    {loading
                      ? "Loading doctors..."
                      : `${doctors.length} Doctors Available`}
                  </motion.h1>
                  <ActiveFilters
                    filters={filters}
                    onRemoveFilter={handleRemoveFilter}
                    onClearAllFilters={handleClearAllFilters} // Pass the new function
                  />
                </div>
                <DoctorList doctors={doctors} loading={loading} />
              </div>
            </div>
          )}
        </main>

        <footer className="py-6 mt-8 text-center text-neutral-600 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="container px-4 mx-auto">
            <p>© 2025 MediConnect. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
