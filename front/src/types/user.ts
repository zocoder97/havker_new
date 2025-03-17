export interface User {
  id: number;
  username: string;
  email: string;
  age: number;
  description?: string;
  profilPicture?: string;
  isVisible: boolean;
}