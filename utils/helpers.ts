import Cookies from "js-cookie";

export const showTagColor = (name: string) => {
  if (name === "APPROVED") {
    return "green";
  } else if (name === "PENDING") {
    return "blue";
  } else if (name === "REJECTED") {
    return "red";
  } else {
    return "blue";
  }
};

export const imageFullPath = (
  imageUrl: string | undefined,
  placeholderImage: string
) => {
  return imageUrl
    ? process.env.NEXT_PUBLIC_BASE_URL + "/" + imageUrl
    : placeholderImage;
};

export const getTextCapitilize = (str: string) => {
  if (!str) return;
  const lowerCase = str.toLowerCase();
  return lowerCase?.charAt(0).toUpperCase() + lowerCase?.slice(1);
};

export const getInitials = () => {
  const fullName = Cookies.get("user");
  if (!fullName) return;
  const nameArray = fullName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[nameArray.length - 1];
  const initials = firstName.charAt(0) + lastName.charAt(0);
  return initials.toUpperCase();
};

export const getDefaultOpenKeys = (pathname: string) => {
  if (pathname.includes("payroll")) {
    return ["Payroll"];
  }
  return [];
};

export const truncateText = (text: string) => {
  if (text.length > 12) {
    return text.substring(0, 12) + "...";
  } else {
    return text;
  }
};

export function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
