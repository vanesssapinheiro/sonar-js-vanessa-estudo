export function formatCustomerB(customer) {
  const name = customer.name.trim().toUpperCase();
  const email = customer.email.trim().toLowerCase();
  const phone = customer.phone.trim();
  const city = customer.city.trim().toUpperCase();

  return `${name} | ${email} | ${phone} | ${city}`;
}
