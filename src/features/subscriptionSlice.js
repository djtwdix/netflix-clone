import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    storeSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { storeSubscription } = subscriptionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSubscription = (state) => state.subscription.subscription;

export default subscriptionSlice.reducer;
