export interface IAddressRequest {
  cep: string;
  state: string;
  street: string;
  city: string;
  number?: string | null;
  complement: string | null;
}

export interface IAddressResponse extends IAddressRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}

export interface IAddressUpdate extends Partial<IAddressRequest> {}
