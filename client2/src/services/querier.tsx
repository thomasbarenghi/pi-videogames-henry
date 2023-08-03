"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { getGames } from "@/redux/slices/client/games";
type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === "/games") {
      dispatch(getGames());
    }
  }, [pathname, dispatch]);

  return <div>{children}</div>;
}
