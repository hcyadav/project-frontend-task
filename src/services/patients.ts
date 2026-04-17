import { z } from 'zod';

// Schema Definition based on the requirements
export const patientSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last Name must be at least 2 characters' }),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)) && new Date(val) <= new Date(), {
    message: 'Valid date of birth in the past is required',
  }),
  gender: z.enum(['Male', 'Female', 'Other'], {
    message: 'Please select a gender',
  }),
  address: z.string().min(1, { message: 'Address is required' }),
  medicalHistory: z.string().min(1, { message: 'Medical History is required' }),
  allergies: z.string().min(1, { message: 'Allergies are required' }),
  currentMedications: z.string().min(1, { message: 'Current Medications are required' }),
  phone: z.string().regex(/^\d+$/, { message: 'Phone must be numeric' }).min(10, "Invalid phone length"),
  email: z.string().email({ message: 'Invalid email format' }),
  emergencyContactName: z.string().min(2, { message: 'Emergency Contact Name must be at least 2 characters' }),
  emergencyContactPhone: z.string().regex(/^\d+$/, { message: 'Must be numeric' }).min(10, "Invalid phone length"),
});

export type PatientFormValues = z.infer<typeof patientSchema>;

export interface Patient extends PatientFormValues {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Simulated data store (for frontend evaluation)
let mockedPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1992-12-01',
    gender: 'Male',
    address: '123 Main St, Mumbai',
    medicalHistory: 'None',
    allergies: 'Peanuts',
    currentMedications: 'None',
    phone: '9876543210',
    email: 'john.doe@example.com',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '8765432109'
  },
  {
    id: '2',
    firstName: 'Sara',
    lastName: 'Khan',
    dob: '1996-05-15',
    gender: 'Female',
    address: '456 Linking Rd, Delhi',
    medicalHistory: 'Asthma',
    allergies: 'None',
    currentMedications: 'Inhaler',
    phone: '8765432109',
    email: 'sara.k@example.com',
    emergencyContactName: 'Aamir Khan',
    emergencyContactPhone: '9988776655'
  }
];

export const patientService = {
  getPatients: async (): Promise<Patient[]> => {
    // In production: const response = await api.get('/patients'); return response.data;
    return new Promise((resolve) => setTimeout(() => resolve([...mockedPatients]), 500));
  },
  
  getPatientById: async (id: string): Promise<Patient> => {
    // In production: const response = await api.get(`/patients/${id}`); return response.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const patient = mockedPatients.find(p => p.id === id);
        if (patient) resolve({ ...patient });
        else reject(new Error('Patient not found'));
      }, 500);
    });
  },

  createPatient: async (data: PatientFormValues): Promise<Patient> => {
    // In production: const response = await api.post('/patients', data); return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPatient = { ...data, id: Math.random().toString(36).substring(2, 9) };
        mockedPatients.push(newPatient);
        resolve(newPatient);
      }, 600);
    });
  },

  updatePatient: async (id: string, data: PatientFormValues): Promise<Patient> => {
    // In production: const response = await api.put(`/patients/${id}`, data); return response.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockedPatients.findIndex(p => p.id === id);
        if (index > -1) {
          mockedPatients[index] = { ...mockedPatients[index], ...data };
          resolve(mockedPatients[index]);
        } else {
          reject(new Error('Patient not found'));
        }
      }, 600);
    });
  },

  deletePatient: async (id: string): Promise<void> => {
    // In production: await api.delete(`/patients/${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        mockedPatients = mockedPatients.filter(p => p.id !== id);
        resolve();
      }, 600);
    });
  }
};
