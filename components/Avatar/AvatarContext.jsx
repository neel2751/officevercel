"use client";
import { useFetchQuery } from "@/hooks/use-query";
import { employeeDeatils } from "@/server/officeServer/officeEmployeeDetails";

const {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} = require("react");

// create a context
const AvatarContext = createContext();

// create a provider
const AvatarProvider = ({ slug, children }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(
    () =>
      localStorage.getItem("selectedAvatar") ||
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg"
  );
  const searchParams = slug;
  const queryKey = ["employeeDeatils", searchParams];
  const { data } = useFetchQuery({
    params: searchParams,
    fetchFn: employeeDeatils,
    queryKey,
    enabled: !!searchParams,
  });

  const { newData } = data || {};

  const memoData = useMemo(() => {
    return newData;
  }, [newData]); // ✅ only chnages when newData changes

  useEffect(() => {
    if (selectedAvatar) {
      localStorage.setItem("selectedAvatar", selectedAvatar);
    }
  }, [selectedAvatar]);

  return (
    <AvatarContext.Provider
      value={{ selectedAvatar, setSelectedAvatar, newData: memoData }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

// create a hook
const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
export { AvatarProvider, useAvatar };
