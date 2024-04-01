export interface Person {
    givenName: string;
    surName: string;
    age: number;
    email:string;
    address: string;
}

export interface EPerson {
    givenName: string;
    surName: string;
    age: string;
    email:string;
    education: string;
}

export const ManyPerson: EPerson[] = [
    {
      givenName: 'Tiffany',
      surName: 'Collins',
      age: 'tiffany@rocketmail.com',
      email: 'tiffany@rocketmail.com',
      education: 'Some college, no degree',
    },
    {
      givenName: 'Eleanor',
      surName: 'Patterson',
      age: 'epatterson@yahoo.com',
      email: 'epatterson@yahoo.com',
      education: 'Associate degree',
    },
    {
      givenName: 'Joshua',
      surName: 'Henderson',
      age: 'joshuahenderson@aol.com',
      email: 'joshuahenderson@aol.com',
      education: 'Doctoral degree',
    },
    {
      givenName: 'Ava',
      surName: 'Murphy',
      age: 'ammurphy@ymail.com',
      email: 'ammurphy@ymail.com',
      education: 'Bachelor’s degree',
    },
    {
      givenName: 'Brandon',
      surName: 'Butler',
      age: 'brandon_wayne_butler@rocketmail.com',
      email: 'brandon_wayne_butler@rocketmail.com',
      education: 'Associate degree',
    },
    {
      givenName: 'Sean',
      surName: 'Simmons',
      age: 's.l.simmons@rocketmail.com',
      email: 's.l.simmons@rocketmail.com',
      education: 'Less than high school',
    },
    {
      givenName: 'Jeremy',
      surName: 'Hayes',
      age: 'j.hayes@hotmail.com',
      email: 'j.hayes@hotmail.com',
      education: 'Master’s degree',
    },
    {
      givenName: 'Jason',
      surName: 'Robinson',
      age: 'jarobinson36@aol.com',
      email: 'jarobinson36@aol.com',
      education: 'Master’s degree',
    },
    {
      givenName: 'Gabriel',
      surName: 'Long',
      age: 'g_long@aol.com',
      email: 'g_long@aol.com',
      education: 'Master’s degree',
    },
    {
      givenName: 'Joshua',
      surName: 'Moore',
      age: 'joshuamoore@rocketmail.com',
      email: 'joshuamoore@rocketmail.com',
      education: 'Bachelor’s degree',
    }
];
