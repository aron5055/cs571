import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw4/students", {
      headers: {
        "X-CS571-ID": window.localStorage.getItem("badgerid"),
      },
    })
      .then((data) => data.json())
      .then((students) => {
        console.log(students);

        setStudents(students);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleReset = () => {
    setName("");
    setMajor("");
    setInterest("");
  };

  const predicate = (student) => {
    const searchName = name.toLowerCase();
    const searchMajor = major.toLowerCase();
    const searchInterest = interest.toLowerCase();

    if (
      searchName &&
      !`${student.name.first} ${student.name.last}`
        .toLowerCase()
        .includes(searchName)
    ) {
      return false;
    }

    if (searchMajor && !student.major.toLowerCase().includes(searchMajor)) {
      return false;
    }

    if (
      searchInterest &&
      (!student.interests ||
        !student.interests.some((int) =>
          int.toLowerCase().includes(searchInterest)
        ))
    ) {
      return false;
    }

    return true;
  };

  const displayedStudents = students.filter(predicate);

  return (
    <div>
      <h1>Badger Book</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <br />
        <Button variant="neutral" onClick={handleReset}>
          Reset Search
        </Button>
      </Form>
      <Container fluid>
        <Row>
          There are {displayedStudents.length} student
          {displayedStudents.length > 1 ? "s" : ""} matching your search.
        </Row>
        <Row>
          {displayedStudents
            .slice(page * 24, (page + 1) * 24)
            .map(
              ({ id, name, interests, numCredits, major, fromWisconsin }) => (
                <Col xs={12} sm={12} md={6} lg={4} xl={3} key={id}>
                  <Student
                    name={name}
                    major={major}
                    numCredits={numCredits}
                    interests={interests}
                    fromWisconsin={fromWisconsin}
                  />
                </Col>
              )
            )}
        </Row>
      </Container>
      <Pagination>
        <Pagination.Prev
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          Previous
        </Pagination.Prev>
        {displayedStudents.length > 0 &&
          Array.from({ length: Math.ceil(displayedStudents.length / 24) }).map(
            (_, i) => (
              <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
        <Pagination.Next
          onClick={() =>
            setPage(
              Math.min(page + 1, Math.ceil(displayedStudents.length / 24) - 1)
            )
          }
          disabled={page === Math.ceil(displayedStudents.length / 24) - 1}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default Classroom;
