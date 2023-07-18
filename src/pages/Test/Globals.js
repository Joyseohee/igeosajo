import React from "react";
import global from "../../global";

const Globals = () => {
   return ( <div style={{margin: 10}}>
        <h1>글로벌 변수 설정</h1>
        <h2>{process.env.REACT_APP_DEPLOY_TYPE}</h2>
        <ul>
            <li>wehago_url : {global.wehago_url}</li>
            <li>static_backend : {global.static_backend}</li>
            <li>wehago_backend : {global.wehago_backend}</li>
            <li>backendUrl_local : {global.backendUrl_local}</li>
        </ul>

    </div>
)};
export default Globals;