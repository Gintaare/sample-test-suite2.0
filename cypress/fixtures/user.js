import { faker } from "@faker-js/faker";

var user1 = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),

  dob: {
    day: faker.datatype.number({ min: 1, max: 29 }),
    day2: "0" + faker.datatype.number({ min: 1, max: 9 }),
    day3: "0" + faker.datatype.number({ min: 1, max: 9 }),
    month: faker.date.month(),
    year: "" + faker.datatype.number({ min: 1960, max: 2002 }),
  },

  address: {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode("E5E5R0"),
  },
  phone: faker.phone.phoneNumberFormat(1),
  alias: faker.lorem.words(2),

  company: faker.commerce.department(),
};

var user2 = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};

export default {
  user1,
  user2,
};
