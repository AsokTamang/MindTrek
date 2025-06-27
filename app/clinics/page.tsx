"use client"
import axios from "axios";
import Link from "next/link";
import React from "react";

interface collectionType {
  image: string ;
  name: string;
  address: string;
  website: string;
}

export default function Clinics() {
  const [collection, setCollection] = React.useState<collectionType[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      const res = await axios.get('/api/scraper');
      const { success, data, message } = await res.data;
      if (success) {
        setCollection(data);
        console.log(message);
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full  px-4 py-8">
      {collection.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.map((item, index) => (
            <div
              key={index}
              className=" rounded-2xl shadow-md p-4 flex flex-col items-center space-y-4 transition hover:shadow-lg"
            >
              <img
                src={item.image!}
                alt={item.name}
                className="h-32 w-32 object-cover rounded-md border"
              />
              <ul className="text-center text-sm  space-y-1">
                <li className="font-semibold text-lg">{item.name}</li>
                <li>{item.address}</li>
              </ul>
              <Link
                href={item.website}
                target="_blank"
                className="text-blue-600 hover:underline text-sm break-all"
              >
                {item.website}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center  text-lg">Loading...</div>
      )}
    </div>
  );
}
