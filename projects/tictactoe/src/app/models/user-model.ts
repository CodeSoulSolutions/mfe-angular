export class UserModel {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    difficulty: string;
    gender: string;
    playerDescription: string;

    constructor(data: Partial<UserModel> = {}) {
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.dateOfBirth = data.dateOfBirth || '';
        this.phoneNumber = data.phoneNumber || '';
        this.email = data.email || '';
        this.difficulty = data.difficulty || '';
        this.gender = data.gender || '';
        this.playerDescription = data.playerDescription || '';
    }
}
