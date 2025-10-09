import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/orderAction";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/userAction";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankAccountHolderName: "",
    bankAccountAddress: "",
  });
  const { seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (seller && seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankAccountHolderName: bankInfo.bankAccountHolderName,
      bankAccountAddress: bankInfo.bankAccountAddress,
    };
    setPaymentMethod(false);

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Withdraw method added successfully");
        dispatch(loadSeller());

        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankAccountHolderName: "",
          bankAccountAddress: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data?.message);
      });
  };
  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully");
        dispatch(loadSeller());
      });
  };
  const error = () => {
    toast.error("You don't have enough balance to withdraw");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("withdraw amount request is successfully submitted!");
        });
    }
  };
  const availableBalance = seller?.availableBalance.toFixed(2);
  return (
    <div className="w-full h-[90vh] p-8 m-5">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full fixed z-[9999] top-0 left-0 flex items-center justify-center bg-[#0000004e] p-5">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            }  min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add New Withdraw Methods:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Enter your Bank Name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <br />
                  <div className="pt-2">
                    <label>
                      Bank Country
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Country"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <br />
                  <div className="pt-2">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Swift Code"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <br />
                  <div className="pt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Account Number"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <br />
                  <div className="pt-2">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAccountHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountHolderName: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Holder Name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <br />
                  <div className="pt-2">
                    <label>
                      Bank Address
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAccountAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountAddress: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Address"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${styles.button} text-[#fff] mb-3`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdraw Methods:
                </h3>
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex flex-col w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: $ {availableBalance}</h4>
                    <br />
                    <div className="flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-full border 800px:mr-3 p-2 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[42px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[16px] pt-2">
                      No Withdraw Methods Saved!
                    </p>
                    <div className="w-full flex items-center jusify-center">
                      <div
                        className={`${styles.button} text-[#fff] text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add New
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
