export interface CarUsersDTO {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  startRent?: Date | null;
  finishRent?: Date | null;
}
