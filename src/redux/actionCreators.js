import * as ActionTypes from './actionsTypes';
import { basesUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES))
    // },2000)
    return fetch(basesUrl + 'dishes')
    .then(response => response.json ()
    .then(dishes => dispatch(addDishes(dishes))) )
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments = () => (dispatch) => {

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES))
    // },2000)
    return fetch(basesUrl + 'comments')
    .then(response => response.json ()
    .then(comments => dispatch(addComments(comments))) )
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchPromos = () => (dispatch) => {

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES))
    // },2000)
    return fetch(basesUrl + 'promotions')
    .then(response => response.json ()
    .then(promos => dispatch(addPromos(promos))) )
}

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})