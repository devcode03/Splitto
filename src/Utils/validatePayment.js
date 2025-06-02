export default function validatePayment({
  payer,
  paymentOf,
  price,
  selectedMembers,
}) {
  if (!payer || !paymentOf || !price || selectedMembers.length === 0) {
    return "Please fill all the fields and select at least one friend.";
  }
  if (isNaN(Number(price)) || Number(price) <= 0) {
    return "Enter a valid payment amount.";
  }
  return null;
}
