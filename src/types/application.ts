export interface FormData {
  type: 'UNDERGRADUATE' | 'GRADUATE' | 'TRANSFER' | 'INTERNATIONAL';
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  intendedMajor: string;
  startTerm: string;
  gpa: string;
  satScore?: string;
  actScore?: string;
  toeflScore?: string;
  ieltsScore?: string;
  previousSchools: {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    degree?: string;
  }[];
  documents: {
    type: string;
    file?: File;
    status: 'pending' | 'uploaded' | 'error';
  }[];
  essay: string;
} 