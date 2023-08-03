import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [pathname]);
  return null;
}

export default ScrollToTop;
