export const ROLES = {
  MEMBER: 'MEMBER',
  MANAGEMENT: 'MANAGEMENT',
  ADMIN: 'ADMIN',
};

export const USERSTATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BANNED: 'BANNED',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
};

export const ANIMALSTATUS = {
  AVAILABLE: 'AVAILABLE',
  ADOPTED: 'ADOPTED',
  UNAVAILABLE: 'UNAVAILABLE',
  RESERVED: 'RESERVED',
  PASSED: 'PASSED',
};

export const ADOPTIONRECORDSTATUS = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  IN_PROGRESS: 'IN_PROGRESS',
  CANCELLED: 'CANCELLED',
};

export const NAVLINKS = [
  { title: 'Home', path: '/' },
  { title: 'Animals', path: '/animals' },
  { title: 'Events', path: '/events' },
  { title: 'Donation', path: '/donation' },
];

export const SECTIONLINKS = [
  { title: 'Categories', path: '/#categories' },
  { title: 'Our Events', path: '/#events' },
  { title: 'Support Us', path: '/#supportus' },
  { title: 'Testimonial', path: '/#testimonial' },
];
