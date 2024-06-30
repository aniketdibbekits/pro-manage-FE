import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { LoginInput, PasswordInput, RegisterButton, LoginEmail } from "../../components";
import { useUpdateUserDetailsMutation } from "../../store/api/userProtectedApi";
import "./Settings.css";
import { setCredentials, logOut } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const {
    userInfo: { userName, userEmail },
  } = useSelector((state) => state.auth);

  const [inputVal, setInputVal] = useState({
    name: userName,
    email: userEmail,
    Oldpassword: "",
    newPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detailsUpdate] = useUpdateUserDetailsMutation();

  const submitHandler = async () => {
    try {
      const result = await detailsUpdate({
        name: inputVal.name,
        email: inputVal.email,
        currentPassword: inputVal.Oldpassword,
        newPassword: inputVal.newPassword,
      });
      if (result.error) {
        return toast.error(`${result.error.data.message}`);
      }
      dispatch(setCredentials(result.data));
      toast.success("Profile updated successfully");
      navigate("/login"); // Navigate to the login page after successful update
      dispatch(logOut()); // Logout user after updating profile
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="set-container headd">
      <h3>Settings</h3>
      <div className="set-inputContainer">
        <LoginInput
          name="name"
          value={inputVal.name}
          setValue={setInputVal}
          placeholder="name"
          type="text"
          icon="name"
        />
        <LoginEmail
          name="email"
          value={inputVal.email}
          setValue={setInputVal}
          placeholder="Email"
          type="email"
          icon="email"
        />
        <PasswordInput
          name="Oldpassword"
          value={inputVal.Oldpassword}
          setValue={setInputVal}
          placeholder="Old password"
          type="password"
          icon="password"
        />
        <PasswordInput
          name="newPassword"
          value={inputVal.newPassword}
          setValue={setInputVal}
          placeholder="New password"
          type="password"
          icon="password"
        />
      </div>
      <RegisterButton
        onclick={submitHandler}
        text="Update"
        color="#ffffff"
        border="none"
        bg="#17A2B8"
      />
    </div>
  );
};

export default SettingsPage;
