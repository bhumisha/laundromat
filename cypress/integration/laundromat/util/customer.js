export const newCustomer = () => {
  const random = Math.floor(Math.random() * 1000);
  return {
    email: `cust${random}@foo.test`,
    password: 'password123',
    street: `${random} Main Street`,
    city: 'San Francisco',
    zip: '94110',
  };
};
