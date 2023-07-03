import { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Card, Row, Col, Button, Modal, Form,InputGroup } from 'react-bootstrap';
const User = () => {
    const [user, setUser] = useState([])
    const [show, setShow] = useState(false);
    const [formData, setFormData] =useState({
        first_name:'',
        last_name:'',
        email:'',
        avatar:''
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        axios.get('http://localhost:4000/user')
            .then(res => setUser(res.data))
            .catch(error => console.error(error))

    }, [])

    const handleSubmit = () =>{
        axios.post('http://localhost:4000/user',formData)
        .then(res => setUser([...user,formData]))
            .catch(error => console.error(error))
        setShow(false);
    }
    return (
        <Container style={{ textAlign: 'right', marginTop: '10px' }}>
            <div>
                <Button variant="dark" onClick={handleShow}>Add New User</Button>
            </div>

            <Row>
                {user.map((users) => (
                    <Col style={{ marginTop: '10px ' }}>
                        <Card style={{ width: '18rem', margin: 'auto' }}>
                            <Card.Img variant="top" src={users.avatar} />
                            <Card.Body>
                                <Card.Title>{users.first_name} {users.last_name}</Card.Title>
                                <Card.Text>
                                    {users.email}
                                </Card.Text>
                                <Button variant="dark">Connect</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}


            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate  >
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    onInput={(e)=> setFormData({
                                        ...formData,
                                        first_name: e.target.value
                                    })}
                                  
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    onInput={(e)=> setFormData({
                                        ...formData,
                                        last_name: e.target.value
                                    })}
                                    
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onInput={(e)=> setFormData({
                                            ...formData,
                                           email: e.target.value
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter a Valid Email
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationAvatar">
                                <Form.Label>Avatar Url</Form.Label>
                                <InputGroup hasValidation>
                                 
                                    <Form.Control
                                        type="text"
                                        placeholder="Avatar URL"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onInput={(e)=> setFormData({
                                            ...formData,
                                           avatar: e.target.value
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid Avatar URL
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}
export default User