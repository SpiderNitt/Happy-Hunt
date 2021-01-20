import { useEffect } from "react";

const useScript = (url, classElement, attribute) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.setAttribute(attribute.key, attribute.value);
    document.getElementsByClassName(classElement)[0].appendChild(script);

    // return () => {
    //   document.getElementsByClassName(classElement)[0].removeChild(script);
    // };
  }, [attribute.key, attribute.value, classElement, url]);
};

export default useScript;
