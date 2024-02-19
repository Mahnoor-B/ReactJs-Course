import React, {Component} from "react";
import {Card, CardImg,CardText, CardBody, CardTitle} from 'reactstrap'
import { DISHES } from "../shared/dishes";

class DishDetail extends Component{

    constructor(props){
        super(props)

        this.state = {
            dish : this.props.dishSelected,
        }
    }

    renderDish(dish){
        if(dish!=null){

            return (
                    <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card> 
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    render(){
        const comments = this.state.dish.comments.map((comments) => {
            return (
                    <uli>
                        <p> {comments.comment}</p>
                        <p> -- {comments.author} , {comments.date}</p>
                    </uli>
            );
        })
        return (
            <div className="container">
                <div className="row"> 
                    <div className="col-12 col-md-5 mt-2">
                        {this.renderDish(this.state.dish)}
                    </div>
                    <div className="col-12 col-md-5 mt-2">
                        <h4>Comments</h4>
                    {   comments}
                    </div>
                   
                </div>
            </div>
        )
    }
}

export default DishDetail;