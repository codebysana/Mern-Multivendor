import React, { use } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full">
      {active === 1 && (
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              src={`${backend_url}${user.avatar}`}
              className="w-[150px] h-[150px] rounded-full objec-cover border-[3px] border-[#3ad132]"
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <AiOutlineCamera />
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5"></div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
