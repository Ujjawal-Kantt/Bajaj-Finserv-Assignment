import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Calendar, MapPin, Users, Video, Building, Languages, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const consultationTypes = doctor.consultationType || [];

  return (
    <motion.div
      data-testid="doctor-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className="p-4 bg-gradient-to-br from-white to-neutral-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="flex-shrink-0 mb-4 md:mb-0 md:mr-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="object-cover w-full md:w-28 h-28 rounded-lg shadow-md"
          />
        </motion.div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <motion.h2 
                data-testid="doctor-name"
                className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600"
                whileHover={{ scale: 1.02 }}
              >
                {doctor.name}
              </motion.h2>
              
              <p 
                data-testid="doctor-specialty"
                className="text-primary-600 font-medium"
              >
                {doctor.specialty}
              </p>
              
              <div className="flex items-center mt-1 text-sm text-neutral-600">
                <Award className="w-4 h-4 mr-1 text-primary-500" />
                <span data-testid="doctor-experience">
                  {doctor.experience}
                </span>
              </div>
              
              <div className="flex items-center mt-1 text-sm text-neutral-600">
                <Languages className="w-4 h-4 mr-1 text-secondary-500" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
              
              <div className="flex items-center mt-1 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 mr-1 text-neutral-500" />
                <span>{doctor.location}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:text-right">
              <div className="flex items-center justify-start md:justify-end mb-2 space-x-1">
                {consultationTypes.includes('Video') && (
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 text-xs font-medium rounded-full text-primary-700 bg-primary-50"
                  >
                    <Video className="inline w-3 h-3 mr-1" /> Video Consult
                  </motion.span>
                )}
                {consultationTypes.includes('In-clinic') && (
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 text-xs font-medium rounded-full text-secondary-700 bg-secondary-50"
                  >
                    <Building className="inline w-3 h-3 mr-1" /> In-clinic
                  </motion.span>
                )}
              </div>
              
              <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600" data-testid="doctor-fee">
                {doctor.fees}
              </div>
              
              <div className="mt-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Book Appointment
                </motion.button>
              </div>
            </div>
          </div>
          
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 flex items-center justify-center text-sm text-primary-600 hover:text-primary-700"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
            ) : (
              <>View More Details <ChevronDown className="w-4 h-4 ml-1" /></>
            )}
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-neutral-200"
              >
                {doctor.doctor_introduction && (
                  <div className="mb-4 text-sm text-neutral-600">
                    <h3 className="font-medium mb-2">About Doctor</h3>
                    <p>{doctor.doctor_introduction}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Clinic Details</h3>
                    <div className="text-sm text-neutral-600">
                      <p className="font-medium">{doctor.clinic.name}</p>
                      <p>{doctor.clinic.address.address_line1}</p>
                      <p>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;