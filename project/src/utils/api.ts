import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';
const FALLBACK_PHOTO = 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctor data');
    }
    
    const data = await response.json();
    
    // Transform API data to match our interface
    return data.map((doctor: any) => ({
      id: doctor.id,
      name: doctor.name,
      name_initials: doctor.name_initials,
      photoUrl: doctor.photo === "null" ? FALLBACK_PHOTO : doctor.photo,
      doctor_introduction: doctor.doctor_introduction,
      specialty: doctor.specialities[0].name,
      fee: parseInt(doctor.fees.replace(/[^\d]/g, '')),
      experience: parseInt(doctor.experience.split(' ')[0]),
      languages: doctor.languages,
      location: `${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`,
      clinic: doctor.clinic,
      consultationType: [
        ...(doctor.video_consult ? ['Video'] : []),
        ...(doctor.in_clinic ? ['In-clinic'] : [])
      ],
      availability: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};