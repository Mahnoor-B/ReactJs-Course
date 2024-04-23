//import logo from './logo.svg';
import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent'
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import Header from './HeaderComponennt';
import Footer from './FooterComponent';
import {Switch, Redirect, Route, withRouter } from 'react-router-dom'
import DishDetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/actionCreators';

const mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishID, rating, author, comment) => dispatch(addComment(dishID, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
})

class Main extends Component {
  constructor(props){

    super(props);
  
}

componentDidMount() {
  this.props.fetchDishes();
}

onDishSelect(dishId){
    this.setState({ selectedDish: dishId})
}

  render (){

    const HomePage =()=> {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
        dishesLoading= {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errmess}
        promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
        leader={this.props.leaders.filter((leader)=> leader.featured)[0]}/>
      )
    }

    const DishWithId=({match})=>{
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading= {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errmess}
        comments ={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
          addComment= {this.props.addComment}>
        </DishDetail>
      )
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path = "/home" component= {HomePage}/>
          <Route path ="/aboutus" component ={()=><About leaders={this.props.leaders}/>}/>
          <Route exact path ="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route exact path='/menu/:dishId' component={DishWithId}/>
          <Route exact path="/contactus" component={ Contact}/>
          <Redirect to="/home}"/>
        </Switch>

        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
