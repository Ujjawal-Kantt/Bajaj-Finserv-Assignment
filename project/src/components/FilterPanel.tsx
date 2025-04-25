import React from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types/doctor';

interface FilterPanelProps {
  filters: FilterState;
  specialtyList: string[];
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  isMobile: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  specialtyList,
  onFilterChange,
  isMobile,
  isOpen,
  toggleOpen,
}) => {
  const handleConsultationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const consultationType = event.target.value;
    onFilterChange({ consultationType });
  };

  const handleSpecialtyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const specialty = event.target.value;
    const updatedSpecialties = [...filters.specialties];

    if (event.target.checked) {
      updatedSpecialties.push(specialty);
    } else {
      const index = updatedSpecialties.indexOf(specialty);
      if (index !== -1) {
        updatedSpecialties.splice(index, 1);
      }
    }

    onFilterChange({ specialties: updatedSpecialties });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ sortBy: event.target.value });
  };

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
          <Filter className="inline-block w-5 h-5 mr-2" />
          Filters
        </h3>
        
        {isMobile && (
          <button
            onClick={toggleOpen}
            className="absolute p-1 rounded-md top-4 right-4 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close filter panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <motion.div 
        className="p-4 bg-gradient-to-br from-white to-primary-50 rounded-lg shadow-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h4 className="mb-3 font-medium text-neutral-700">Consultation Type</h4>
        <div className="space-y-2">
          <label key="video" className="flex items-center space-x-2 cursor-pointer hover:text-primary-600 transition-colors">
            <input
              type="radio"
              name="consultationType"
              value="Video"
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'Video'}
              onChange={handleConsultationChange}
              className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">Video Consultation</span>
          </label>
          <label key="in-clinic" className="flex items-center space-x-2 cursor-pointer hover:text-primary-600 transition-colors">
            <input
              type="radio"
              name="consultationType"
              value="In-clinic"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'In-clinic'}
              onChange={handleConsultationChange}
              className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">In-clinic Visit</span>
          </label>
          {filters.consultationType && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => onFilterChange({ consultationType: '' })}
              className="text-xs text-primary-600 hover:text-primary-800"
            >
              Clear selection
            </motion.button>
          )}
        </div>
      </motion.div>

      <motion.div 
        className="p-4 bg-gradient-to-br from-white to-secondary-50 rounded-lg shadow-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h4 className="mb-3 font-medium text-neutral-700">Specialties</h4>
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {specialtyList.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center space-x-2 cursor-pointer hover:text-primary-600 transition-colors"
            >
              <input
                type="checkbox"
                value={specialty}
                data-testid={`filter-specialty-${specialty}`}
                checked={filters.specialties.includes(specialty)}
                onChange={handleSpecialtyChange}
                className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{specialty}</span>
            </label>
          ))}
        </div>
        {filters.specialties.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onFilterChange({ specialties: [] })}
            className="mt-2 text-xs text-primary-600 hover:text-primary-800"
          >
            Clear all
          </motion.button>
        )}
      </motion.div>

      <motion.div 
        className="p-4 bg-gradient-to-br from-white to-neutral-50 rounded-lg shadow-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h4 className="mb-3 font-medium text-neutral-700">Sort By</h4>
        <div className="space-y-2">
          <label key="fees" className="flex items-center space-x-2 cursor-pointer hover:text-primary-600 transition-colors">
            <input
              type="radio"
              name="sortBy"
              value="fees"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={handleSortChange}
              className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">
              Consultation Fee (Low to High)
            </span>
          </label>
          <label key="experience" className="flex items-center space-x-2 cursor-pointer hover:text-primary-600 transition-colors">
            <input
              type="radio"
              name="sortBy"
              value="experience"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={handleSortChange}
              className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">
              Experience (High to Low)
            </span>
          </label>
          {filters.sortBy && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => onFilterChange({ sortBy: '' })}
              className="text-xs text-primary-600 hover:text-primary-800"
            >
              Clear sort
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );

  // Mobile filter button
  if (isMobile && !isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className="fixed z-10 flex items-center px-4 py-2 text-white rounded-full shadow-md bottom-6 right-6 bg-gradient-to-r from-primary-600 to-secondary-600"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-5 h-5 mr-2" />
        Filters
      </motion.button>
    );
  }

  // Mobile filter panel
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed top-0 left-0 z-40 w-full h-full max-w-xs p-6 overflow-y-auto bg-gradient-to-br from-white to-neutral-50 shadow-xl"
      >
        {filterContent}
      </motion.div>
    );
  }

  // Desktop filter panel
  return (
    <aside className="sticky top-6 w-64 p-6 bg-gradient-to-br from-white to-neutral-50 rounded-lg">
      {filterContent}
    </aside>
  );
};

export default FilterPanel;