import React from "react";
import { X } from "lucide-react";
import { FilterState } from "../types/doctor";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (type: keyof FilterState, value?: string) => void;
  onClearAllFilters: () => void; // Add this prop
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAllFilters, // Use the new prop
}) => {
  const hasActiveFilters =
    !!filters.search ||
    !!filters.consultationType ||
    filters.specialties.length > 0 ||
    !!filters.sortBy;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm font-medium text-neutral-700 mr-1">
        Active filters:
      </span>

      {filters.search && (
        <button
          onClick={() => onRemoveFilter("search")}
          className="flex items-center px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-md"
        >
          Search: {filters.search}
          <X className="w-3 h-3 ml-1" />
        </button>
      )}

      {filters.consultationType && (
        <button
          onClick={() => onRemoveFilter("consultationType")}
          className="flex items-center px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded-md"
        >
          Consultation: {filters.consultationType}
          <X className="w-3 h-3 ml-1" />
        </button>
      )}

      {filters.specialties.map((specialty) => (
        <button
          key={specialty}
          onClick={() => onRemoveFilter("specialties", specialty)}
          className="flex items-center px-2 py-1 text-xs bg-neutral-100 text-neutral-800 rounded-md"
        >
          {specialty}
          <X className="w-3 h-3 ml-1" />
        </button>
      ))}

      {filters.sortBy && (
        <button
          onClick={() => onRemoveFilter("sortBy")}
          className="flex items-center px-2 py-1 text-xs bg-neutral-100 text-neutral-800 rounded-md"
        >
          Sort by: {filters.sortBy === "fees" ? "Fees" : "Experience"}
          <X className="w-3 h-3 ml-1" />
        </button>
      )}

      {hasActiveFilters && (
        <button
          onClick={onClearAllFilters} // Call the new function
          className="text-xs text-primary-600 hover:text-primary-800 ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
