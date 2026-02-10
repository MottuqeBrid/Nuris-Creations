import Marquee from "react-fast-marquee";
import { BsCupHot } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { TbShirt } from "react-icons/tb";

export default function HomeMarquee() {
  const items = [
    { icon: BsCupHot, text: "Custom Mugs - Your Design, Your Way" },
    { icon: AiOutlineStar, text: "Premium Quality & Fast Delivery" },
    { icon: TbShirt, text: "Personalized T-Shirts - Express Yourself" },
    { icon: AiOutlineStar, text: "Perfect Gifts for Every Occasion" },
    {
      icon: MdOutlinePhoneIphone,
      text: "Unique Phone Cases - Protect in Style",
    },
    { icon: AiOutlineStar, text: "Limited Time Offers Available Now" },
  ];

  return (
    <div className="w-full bg-base-100 border-y border-[(--border-color)] py-4 sm:py-6 overflow-hidden">
      <Marquee gradient={false} speed={50} pauseOnHover={true} className="py-2">
        <div className="flex items-center gap-6 sm:gap-8 px-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0"
              >
                <Icon
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm sm:text-base font-semibold text-primary">
                  {item.text}
                </span>
                {index < items.length - 1 && (
                  <span className="text-[(--border-color)] mx-4 sm:mx-6">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Marquee>

      <style>{`
        .marquee {
          background: transparent;
        }

        .marquee-container {
          gap: 0;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          gap: 0;
        }
      `}</style>
    </div>
  );
}
