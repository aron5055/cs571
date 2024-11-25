function submitApplication(e) {
  e.preventDefault(); // You can ignore this; prevents the default form submission!

  const nodes = document.getElementsByName("job");
  const checked = [...nodes].filter((node) => node.checked);
  if (checked.length === 0) {
    alert("Please select a job!");
  } else {
    const job = checked[0].value;
    alert(`Thank you for applying to be a ${job}`);
  }
}
