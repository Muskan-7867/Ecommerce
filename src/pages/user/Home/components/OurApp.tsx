import React from "react";

import MobileApp from "./MobileApp";
import ScreenHandler from "../../../../components/wrappers/ScreenHandler";
import PlaystoreButton from "../../../../../public/assets/googleplay.png";
import { Link } from "react-router-dom";


const OurApp: React.FC = () => {
  return (
    <ScreenHandler>
      <div className="h-auto my-12">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 md:order-1 order-2 flex flex-col justify-center items-center gap-5 md:px-24 px-4">
            <h1
              className="font-bold text-center md:text-5xl"
              style={{ fontSize: "clamp(1rem , 3.6vw, 4rem)" }}
            >
              DOWNLOAD <br /> OMEG BAZAAR NOW!!
            </h1>
            <p className="text-gray-500 sm:text-lg text-sm text-center">
              Just download Omeg Bazaar, make your first purchase <br />
              and boom—instant savings! 🎉
            </p>
            <div className="flex gap-2 justify-center">
              {/* Play Store Button */}
              <Link
                to="https://play.google.com/store/apps/details?id=com.omtel.omeg_bazaar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="sm:h-12 h-10 w-auto"
                  src={PlaystoreButton}
                  alt="Download on Playstore"
                />
              </Link>

            </div>
          </div>
          <div className="col-span-12 md:col-span-6 order-1 md:order-2 h-full">
            <MobileApp />
          </div>
        </div>
      </div>
    </ScreenHandler>
  );
};

export default OurApp;
