
export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
export interface MyForm {
  email: string;
  age: number;
  gender: GenderEnum;
}