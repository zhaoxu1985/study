import Redux from "redux";

//action 构建函数

let sendAction = (value) => {
  console.log(value, 6);
  return {
    type: "send_add",
    ...value,
  };
};
export default {
  sendAction,
};
