import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { X, Star, Award, MapPin, Video, Building, Languages, Phone } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface DoctorModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30"
            />

            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-xl transform"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-500" />
                </button>
              </div>

              <div className="flex items-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-100">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                <div className="ml-6">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600"
                  >
                    {doctor.name}
                  </Dialog.Title>
                  <p className="text-lg text-primary-600">{doctor.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-primary-500 mr-2" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <Languages className="w-5 h-5 text-secondary-500 mr-2" />
                    <span>{doctor.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-neutral-500 mr-2" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50">
                    <h4 className="font-semibold mb-2">Consultation Fee</h4>
                    <p className="text-2xl font-bold text-primary-600">{doctor.fees}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {doctor.consultationType?.includes('Video') && (
                      <span className="px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
                        <Video className="inline w-4 h-4 mr-1" /> Video Consult
                      </span>
                    )}
                    {doctor.consultationType?.includes('In-clinic') && (
                      <span className="px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700">
                        <Building className="inline w-4 h-4 mr-1" /> In-clinic
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {doctor.doctor_introduction && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">About Doctor</h4>
                  <p className="text-neutral-600">{doctor.doctor_introduction}</p>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Clinic Details</h4>
                <div className="p-4 rounded-lg bg-neutral-50">
                  <p className="font-medium">{doctor.clinic.name}</p>
                  <p className="text-neutral-600">{doctor.clinic.address.address_line1}</p>
                  <p className="text-neutral-600">
                    {doctor.clinic.address.locality}, {doctor.clinic.address.city}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default DoctorModal;