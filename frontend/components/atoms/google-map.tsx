"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const center = useMemo(
    () => ({ lat: 14.655532617560985, lng: 121.01135792602594 }),
    []
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="h-[400px] w-full rounded-lg"
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
