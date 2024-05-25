export interface CarDTO {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  startRent?: Date | null;
  finishRent?: Date | null;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}