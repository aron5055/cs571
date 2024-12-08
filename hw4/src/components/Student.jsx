/* eslint-disable react/prop-types */
const Student = ({ name, major, interests, numCredits, fromWisconsin }) => {
  return (
    <div>
      <h2>
        {name.first} {name.last}
      </h2>
      <p>
        <strong>{major}</strong>
      </p>
      <p>
        {name.first} is taking {numCredits} credits and{" "}
        {fromWisconsin ? "is" : "is Not"} from Wisconsin.
      </p>
      <p>They have {interests.length} including...</p>
      <ul>
        {interests.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    </div>
  );
};

export default Student;
