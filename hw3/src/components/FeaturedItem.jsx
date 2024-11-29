import { Card, Button, Table, Collapse } from "react-bootstrap";
import { useState } from "react";

export default function FeaturedItem({
  name,
  description,
  img,
  price,
  nutrition,
}) {
  const [show, setShow] = useState(false);

  return (
    <Card style={{ width: "25rem", margin: "auto" }}>
      <Card.Img variant="top" src={img} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{`$${price} per unit`}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Button onClick={() => setShow(!show)}>
          {`${show ? "Hide" : "Show"} Nutrition Facts`} Details
        </Button>
        <Collapse in={show}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Calories</th>
                <th>Fat</th>
                <th>Carbohydrates</th>
                <th>Protein</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{nutrition.calories ?? 0}</td>
                <td>{nutrition.fat ?? 0}</td>
                <td>{nutrition.carbohydrates ?? 0}</td>
                <td>{nutrition.protein ?? 0}</td>
              </tr>
            </tbody>
          </Table>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
