import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div>
        <Auth type="signup"></Auth>
      </div>
      <div className="hidden lg:block">
        {" "}
        <Quote></Quote>
      </div>
    </div>
  );
};

export default Signup;
