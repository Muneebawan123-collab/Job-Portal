import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error("Error fetching job:", err));
  }, [id]);

  if (!job) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" variant="primary" />
        <h4>Loading job details...</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <h2>{job.title} - {job.company}</h2>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> ${job.salary}</p>
          <p><strong>Description:</strong> {job.description}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetails;
