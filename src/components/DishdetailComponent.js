import React, { Component } from "react";
import {Card, CardImg,CardText, CardBody, CardTitle} from 'reactstrap'
import { Link } from "react-router-dom";

import CommentForm from "./CommentFormComponent";

import { Breadcrumb,BreadcrumbItem } from "reactstrap";
import {Loading} from './LoadingComponent'
import { basesUrl } from "../shared/baseUrl";

function  RenderDish({dish}){
        if(dish!=null){
            return (
                <div>
                    <Card>
                        <CardImg width="100%" src={basesUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card> 
                </div>
        )}
        else {
            return (
                <div></div>
            )
        }
    }

function RenderComments({comments, addComment, dishId}){
    console.log("comments", comments)
        if(comments!=null){
            return(
                <div>
                    <h4>Comments</h4>
                    {comments.map((comment)=> {
                console.log("inside comment",comment)
                return (
                        <div >
                        <uli key={comment.id}>
                            <p> {comment.comment}</p>
                            <p> -- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </uli>
                        </div>
                )})}
                <CommentForm dishId ={dishId} addComment={addComment}></CommentForm>
                </div>
        )}
        else {
            return (
                <div></div>
            )
        }
    }

    class DishDetail extends Component {
        constructor(props){
            super(props)
        }
        render(){
            if(this.props.isLoading){
                return (
                    <div className="container">
                        <div className="row">
                            <Loading/>
                        </div>
                    </div>
                )
            }
    
            else if(this.props.errMess){
                return(
                    <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
                )
            }

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        {/* <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem> */}
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row"> 
                        <div className="col-12 col-md-5 mt-2">
                            <RenderDish dish ={this.props.dish}/>
                        </div>  
                        <div className="col-12 col-md-5 mt-2">
                            <RenderComments comments = {this.props.comments}
                                addComment = {this.props.addComment}
                                dishId = {this.props.dish.id}/> 
                            {/* <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-pencil fa-lg"></span> Submit Comment
                             </Button> */}
                            {/* <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                                <CommentForm dishId ={this.props.dishId} addComment={addComment}></CommentForm>
                            </Modal>         */}
                        </div>                 
                    </div>
                </div>
        )}
    }

export default DishDetail;