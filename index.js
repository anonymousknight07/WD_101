// Function to retrieve data from localStorage and populate the table
function displayUserData() {
  const storedUserData = JSON.parse(localStorage.getItem("userDetails")) || [];
  const table = document.getElementById('userDataTable');
  let tableContent = ``;
  
  // Loop through each user data and create table rows
  storedUserData.forEach(user => {
      tableContent += `<tr class="border-2 border-gray-200 bg-gray-400">
          <td class="py-2 px-4 text-center">${user.fullName}</td>
          <td class="py-2 px-4 text-center">${user.emailAddress}</td>
          <td class="py-2 px-4 text-center">${user.passwordInput}</td>
          <td class="py-2 px-4 text-center">${user.dateOfBirth}</td>
          <td class="py-2 px-4 text-center">${user.acceptedTerms ? 'true' : 'false'}</td>
      </tr>`;
  });
  
  // Set the innerHTML of the table
  table.innerHTML = `
      <tr class="border-2 border-gray-200 bg-gray-400">
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Dob</th>
          <th>Accepted terms?</th>
      </tr>
      ${tableContent}`;
}

// Function triggered on form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get user data from form inputs
  const user = {
      fullName: document.getElementById("fullName").value,
      emailAddress: document.getElementById("emailAddress").value,
      dateOfBirth: document.getElementById("dateOfBirth").value,
      passwordInput: document.getElementById("passwordInput").value,
      acceptedTerms: document.getElementById("acceptTermsCheckbox").checked,
  };

  // Retrieve existing data from localStorage or initialize an empty array
  let userList = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Add the new user data to the array
  userList.push(user);

  // Update localStorage with the modified array
  localStorage.setItem("userDetails", JSON.stringify(userList));

  // Refresh the displayed table
  displayUserData();
}

// Set minimum and maximum dates for the Date of Birth input
const today = new Date();
const maxDate = new Date(today);
maxDate.setFullYear(maxDate.getFullYear() - 18);
const minDate = new Date(today);
minDate.setFullYear(minDate.getFullYear() - 56);

// Set the min and max attributes for the Date of Birth input
document.getElementById("dateOfBirth").setAttribute("max", maxDate.toISOString().slice(0, 10));
document.getElementById("dateOfBirth").setAttribute("min", minDate.toISOString().slice(0, 10));

// Attach the submit event listener to the form
document.getElementById("registrationForm").addEventListener("submit", handleFormSubmit);

// Call the function to initially populate the table
displayUserData();
