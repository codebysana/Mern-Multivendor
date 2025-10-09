/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

function SellerActivationPage() {
  const { activationToken } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${server}/shop/activation`,
            {
              activationToken,
            },
            { withCredentials: true }
          );
          toast.success("Seller account activated successfully!");
          setTimeout(() => {
            navigate("/login-shop");
          }, 2000);
          console.log(res.data?.message);
        } catch (error) {
          console.log(error.response.data?.message);
          setError(true);
        }
      };
      activationEmail();
      //   sendRequest();
    }
  }, [activationToken, navigate]);
  return (
    <div
      style={{
        widh: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold",
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
