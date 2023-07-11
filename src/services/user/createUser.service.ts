import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interface";
import { userResponseSerializer } from "../../serializers/user.serializers";
import { IAddressResponse } from "../../interfaces/address.interface";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const existsEmail = await userRepository.findOneBy({
    email: userData.email,
  });

  const existsCpf = await userRepository.findOneBy({
    cpf: userData.cpf,
  });

  if (existsEmail) {
    throw new AppError("Email is already exists", 400);
  }

  if (existsCpf) {
    throw new AppError("Cpf is already exists", 400);
  }

  const user = userRepository.create(userData);

  const savedUser = await userRepository.save(user);

  const address = addressRepository.create({
    ...userData.address,
    user: savedUser,
  });

  const savedAddress = await addressRepository.save(address);

  savedUser.address = savedAddress;

  await userRepository.save(savedUser);

  const userResponse = await userResponseSerializer.validate(savedUser, {
    stripUnknown: true,
  });

  const addressResponseWithUser: IAddressResponse = {
    ...savedAddress,
    user: userResponse.id,
  };

  return { ...userResponse, address: addressResponseWithUser };
};
