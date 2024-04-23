export interface Address {
    street: string;
    city: string;
    number: string;
    zipCode: string;
}
export interface PhoneNumber {
    number: string;
    type: string;
}
export interface Customer {
    givenName: string;
    surName: string;
    emaiil: string;
    afm: string;
    phoneNumber: PhoneNumber[];
    address: Address;
}


