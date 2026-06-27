export interface Competence {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  badge: string;
  skills: string[];
  duration: string;
  image: string;
  tools: string[];
}

export interface Service {
  id: string;
  category: 'skincare' | 'hair' | 'body' | 'makeup';
  name: string;
  duration: number; // in minutes
  price: number; // in IDR
  description: string;
  features: string[];
  image: string;
}

export interface Project {
  id: string;
  title: string;
  studentName: string;
  grade: string;
  category: 'makeup' | 'hair' | 'spa' | 'skin';
  image: string;
  description: string;
  productsUsed: string[];
  achievementBadge?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
  images?: string[];
  equipment: string[];
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  certifications: string[];
  quote: string;
}

export interface Booking {
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  totalPrice: number;
  bookingCode: string;
  status: 'Simulated' | 'Pending Approval' | 'Confirmed';
}
