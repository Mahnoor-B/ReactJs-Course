import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { Loading } from "./LoadingComponent";
import { basesUrl } from "../shared/baseUrl"

function RenderCard({item, isLoading, errmess}){
    console.log("Item name: ", item)
    if(isLoading) {
        return(
            <Loading/>
        )
    }
    else if (errmess){
        return(
            <h4>{errmess}</h4>
        )
    }
    else {
        return(
            <Card>
                <CardImg src={basesUrl + item.image} alt={item.name}></CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        )
    }
}

function Home(props){
    return(
        <div className="container">
            <div className="row align-item-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                     isLoading= {props.dishesLoading}
                     errmess = {props.dishErrMess}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                        isLoading= {props.promoLoading}
                        errmess = {props.promoErrMess}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}></RenderCard>
                </div>
            </div>
        </div>
    )
}

export default Home;