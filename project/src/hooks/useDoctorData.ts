import { useState, useEffect, useMemo } from 'react';
import { Doctor, FilterState } from '../types/doctor';
import { fetchDoctors } from '../utils/api';

const useDoctorData = (filters: FilterState) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [specialtyList, setSpecialtyList] = useState<string[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        
        // Extract unique specialties
        const specialties = Array.from(
          new Set(data.map((doctor) => doctor.specialty))
        );
        setSpecialtyList(specialties);
        
      } catch (err) {
        setError('Failed to load doctor data');
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doctor) => {
        // Filter by search
        if (
          filters.search &&
          !doctor.name.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        // Filter by consultation type - using optional chaining
        if (
          filters.consultationType &&
          !(doctor.consultationType?.includes(filters.consultationType))
        ) {
          return false;
        }

        // Filter by specialties (if any selected)
        if (
          filters.specialties.length > 0 &&
          !filters.specialties.includes(doctor.specialty)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by fees (ascending)
        if (filters.sortBy === 'fees') {
          return a.fee - b.fee;
        }
        
        // Sort by experience (descending)
        if (filters.sortBy === 'experience') {
          return b.experience - a.experience;
        }
        
        return 0;
      });
  }, [doctors, filters]);

  const getAutocompleteSuggestions = (query: string): string[] => {
    if (!query) return [];
    
    const matchingDoctors = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return matchingDoctors
      .map(doctor => doctor.name)
      .slice(0, 3); // Return top 3 matches
  };

  return {
    doctors: filteredDoctors,
    loading,
    error,
    specialtyList,
    getAutocompleteSuggestions,
  };
};

export default useDoctorData;