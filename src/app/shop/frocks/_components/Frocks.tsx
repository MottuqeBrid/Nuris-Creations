"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Frock {
  _id: string;
  image: string;
}

export default function Frocks() {
  const [frocks, setFrocks] = useState<Frock[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchFrocks = async () => {
    try {
      const response = await fetch("/api/products?category=Frock");
      const data = await response.json();
      if (data.success) {
        setFrocks(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch frocks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFrocks();
  }, []);
  if (loading) {
    return <div>Loading frocks...</div>;
  }
  return (
    <div>
      <p>Total Frocks: {frocks.length}</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {frocks.map((frock: Frock) => (
          <div key={frock._id} className="w-full h-full flex flex-col">
            <div className="hover-3d cursor-pointer w-full h-2/3">
              {/* content */}
              {/* <div className="card w-full h-full bg-black text-primary bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
                <div className="card-body">
                  <div className="flex justify-between mb-10">
                    <div className="font-bold">BANK OF LATVERIA</div>
                    <div className="text-5xl opacity-10">❁</div>
                  </div>
                  <div className="text-lg mb-4 opacity-40">
                    0210 8820 1150 0222
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs opacity-20">CARD HOLDER</div>
                      <div>VICTOR VON D.</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-20">EXPIRES</div>
                      <div>29/08</div>
                    </div>
                  </div>
                </div>
              </div> */}
              <figure className="w-full relative object-cover h-full rounded-2xl">
                <Image
                  width={400}
                  height={400}
                  // src="https://img.daisyui.com/images/stock/card-1.webp?x"
                  src={frock.image}
                  alt="Tailwind CSS 3D card"
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* 8 empty divs needed for the 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="h-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
