export interface User {
  name?: string;
  id: string;
  email: string;
  role: string;
  savedPets: Array<string>;
  userProfile?: any;
  imageUrl?: string;
}

export interface Loading {
  loading: boolean;
}
