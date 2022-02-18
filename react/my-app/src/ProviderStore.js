import { forwardRef } from "react";
const List = forwardRef((props, ref) => {
  const storeListUpdate = () => {
    props.store.dispatch({
      type: "LIST_ADD",
      value: props.store.getState().list.list.length,
    });
    console.log(props.store.getState());
  };
  return (
    <div>
      <br />
      <br />
      <button ref={ref} onClick={() => storeListUpdate()}>
        更改store中的state list(+1)
      </button>
      {/* <button onClick={() => this.updatSubStore()}>
        更改store中的state list(-1)
      </button> */}
      更新后的数据：
      {props.store.getState().list.list.map((item) => {
        return <span key={item}> {item} </span>;
      })}
    </div>
  );
});
export default List;
