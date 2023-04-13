import React, { useState, useEffect, useContext } from "react";
// import { ColorRing } from "react-loader-spinner";
import { KeyedButton } from "../buttons/Buttons";
import { useParams } from "react-router-dom";
import AuthContext from "../authContext/AuthContext";
import { Navigate } from "react-router-dom";
import { getCustomerProfileAxios } from "../../api/api";
import LoadingSpinner from "../LoadingSpinner";

const spinner = LoadingSpinner();

function CustomerProfile() {
  const { isLoggedIn } = useContext(AuthContext);

  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }

    const fetchCustomerData = async () => {
      try {
        const res = await getCustomerProfileAxios(customerId);
        if (res.data.authed) {
          console.log("in authed");
          setCustomerData(res.data.result);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerData();
  }, [customerId, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate replace to={`/`} />;
  }

  return (
    <>
      <main className="bg-white m-6">
        <section id="all-products" className="drop-shadow-2xl pb-12 px-12 ">
          <h2
            className="
          text-5xl font-bold text-redBrown
           pb-12
          "
          >
            {customerData && customerData.username}
          </h2>

          {isLoading ? spinner : null}

          <div className="card lg:card-side bg-gray-200 shadow-xl">
          <div className="grid grid-cols-[150px_1fr] gap-2">
                <div className="text-lg font-medium">Username:</div>
                <div className="text-xl font-bold" > {customerData && customerData.username}</div>
                <div className="text-lg font-medium">First Name: </div>
                <div className="text-xl font-bold">{customerData && customerData.firstName}</div>
                <div className="text-lg font-medium">Last Name:</div>
                <div className="text-xl font-bold" >{customerData && customerData.lastName}</div>
                <div className="text-lg font-medium"assName="text-xl font-bold">Email:</div>
                <div className="text-xl font-bold" > {customerData && customerData.email}</div>
                <div className="text-lg font-medium">Phone:</div>
                <div className="text-xl font-bold" > {customerData && customerData.phone}</div>
              </div>
            <div className="card-body grid w-full justify-center ">
              <h2 className="card-title">Your Cart</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">CheckOut</button>
              </div>
            </div>
          </div>
          <div
            id="profile-grid"
            className="
              max-w-full
              grid gap-4
              grid-cols-1 sm:grid-cols-2 
              border
          "
          >
            <div id="profile-data" className="text-left border">
              <div className="grid grid-cols-[150px_1fr] gap-2">
                <div className="text-xl font-bold">Username:</div>
                <div> {customerData && customerData.username}</div>
                <div className="text-xl font-bold">First Name: </div>
                <div>{customerData && customerData.firstName}</div>
                <div className="text-xl font-bold">Last Name:</div>
                <div>{customerData && customerData.lastName}</div>
                <div className="text-xl font-bold">Email:</div>
                <div> {customerData && customerData.email}</div>
                <div className="text-xl font-bold">Phone:</div>
                <div> {customerData && customerData.phone}</div>
              </div>
            </div>
            <div id="cart-data"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerProfile;
