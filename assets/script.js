var searchInput = document.getElementById("search-input");
var selectInput = document.getElementById("select-input");
var caseSensitivityInput = document.getElementById("case-sensitive-input");
var wholeWordOnlyInput = document.getElementById("whole-word-only-input");

const tableHeaders = `
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Address</th>
    <th>Birth Date</th>
  </tr>
`;

searchInput.addEventListener("input", () => {
  // Only trigger re-search if input was changed
});