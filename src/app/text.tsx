// "use client";

// import { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Polyline,
//   Popup,
//   Marker,
//   useMap,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-rotatedmarker";
// import axios from "axios";
// import Form from "../Form/Form";
// import { geocodeLocation } from "@/app/lib/utils/geoCodeLocation/geoCodeLocation";
// import Logo from "../Logo/Logo";
// import Image from "next/image";

// declare module "leaflet" {
//   interface Marker {
//     setRotationAngle(angle: number): void;
//     setRotationOrigin(origin: string): void;
//   }
// }

// // custom icon as marker
// const carIcon = new L.Icon({
//   iconUrl: "/images/car-icon.svg",
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40],
// });

// const CenterMap = ({ center }: { center: [number, number] }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center);
//   }, [center, map]);
//   return null;
// };

// const Test = () => {
//   const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
//     []
//   );
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [origin, setOrigin] = useState<[number, number]>([35.6892, 51.389]);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [destination, setDestination] = useState<[number, number]>([
//     35.715, 51.405,
//   ]);
//   const [marker, setMarker] = useState<L.Marker | null>(null);
//   const [routeDistance, setRouteDistance] = useState<number | null>(null);

//   // fetch route using coordinates
//   const fetchRoute = async (
//     origin: [number, number],
//     destination: [number, number]
//   ) => {
//     try {
//       const response = await axios.get(
//         `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
//       );

//       if (response.data.routes && response.data.routes.length > 0) {
//         const coordinates = response.data.routes[0].geometry.coordinates;
//         const distanceInMeters = response.data.routes[0].distance;
//         const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);

//         setRouteCoordinates(
//           coordinates.map((coord: [number, number]) => [coord[1], coord[0]])
//         );
//         setRouteDistance(parseFloat(distanceInKilometers));
//         setCurrentIndex(0);
//       }
//     } catch (error) {
//       console.error("Error fetching route:", error);
//       alert("خطا در دریافت مسیر. لطفا دوباره تلاش کنید.");
//     }
//   };

//   // marker rotation
//   const rotateMarker = (marker: L.Marker, angle: number) => {
//     if (marker) {
//       marker.setRotationAngle(angle);
//     }
//   };

//   // simulate car move
//   useEffect(() => {
//     if (routeCoordinates.length > 0 && marker) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) => {
//           if (prev < routeCoordinates.length - 1) {
//             const nextIndex = prev + 1;
//             const currentPoint = routeCoordinates[prev];
//             const nextPoint = routeCoordinates[nextIndex];

//             const angle =
//               (Math.atan2(
//                 nextPoint[1] - currentPoint[1],
//                 nextPoint[0] - currentPoint[0]
//               ) *
//                 180) /
//               Math.PI;
//             rotateMarker(marker, angle);

//             return nextIndex;
//           } else {
//             clearInterval(interval);
//             return prev;
//           }
//         });
//       }, 500);

//       return () => clearInterval(interval);
//     }
//   }, [routeCoordinates, marker]);

//   // calculate coordinate and route from form inputs
//   const handleSearch = async ({
//     origin,
//     destination,
//   }: {
//     origin: string;
//     destination: string;
//   }) => {
//     try {
//       const originCoords = await geocodeLocation(origin);
//       const destinationCoords = await geocodeLocation(destination);

//       setRouteDistance(null);
//       setOrigin(originCoords);
//       setDestination(destinationCoords);
//       fetchRoute(originCoords, destinationCoords);
//     } catch (error) {
//       console.log("Error geocoding location:", error);
//       alert("خطا در دریافت مختصات مبدا یا مقصد");
//     }
//   };

//   const currentPosition = routeCoordinates[currentIndex];

//   return (
//     <section className="custom-container py-4 flex flex-col gap-x-4 gap-y-8 bg-white rounded-xl my-4 lg:flex-row">
//       <div className="w-full bg-white flex flex-col items-center justify-between gap-8 lg:w-1/2">
//         {/* logo */}
//         <div className="">
//           <div className="relative w-20 h-20 mx-auto">
//             <Logo bg={false} />
//           </div>
//           <h1 className="text-xl text-primary-dark -mt-2">
//             شرکت داده پردازی نوین
//           </h1>
//         </div>
//         {/* Form */}
//         <Form onSearch={handleSearch} />
//         {/* wavy shape */}
//         <div className="relative w-full h-44 hidden lg:block">
//           <Image
//             src={"/images/wavy-shape.svg"}
//             alt="wavy-image"
//             fill
//             style={{
//               objectFit: "cover",
//             }}
//           />
//         </div>
//       </div>
//       {/* Map view */}
//       <div className="relative min-h-100 w-full overflow-hidden lg:w-1/2 lg:min-h-120">
//         {routeDistance !== null && (
//           <div className="flex-center bg-primary-dark text-white p-1 absolute z-[2] left-0 bottom-0 text-sm rounded fade-in">
//             <strong className="ml-0.5">مسافت مسیر : </strong> {routeDistance}{" "}
//             کیلومتر
//           </div>
//         )}
//         <MapContainer
//           center={origin}
//           zoom={13}
//           style={{
//             height: "100%",
//             width: "100%",
//             minHeight: "400px",
//             borderRadius: "12px",
//           }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {currentPosition && (
//             <>
//               <Marker
//                 position={currentPosition}
//                 icon={carIcon}
//                 ref={(ref) => {
//                   if (ref) {
//                     setMarker(ref);
//                   }
//                 }}
//               >
//                 <Popup>خودرو</Popup>
//               </Marker>
//               <CenterMap center={currentPosition} />
//             </>
//           )}
//           {routeCoordinates.length > 0 && (
//             <Polyline positions={routeCoordinates} color="#6c9b8b" />
//           )}
//         </MapContainer>
//       </div>
//     </section>
//   );
// };

// export default Test;
