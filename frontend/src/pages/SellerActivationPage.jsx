/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

function SellerActivationPage() {
  const { activationToken } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, {
            activationToken,
          });
          console.log(res.data?.message);
        } catch (error) {
          console.log(error.response.data?.message);
          setError(true);
        }
      };
      activationEmail;
      //   sendRequest();
    }
  }, []);
  return (
    <div
      style={{
        widh: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
}

export default SellerActivationPage;
// admin123