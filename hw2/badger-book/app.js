const url = "https://cs571.org/rest/f24/hw2/students";

const displayStudents = async (predicate) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    });
    const students = await response.json();
    buildStudents(students.filter(predicate));
  } catch (error) {
    console.error(error);
  }
};

const clearSearchField = () => {
  document.getElementById("search-name").value = "";
  document.getElementById("search-major").value = "";
};

function buildStudents(studs) {
  const studentsContainer = document.getElementById("students");
  studentsContainer.innerHTML = "";

  const nums = document.getElementById("num-results");
  nums.innerText = studs.length;

  const createElementWithText = (tag, text) => {
    const elem = document.createElement(tag);
    elem.innerText = text;
    return elem;
  };

  const createInterestsList = (interests) => {
    const ul = document.createElement("ul");
    interests.forEach((interest) => {
      const li = createElementWithText("li", interest);
      li.addEventListener("click", (e) => {
        const text = e.target.innerText;
        clearSearchField();
        document.getElementById("search-interest").value = text;
        displayStudents(({ interests }) =>
          interests.some((interest) => interest === text)
        );
      });
      ul.appendChild(li);
    });
    return ul;
  };

  studs.forEach(({ major, name, interests, numCredits, fromWisconsin }) => {
    const studentCard = document.createElement("div");
    studentCard.className = "col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3";

    const majorText = createElementWithText("strong", major);
    const majorInfo = document.createElement("p");
    majorInfo.appendChild(majorText);
    const elements = [
      createElementWithText("h2", `${name.first} ${name.last}`),
      majorInfo,
      createElementWithText(
        "p",
        `${name.first} is taking ${numCredits} credits and ${
          fromWisconsin ? "is" : "is not"
        } from Wisconsin`
      ),
      createElementWithText(
        "p",
        `They have ${interests.length} interests including...`
      ),
      createInterestsList(interests),
    ];

    elements.forEach((element) => studentCard.appendChild(element));
    studentsContainer.appendChild(studentCard);
  });
}

function handleSearch(e) {
  e?.preventDefault(); // You can ignore this; prevents the default form submission!

  const nameField = document.getElementById("search-name").value.toLowerCase();
  const majorField = document
    .getElementById("search-major")
    .value.toLowerCase();
  const interestField = document
    .getElementById("search-interest")
    .value.toLowerCase();

  const predicate = ({ name, major, interests }) => {
    if (!`${name.first} ${name.last}`.toLowerCase().includes(nameField)) {
      return false;
    }
    if (!major.toLowerCase().includes(majorField)) {
      return false;
    }
    if (
      !interests.some((interest) =>
        interest.toLowerCase().includes(interestField)
      )
    ) {
      return false;
    }
    return true;
  };

  displayStudents(predicate);
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

displayStudents((x) => true);
