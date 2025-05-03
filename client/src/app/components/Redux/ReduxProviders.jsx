"use client";
import store from "@/app/store/store";
import { Provider } from "react-redux";
const ReduxProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProviders;
