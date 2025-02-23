import { useEffect, useState, useRef } from "react";

const Test = () => {
  const [isPassed, setIsPassed] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = targetRef.current.getBoundingClientRect();
      setIsPassed(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Kiểm tra ban đầu

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    console.log(isPassed);
  }, [isPassed]);
  return (
    <div>
      <div style={{ height: "100vh", background: "lightgray" }}>
        Lăn xuống để kiểm tra
      </div>
      <div style={{ height: "100vh", background: "lightgray" }}>
        Lăn xuống để kiểm tra
      </div>
      <div  className={`${isPassed ? "fixed bottom-0 w-full left-0" : ""}`} style={{ height: "100px", background: "yellow" }}>
        Vị trí cần theo dõi
      </div>
      <div ref={targetRef}>
      </div>
      <div style={{ height: "100vh", background: "lightblue" }}>
        Lăn tiếp để kiểm tra
      </div>
      <p className="fixed top-0">Trạng thái: {isPassed ? "True" : "False"}</p>
    </div>
  );
};

export default Test;
