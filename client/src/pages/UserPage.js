import './UserPage.css';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function UserPage(){

    const [likedRecipe, setLike] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [openModal, setOpenModal] = useState();
    const [search, setSearch] = useState("");

    const getLikes = async () => {

        const URL = "https://www.cop4331groupfifteen.xyz/api/loadlikes";
        var userID = localStorage.getItem("usernameID");
        const body = JSON.stringify({userID: userID});

        try{
            const response = await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                	'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            //console.log(data);
            setLike(data.recipes); 
        } catch(error){
            console.log(error);
        }
    }

    const getIngredients = (ingredientList) => {
        setIngredients(ingredientList);
    }

    const getInstructions = (instructionList) => {
        setInstructions(instructionList);
    }

    useEffect(() => {
        getLikes();
    }, []);

    const onDislike = async (e, id) =>{
        e.stopPropagation();

        var userID = localStorage.getItem("usernameID");
        console.log(userID);
        var recipeID = id;

        const URL = "https://www.cop4331groupfifteen.xyz/api/deletelikes";
        const body = JSON.stringify({userID: userID, recipeID: recipeID});

        try{
            await fetch(URL, {
                method: "POST",
                body: body,
                headers: {
                	'Content-Type': 'application/json'
                },
            }).then(
                async(response) => {
                    var warn = document.getElementById("errorMessage");

                    if(response.status === 200){
                        const json = await response.json();
                        console.log(json);
                        warn.innerHTML = "You successfully dislike this recipe :)";
                        console.log("Successfully deleted like");
                        getLikes();
                    }
                }
            )
        } catch (error){
            console.log(error);
        };
    }

    const handleInput = (event) => {
        setSearch(event.target.value);
    }

    const onLikeSearch = async() => {

        const URL = "http://localhost:3001/api/searchlikes";
        const userID = localStorage.getItem("usernameID");
        const body = JSON.stringify({userID: userID, recipeName: search});

        console.log(userID, search);
        
        try{
            await fetch(URL, {
                method: "POST",
                body: body,
                headers: {
                	'Content-Type': 'application/json'
                },
            }).then(
                async(response) => {

                    if(response.status === 200){
                        const json = await response.json();
                        console.log(json.recipes);
                        setLike(json.recipes);
                    }
                }
            )
        } catch (error){
            console.log(error);
        };

    }
    
    const onLogout = async() => {
        //console.log(localStorage.getItem("usernameID"));
        localStorage.removeItem("usernameID");
        //console.log(localStorage.getItem("usernameID"));
        window.location.href = "http://localhost:3000"
    }


    return (
        <div>
            <Navbar expand="lg" className="navbar" sticky='top'>
                <Container >
                <Navbar.Brand className='navBrand'>
                    UnderCooked
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/" className='home'>HOME</Nav.Link>
                    <Nav.Link as={Link} to="/recipe" className='recipes'>RECIPES</Nav.Link>
                    <Nav.Link as={Link} to="/user" className='likes'>LIKES</Nav.Link>
                    <Nav.Link className='logout' onClick={() => {onLogout()}}>LOGOUT</Nav.Link>
                    {/*<Nav.Link as={Link} to="/login">LOGIN</Nav.Link>*/}
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='topText'>
                <h2 className='bigText'>Your selection of liked recipes</h2>
            </div>

            <div className='lrTextWrap'>
                <div id="textSearch">
                    <div className='lrText'>Liked Recipes
                        <Container className='mt-2'>
                            <Row>
                                <Col sm={4}>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2 rounded-pill"
                                            aria-label="Search"
                                            id="mySearch"
                                            value = {search}
                                            onChange = {handleInput}
                                        />
                                        <Button className='rounded-pill' variant='warning' onClick={() => {onLikeSearch()}}>Search</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                        <p id="errorMessage"></p>
                    </div>
                </div>
                
            </div>

            <Container className='lrCon'>
                <Row xs={2} md={3} lg={4} className="g-4">
                    {likedRecipe.map((like) => (
                        <Col className='lrCol'>
                        <Card className='flex-fill'>
                            <Card.Img variant="top" src={like.image} alt={like.recipeName}/>
                            <Card.Body>
                                <Card.Title>{like.recipeName}</Card.Title>
                                <Button variant="warning" className="vrButton" onClick={() => {setOpenModal(like._id); getIngredients(like.ingredients); getInstructions(like.instructions);}}>View Recipe</Button>
                                <Button variant='success' onClick={(event) => onDislike(event, like._id)}>
                                    Unlike
                                </Button>        
                                    <Modal
                                        show={openModal === like._id}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered>

                                        <Modal.Header>
                                            <Modal.Title id="contained-modal-title-vcenter">INGREDIENTS AND INSTRUCTIONS</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <p className="ingredient">Ingredients:</p>
                                            {ingredients.map((ingredient) => (
                                                <p>-{ingredient.ingredient}</p>
                                            ))}

                                            <p className="instruction">Instructions:</p>
                                            {instructions.map((instruction) => (
                                                <p>-{instruction.instruction}</p>
                                            ))}
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button onClick={() => setOpenModal(false)}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </Container>


        </div>
    );
}

export default UserPage;