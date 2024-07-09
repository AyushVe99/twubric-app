import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Form, Row, Col, Container, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TwubricGrid() {
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [sortBy, setSortBy] = useState('total');
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json')
      .then(res => res.json())
      .then(data => {
        setFilteredFollowers(data);
        setFollowers(data);
       
      });
  }, []);

  useEffect(() => {
    const filtered = followers.filter(follower => {
      const joinDate = new Date(follower.join_date * 1000);
      return (!startDate || joinDate >= new Date(startDate)) &&
             (!endDate || joinDate <= new Date(endDate));
    });
    setFilteredFollowers(filtered);
  }, [followers, startDate, endDate]);

  useEffect(() => {
    const sorted = [...filteredFollowers].sort((a, b) => {
      if (a.twubric[sortBy] < b.twubric[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a.twubric[sortBy] > b.twubric[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredFollowers(sorted);
  }, [sortBy, sortOrder, filteredFollowers]);

  const handleSort = (sortField) => {
    const order = sortBy === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(sortField);
    setSortOrder(order);
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const removeFollower = (id) => {
    const updatedFollowers = followers.filter(follower => follower.uid !== id);
    setFollowers(updatedFollowers);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Twubric Followers</h1>
      <Form className="mb-4">
        <Form.Group as={Row} controlId="formDateRange">
          <Form.Label column sm={2}>Start Date</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Col>
          <Form.Label column sm={2}>End Date</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Col>
        </Form.Group>
      </Form>

      <ButtonGroup className="mb-4 d-flex justify-content-center">
        <Button variant={sortBy === 'total' ? 'primary' : 'secondary'} onClick={() => handleSort('total')}>Sort by Twubric Score</Button>
        <Button variant={sortBy === 'friends' ? 'primary' : 'secondary'} onClick={() => handleSort('friends')}>Sort by Friends</Button>
        <Button variant={sortBy === 'influence' ? 'primary' : 'secondary'} onClick={() => handleSort('influence')}>Sort by Influence</Button>
        <Button variant={sortBy === 'chirpiness' ? 'primary' : 'secondary'} onClick={() => handleSort('chirpiness')}>Sort by Chirpiness</Button>
      </ButtonGroup>

      <Row>
        {followers && filteredFollowers.map(follower => (
          <Col key={follower.uid} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={follower.image} />
              <Card.Body>
                <Card.Title>{follower.fullname}</Card.Title>
                <Card.Text>
                  <strong>Username:</strong> {follower.username}<br />
                  <strong>Twubric Score:</strong> <Badge bg="info">{follower.twubric.total}</Badge><br />
                  <strong>Friends:</strong> <Badge bg="success">{follower.twubric.friends}</Badge><br />
                  <strong>Influence:</strong> <Badge bg="warning">{follower.twubric.influence}</Badge><br />
                  <strong>Chirpiness:</strong> <Badge bg="danger">{follower.twubric.chirpiness}</Badge><br />
                  <strong>Joined:</strong> {new Date(follower.join_date * 1000).toLocaleDateString()}
                </Card.Text>
                <Button variant="danger" onClick={() => removeFollower(follower.uid)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TwubricGrid;
