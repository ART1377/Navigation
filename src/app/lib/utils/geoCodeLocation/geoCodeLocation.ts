import axios from "axios";

// convert location name to coordinate
export const geocodeLocation = async (
  location: string
): Promise<[number, number]> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return [parseFloat(lat), parseFloat(lon)];
    } else {
      throw new Error("مکان یافت نشد");
    }
  } catch (error) {
    console.log("Error geocoding location:", error);
    throw new Error(
      "خطا در یافتن مکان. لطفا ورودی را بررسی کرده و دوباره تلاش کنید."
    );
  }
};
