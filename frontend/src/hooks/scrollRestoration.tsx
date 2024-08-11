import { useEffect } from "react";

const useScrollRestoration = () => {
  useEffect(() => {
    const historyState = window.history.state || {};

    console.log("scroll hook triggered!");
    if (historyState.scrollY) {
      window.scrollTo(0, historyState.scrollY);
    }

    const saveScrollPosition = () => {
      const scrollY = window.scrollY;
      console.log("saved!");
      window.history.replaceState({ scrollY }, "");
    };

    window.addEventListener("scroll", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);
};

export default useScrollRestoration;
