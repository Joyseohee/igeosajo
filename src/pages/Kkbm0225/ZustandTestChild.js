import testStore from "services/store/zustand/test";
import shallow from "zustand/shallow";

const ZustandTestChild = () => {
    const [
        number, name
    ] = testStore( state => [
        state.number, state.name
    ], shallow)

  return (
      <div>
          숫자: {number}<br/>
          이름: {name} <br/>
      </div>
  )
}

export default ZustandTestChild;