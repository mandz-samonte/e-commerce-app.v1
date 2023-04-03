import React from "react";
import Input from "../../components/Input";
import { PrimaryButton, SecondaryButton } from "../../components/Button";

export default function ShippingAddressForm({ nextStep, previousStep }) {
    return (
        <div className="flex flex-col py-10 px-5 w-2/3 mx-auto">
            <span className="text-xl mb-5 font-semibold">Shipping Address</span>

            <form className="flex flex-col">
                <div className="grid grid-cols-2 gap-5">
                    <Input label="Address" className="col-span-2" />
                    <Input label="City / State" />
                    <Input label="Country" />
                    <Input label="Postal Code" />
                </div>

                <div className="flex items-center gap-x-5 mt-20 justify-end">
                    <SecondaryButton type="button" onClick={previousStep}>
                        Back
                    </SecondaryButton>
                    <PrimaryButton type="button" onClick={nextStep} className="">
                        Next
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
