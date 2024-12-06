import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

const Comprehension = () => {
  const [data, setData] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://superassistant-backend-server2.onrender.com/api/getComprehend");
        console.log(response.data.data[0])
        setData(response.data.data[0]); // Set the data from the response
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if the API call fails
  }

  return (
    <Card style={{ margin: "2rem", padding: "1rem" }}>
      <h2 style={{color:"red"}}>Question 3</h2>
      <Card style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "whitesmoke" }}>
        <h5>Passage:</h5>
        <p>{data.passage}</p>
      </Card>

      
      <Container>
        {data.questions.map((questionItem, index) => (
          <Card key={index} style={{ marginBottom: "1rem", padding: "1rem" }}>
            <Row>
              <Col>
                <h5>{`Question ${index + 1}`}</h5>
                <p>{questionItem.question}</p>
                <Form>
                  {questionItem.options.map((option, optionIndex) => (
                    <Form.Check
                      key={optionIndex}
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      label={option}
                      onChange={() =>
                        console.log(`Selected Option: ${option}`)
                      } // Add your logic to handle selection
                    />
                  ))}
                </Form>
              </Col>
            </Row>
          </Card>
        ))}
      </Container>
    </Card>
  );
};

export default Comprehension;
