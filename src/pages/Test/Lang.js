import React from "react";
import { injectIntl } from 'react-intl';
const ids = ["employee_info", "employee_type", "department_name", "department_location"];
const Lang = ({intl}) => (
    <>
    <div style={{margin: 10}}>
        <h1>다국어 예시</h1>
       { ids.map(id=>(<span key={id} style={{padding: 20, fontWeight: "bold"}}>
           { intl.formatMessage({id}) }
        </span>)) } 
    </div>
    </>
);
export default injectIntl(Lang);