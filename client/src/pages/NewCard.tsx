import React from "react";
import Onboarding from "../components/Onboarding";
import Success from "../components/Success";

const NewCard = () => {
  return (
    <>
      <Onboarding />
      {/* <Success title="Card Created Successfully" message="Your new card has been created." next="/dashboard" /> */}
    </>
  );
};

export default NewCard;
