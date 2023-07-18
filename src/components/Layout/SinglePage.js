import CommonLUXComponent from "../LUXComponents";

const SinglePage = ({children}) => {
    return (
        <div className="snbnext">
            <div className="container">
                <div className="containerin">
                    <div className="content">
                        {children}
                    </div>
                    <CommonLUXComponent/>
                </div>
            </div>
        </div>
    )
}

export default SinglePage;