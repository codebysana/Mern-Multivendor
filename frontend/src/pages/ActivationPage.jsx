/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

function ActivationPage() {
  const { token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${server}/user/activation`,
            {
              token,
            },
            { withCredentials: true }
          );
          toast.success("Account activated successfully!");
          setTimeout(() => {
            navigate("/login");
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
  }, [token, navigate]);
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

export default ActivationPage;
// admin123
