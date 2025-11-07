// Mock data
const users = [
  { id: 1, name: "John Doe", address: "X Street", birth_date: "Nov 4, 2001" },
  { id: 2, name: "Jane Smith", address: "Maple Avenue", birth_date: "Jan 12, 2000" },
  { id: 3, name: "Michael Johnson", address: "Oak Street", birth_date: "Mar 8, 1999" },
  { id: 4, name: "Emily Davis", address: "Cedar Lane", birth_date: "Jul 23, 2002" },
  { id: 5, name: "Daniel Brown", address: "Elm Drive", birth_date: "Sep 15, 2001" },
  { id: 6, name: "Olivia Wilson", address: "Birch Road", birth_date: "Feb 20, 2000" },
  { id: 7, name: "Ethan Taylor", address: "Pine Street", birth_date: "Dec 30, 2003" },
  { id: 8, name: "Sophia Martinez", address: "Willow Avenue", birth_date: "Oct 19, 2001" },
  { id: 9, name: "Jacob Anderson", address: "Aspen Court", birth_date: "May 6, 1998" },
  { id: 10, name: "Ava Thomas", address: "Chestnut Blvd", birth_date: "Aug 27, 2002" },
  { id: 11, name: "Liam White", address: "River Road", birth_date: "Nov 11, 1999" },
  { id: 12, name: "Mia Harris", address: "Hill Street", birth_date: "Jun 9, 2000" },
  { id: 13, name: "Noah Clark", address: "Lake Avenue", birth_date: "Jan 25, 2001" },
  { id: 14, name: "Isabella Lewis", address: "Valley Drive", birth_date: "Mar 14, 2003" },
  { id: 15, name: "Logan Walker", address: "Forest Street", birth_date: "Apr 30, 2000" },
  { id: 16, name: "Charlotte Hall", address: "Summit Avenue", birth_date: "May 3, 2002" },
  { id: 17, name: "Benjamin Allen", address: "Park Lane", birth_date: "Jul 19, 2001" },
  { id: 18, name: "Amelia Young", address: "Main Street", birth_date: "Sep 25, 1999" },
  { id: 19, name: "Lucas King", address: "Sunset Blvd", birth_date: "Feb 13, 2000" },
  { id: 20, name: "Harper Scott", address: "Ocean Drive", birth_date: "Oct 2, 2002" },
  { id: 21, name: "Elijah Green", address: "Highland Road", birth_date: "Dec 10, 2001" },
  { id: 22, name: "Abigail Baker", address: "Riverbend Street", birth_date: "Jun 18, 1998" },
  { id: 23, name: "William Adams", address: "Maple Street", birth_date: "Jul 27, 2003" },
  { id: 24, name: "Evelyn Nelson", address: "Crescent Avenue", birth_date: "Mar 21, 2000" },
  { id: 25, name: "James Carter", address: "Spring Road", birth_date: "Aug 14, 1999" },
  { id: 26, name: "Ella Mitchell", address: "Pinecrest Blvd", birth_date: "Sep 7, 2001" },
  { id: 27, name: "Henry Perez", address: "Garden Street", birth_date: "Apr 11, 2000" },
  { id: 28, name: "Avery Roberts", address: "Vine Avenue", birth_date: "May 30, 2002" },
  { id: 29, name: "Alexander Turner", address: "Broadway", birth_date: "Jun 4, 1999" },
  { id: 30, name: "Scarlett Phillips", address: "Oakwood Lane", birth_date: "Jan 8, 2001" },
  { id: 31, name: "Sebastian Campbell", address: "Magnolia Street", birth_date: "Feb 26, 2003" },
  { id: 32, name: "Luna Parker", address: "Cedar Road", birth_date: "Oct 5, 2002" },
  { id: 33, name: "Jack Evans", address: "Walnut Street", birth_date: "Nov 22, 1998" },
  { id: 34, name: "Grace Edwards", address: "Pearl Avenue", birth_date: "Jul 10, 2001" },
  { id: 35, name: "Matthew Collins", address: "Hillcrest Drive", birth_date: "Dec 1, 1999" }
];

// ================================= INPUTS AND OUTPUTS =======================

var searchInput = document.getElementById("search-input");
var selectInput = document.getElementById("select-input");
var caseSensitivityInput = document.getElementById("case-sensitive-input");
var wholeWordOnlyInput = document.getElementById("whole-word-only-input");
var tableOutput = document.getElementById("table-output");

// ================================= ACTUAL FUNCTIONS =================================

const tableHeaders = `
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Address</th>
    <th>Birth Date</th>
  </tr>
`;

function renderTableNoFilter() { // No filter yet, just display everything
  tableOutput.innerHTML = `
    ${tableHeaders}
    ${users.map(item => (`
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.address}</td>
        <td>${item.birth_date}</td>
      </tr>
    `)).join("")}
  `;
}

function renderSelectChoices() {
  // Only the keys of the first record
  selectInput.innerHTML = `${Object.keys(users[0]).map(item => `<option>${item}</option>`).join("")}`
}

// ================================= EVENT LISTENERS =================================
searchInput.addEventListener("input", handleSearch);
selectInput.addEventListener("change", handleSearch);
caseSensitivityInput.addEventListener("change", handleSearch);
wholeWordOnlyInput.addEventListener("change", handleSearch);

function handleSearch() {
  const keyword = searchInput.value.trim();
  const selectedField = selectInput.value;
  const isCaseSensitive = caseSensitivityInput.checked;
  const isWholeWord = wholeWordOnlyInput.checked;

  if (!keyword) return renderTableNoFilter();

  const filteredUsers = users.filter(user => {
    const fieldsToSearch =
      selectedField === "Default..." ? Object.keys(user) : [selectedField];

    return fieldsToSearch.some(field => {
      let value = String(user[field]);
      let search = keyword;

      if (!isCaseSensitive) {
        value = value.toLowerCase();
        search = search.toLowerCase();
      }

      if (isWholeWord) {
        const pattern = new RegExp(`\\b${search}\\b`);
        return pattern.test(value);
      }

      return value.includes(search);
    });
  });

  tableOutput.innerHTML = `
    ${tableHeaders}
    ${filteredUsers
      .map(
        item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.address}</td>
          <td>${item.birth_date}</td>
        </tr>`
      )
      .join("")}
  `;
}

// ================================= INITIAL CALLS =================================
renderTableNoFilter();
renderSelectChoices();