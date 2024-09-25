import { Municipality } from "../shared/geo";

export interface UserDetail {
  gender: "M" | "F" | "O";
  birthDate: Date;
  municipality: Municipality;
}
