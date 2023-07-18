import testStore from "services/store/zustand/test";
import shallow from "zustand/shallow";

import ZustandTestChild from './ZustandTestChild';

const ZustandTest = () => {
    const [
        getName, increaseNumber
    ] = testStore(state => [
        state.getName, state.increaseNumber
    ], shallow);



    return (
        <div>
            <h2>Zustand 예시</h2>
            <button onClick={() => increaseNumber()}>숫자 +</button>&emsp;
            <button onClick={() => getName()}>이름 재조회</button>
            <ZustandTestChild/>
        </div>
    )
}

export default ZustandTest;