import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader} from 'reactstrap';
import {Col, Row} from 'reactstrap'
import { Control, Errors, LocalForm } from 'react-redux-form';

const required = (val) =>val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props)
            this.state = {
                isModalOpen: false
            }
    
            this.toggleModal = this.toggleModal.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
              isModalOpen : !this.state.isModalOpen
              })
    }

    handleSubmit(values){
        console.log("Current state is : " +JSON.stringify(values));
        alert("Current state is: " +JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.yourname, values.message)
        this.toggleModal()
    }

    render(){
        return (
            <div className="col-12 col-md-5">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Submit Commennt</ModalHeader>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={{size:6, offset:1}}>Ratings</Label>
                                    <Col md={{size: 10, offset: 1}}>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="lastname" md={{size:6, offset:1}}>Your Name</Label>
                                    <Col md={{size: 10, offset:1}}>
                                        <Control.text model=".yourname" id="name" name="name"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength:minLength(3), 
                                                maxLength: maxLength(15)
                                            }}
                                            />
                                            <Errors className='text-danger'
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}>
                                                
                                            </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={{size: 6, offset: 1}}>Comment</Label>
                                    <Col md={{size: 10, offset: 1}}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="12"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10, offset: 1}} mt={2}>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                            </Modal>
                    </div>
        )
    }
}

export default CommentForm;