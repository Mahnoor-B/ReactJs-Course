import React from "react";
import {Card, CardImg,CardText, CardBody, CardTitle} from 'reactstrap'

function  RenderDish({dish}){
        if(dish!=null){
            return (
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
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

function RenderComments({dish}){
        if(dish!=null){
            return(
                <div>
                    <h4>Comments</h4>
                    {dish.comments.map((comment)=> {
                console.log("inside comment",comment)
                return (
                        <div >
                        <uli key={comment.id}>
                            <p> {comment.comment}</p>
                            <p> -- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </uli>
                        </div>
                )})}
                </div>
        )}
        else {
            return (
                <div></div>
            )
        }
    }

    const DishDetail = (props)=>{
        return (
            <div className="container">
                <div className="row"> 
                    <div className="col-12 col-md-5 mt-2">
                        <RenderDish dish ={props.dish}/>
                    </div>  
                    <div className="col-12 col-md-5 mt-2">
                        <RenderComments dish = {props.dish}/>                  
                    </div>                 
                </div>
            </div>
    )}


export default DishDetail;