import {v4} from "uuid";
import {UserConfirmation} from "@/entity/UserConfirmation";
import {User} from "@/entity/User";

export const createConfirmationUrl = async (userId: number) => {
  // expire되는 설정 같은게 있을 수 있다.
  const confirmation  = await UserConfirmation.create({
    userId,
  }).save()
  return `https://localhost:4000/user/confirm/${confirmation.confirmId}`;
}