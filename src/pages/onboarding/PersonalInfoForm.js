import Input from "../../components/Input";
import { PrimaryButton } from "../../components/Button";

export default function PersonalInfoForm(props) {
    const { nextStep } = props;

    return (
        <div className="flex flex-col py-10 px-5 w-2/3 mx-auto">
            <span className="text-xl mb-5 font-semibold">Personal Info</span>

            <form className="flex flex-col">
                <div className="grid grid-cols-2 gap-5">
                    <Input label="Full Name" className="col-span-2" />
                    <Input label="Email" className="col-span-2" />
                    <Input label="Mobile Number" />
                    <Input label="Birth Date" type="date" />
                </div>

                <PrimaryButton type="button" onClick={nextStep} className="ml-auto mt-20">
                    Next
                </PrimaryButton>
            </form>
        </div>
    );
}
