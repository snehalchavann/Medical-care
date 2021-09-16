export const initialState = {
  cart: [],
  user: null,
  selectedProduct: {},
  selectedItem: {}
};

export const getCartTotal = (cart) => {
  let amount = 0;
  if (cart && cart.length) {
    cart.forEach(item => {
      amount += +item.price || +item.starting_price
    });
  }
  return amount
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      localStorage.setItem('cartData', JSON.stringify([...state.cart, action.data]))
      return { ...state, cart: [...state.cart, action.data] };

    case "SELECTED_PRODUCT":
      return {
        ...state, selectedProduct: action.payload
      }
    case "SELECTED_ITEM":
      return {
        ...state, selectedItem: action.payload
      }

    case "REMOVE_FROM_CART":
      let newCart = [...state.cart];
      const index = state.cart.findIndex(
        (cartItem) => cartItem._id === action.id
      );
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Cant remove product`);
      }
      console.log(newCart, index)
      localStorage.setItem('cartData', JSON.stringify(newCart))
      return {
        ...state,
        cart: [...newCart],
      };

    default:
      return state;
  }
};

export default reducer;
