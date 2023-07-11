import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUserResponse, IUserUpdate } from "../../interfaces/user.interface";
import { userResponseSerializer } from "../../serializers/user.serializers";

export const updateUserService = async (
  userId: string,
  userData: IUserUpdate
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const foundUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const { cep, state, street, city, number, complement } = userData.address;

  const updatedAddress = addressRepository.create({
    ...foundUser.address,
    cep: cep || foundUser.address.cep,
    state: state || foundUser.address.state,
    street: street || foundUser.address.street,
    city: city || foundUser.address.city,
    number: number || foundUser.address.number,
    complement: complement || foundUser.address.complement,
  });

  await addressRepository.save(updatedAddress);

  const updatedUser = userRepository.create({
    ...foundUser,
    ...userData,
    address: updatedAddress,
    updatedAt: new Date(),
  });

  await userRepository.save(updatedUser);

  const updatedUserResponse = await userResponseSerializer.validate(
    updatedUser,
    {
      stripUnknown: true,
    }
  );

  return updatedUserResponse;
};
