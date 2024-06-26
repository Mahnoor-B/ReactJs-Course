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
import { addComment, fetchComments, fetchDishes, fetchPromos } from '../redux/actionCreators';
import {actions } from 'react-redux-form'

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
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},

})

class Main extends Component {

  constructor (props){
    super(props)
  }
componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
}

onDishSelect(dishId){
    this.setState({ selectedDish: dishId})
}

  render (){

    const HomePage =()=> {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId=({match})=>{
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        addComment={this.props.addComment}
      />
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
          <Route exact path="/contactus" component={ () => <Contact resetFeedbackForm ={this.props.resetFeedbackForm}/>}/>
          <Redirect to="/home}"/>
        </Switch>

        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null)(Main));
