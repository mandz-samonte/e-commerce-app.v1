import React from "react";
import StepWizard from "react-step-wizard";
import { AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";
import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import PersonalInfoForm from "./PersonalInfoForm";
import ShippingAddressForm from "./ShippingAddressForm";

function WelcomePage() {
    return (
        <div className="flex flex-col items-center py-10 w-2/3 mx-auto">
            <span className="font-semibold text-4xl mb-5">Welcome! [NAME]</span>
            <p className="text-center text-sm text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.
            </p>
            <PrimaryButton to="/" className="mt-20">
                Start Shopping
            </PrimaryButton>
        </div>
    );
}

function Navigation(props) {
    const { currentStep } = props;

    const Step = ({ children, active, done }) => (
        <div
            className={classNames("flex items-center flex-shrink-0 gap-x-2 text-gray-400", {
                "text-amber-500": done,
                "!text-black": active,
            })}
        >
            <div
                className={classNames(
                    "flex items-center justify-center rounded-full h-10 w-10 border border-gray-200 flex-shrink-0",
                    { "border-amber-500": done, "text-black": active }
                )}
            >
                <AiOutlineCheck />
            </div>
            <span>{children}</span>
        </div>
    );

    return (
        <div className="flex items-center gap-x-5 w-full">
            <Step active={currentStep === 1} done={currentStep > 1}>
                Personal Info
            </Step>
            <div className="w-full h-px bg-gray-300"></div>
            <Step active={currentStep === 2} done={currentStep > 2}>
                Shipping Address
            </Step>
            <div className="w-full h-px bg-gray-300"></div>
            <Step active={currentStep === 3} done={currentStep > 3}>
                Final
            </Step>
        </div>
    );
}

export default function Onboarding() {
    return (
        <div className="w-full max-w-screen-xl mx-auto py-10 h-full flex">
            <div style={{ minHeight: "600px" }} className="bg-white w-full  py-10">
                <StepWizard nav={<Navigation />} className="w-2/3 mx-auto">
                    <PersonalInfoForm />
                    <ShippingAddressForm />
                    <WelcomePage />
                </StepWizard>
            </div>
        </div>
    );
}
