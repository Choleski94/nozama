import { Link } from "react-router-dom"


export const AddressSection = ()=>{
    return(
        <>
            <div className="noz-checkout-address py-3 border-bottom">
               <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <h4 className="bold-text px-3">1</h4>
                        <h4 className="bold-text px-3">Delivery address</h4>
                        <div className="normal-text px-5">
                            <span className="noz-fs-14">
                                Aashish Kumar <br />
                                132, L Street, <br />
                                Kingston <br />
                                New York 12401 <br />
                                USA <br />
                            </span>
                            <Link to="" className="noz-link">Add delivery instructions</Link>
                        </div>
                    </div>
                    <Link to="" className="noz-link">Change</Link>
               </div> 
            </div>
        </>
    )
}
