import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/style";
import { RiGalleryFill } from "react-icons/ri";

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-seller-conversation/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All Messages List */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
              />
            ))}
        </>
      )}
      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen();
  };
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={() => setActive(index) || handleClick(data._id)}
    >
      <div className="relative">
        <img
          src="../../../public/avatar-pic.jpg"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
      </div>
      <div className="pl-3">
        <h1 className="pl-3 text-[18px]">Sana Y.</h1>
        <p className="text-[16px] text-[#000c]">You: Yeah, I am good...</p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col">
      {/* Message header */}
      <div className="w-full flex p-3 justify-center items-between bg-slate-200">
        <div className="flex">
          <img
            src="../../../public/avatar-pic.jpg"
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Sana Y.</h1>
            <h1>Active Now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        <div className="w-full flex my-2">
          <img
            src="../../../public/avatar-pic.jpg"
            alt=""
            className="w-[40px] h-[40px] rounded-full mr-3"
          />
          <div className="w-max rounded bg-[#38c776] text-white h-min p-2">
            <p>Hello there!</p>
          </div>
        </div>
        <div className="w-full flex justify-end my-2">
          <div className="w-max rounded bg-[#38c776] text-white h-min p-2">
            <p>Hi!</p>
          </div>
        </div>
      </div>
      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex items-center justify-between"
      >
        <div className="w-[3%]">
          <RiGalleryFill className="cursor-pointer" size={20} />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
