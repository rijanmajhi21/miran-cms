import { FunctionComponent } from "react";

const FooterBottom: FunctionComponent = () => {
  return (
    <div className="mt-14 pt-8 border-t border-pure-white/10">
      <p className="text-body-small text-neutral-disabled text-center select-none">
        &copy; {new Date().getFullYear()} Miran Photography. All rights
        reserved.
      </p>
    </div>
  );
};

export default FooterBottom;
