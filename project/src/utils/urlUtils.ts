import { FilterState } from '../types/doctor';

export const syncFiltersToUrl = (filters: FilterState): void => {
  const searchParams = new URLSearchParams();
  
  if (filters.search) {
    searchParams.set('search', filters.search);
  }
  
  if (filters.consultationType) {
    searchParams.set('consultation', filters.consultationType);
  }
  
  if (filters.specialties.length > 0) {
    searchParams.set('specialties', filters.specialties.join(','));
  }
  
  if (filters.sortBy) {
    searchParams.set('sort', filters.sortBy);
  }
  
  const newUrl = `${window.location.pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;
  
  window.history.pushState({ filters }, '', newUrl);
};

export const getFiltersFromUrl = (): FilterState => {
  const searchParams = new URLSearchParams(window.location.search);
  
  const search = searchParams.get('search') || '';
  const consultationType = searchParams.get('consultation') || '';
  const specialties = searchParams.get('specialties')
    ? searchParams.get('specialties')!.split(',')
    : [];
  const sortBy = searchParams.get('sort') || '';
  
  return {
    search,
    consultationType,
    specialties,
    sortBy,
  };
};