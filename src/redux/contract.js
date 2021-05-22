import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  load: false,
  web3Load:false,
  address:'0x',
  toasts:0,  
  toastsData:{
    id: 0,
    title: 0,
    description:0,
    type: 0
  }

};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'contract/fetchCount',
  async (amount) => {
    // The value we return becomes the `fulfilled` action payload
    return ;
  }
);

export const counterSlice = createSlice({
  name: 'contract',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoad: (state,action) => {    
        if(process.env.NODE_ENV=='development')
        console.log('setLoad')
      state.load = action.payload
    },    
    setWeb3Load: (state,action) => {      
        state.web3Load = action.payload
      },
    addToasts:(state,action) => {          
        const now = Date.now();    
        const randomToast = {
            id: `id-${now}`,
            title: action.payload.title,
            description:action.payload.description,
            type: action.payload.type
          };
        state.toastsData =randomToast
        state.toasts += 1
       },
       setAddress:(state,action) => {      
        state.address = action.payload
      },
    
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  /*extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
//        state.value += action.payload;
      });
  },*/
});

export const { setAddress,setLoad,setWeb3Load,addToasts } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
 //   dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;