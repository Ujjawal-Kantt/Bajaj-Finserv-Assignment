import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types/doctor';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow animate-pulse"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                <div className="w-full md:w-28 h-28 bg-neutral-200 rounded-lg"></div>
              </div>
              <div className="flex-grow space-y-3">
                <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                <div className="h-8 bg-neutral-200 rounded w-1/3 mt-6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mb-4 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mb-1 text-lg font-medium text-neutral-700">
          No doctors found
        </h3>
        <p className="text-neutral-500">
          Try adjusting your search or filter criteria
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="doctor-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {doctors.map((doctor, index) => (
          <DoctorCard key={doctor.id} doctor={doctor} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default DoctorList;