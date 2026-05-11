export class User {
  firstName: string;
  lastName: string;
  birthDate: string;
  avatar: string;

  constructor(firstName: string, lastName: string, birthDate: string, avatar: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.avatar = avatar;
  }
}
