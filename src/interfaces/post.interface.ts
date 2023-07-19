export interface IImage {
  imageLink: string;
}

export interface IImageResponse {
  id: string;
  imageLink: string;
  createdAt: Date;
}

export interface IPostRequest {
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  color: string;
  kilometers: string;
  description?: string | null;
  imageCap: string;
  images?: IImage[] | null;
}

export interface IPostResponse {
  id: string;
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  color: string;
  kilometers: string;
  description?: string | null;
  imageCap: string;
  images: IImage[] | null;
  isGoodPurchase: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    description?: string;
    typeOfAccount?: string;
  };
}

export interface IPostUpdate {
  mark?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  price?: string;
  color?: string;
  kilometers?: string;
  description?: string | null;
  isActive: boolean;
  imageCap: string;
  images?: IImage[];
}
