import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { questions } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const Quiz = () => {
  const navigate = useNavigate();
  const [quesIndex, setQuesIndex] = useState(0);
  const [result, setResult] = useState("");
  const [rating, setRating] = useState(0);
  const [ansArr, setAnsArr] = useState([]);
  const [ans, setAns] = useState("");

  useEffect(() => {
    const rate =
      questions[quesIndex].difficulty === "easy"
        ? 0
        : questions[quesIndex].difficulty === "medium"
        ? 1
        : 2;
    setRating(rate);
  }, [quesIndex]);

  const handleNext = () => {
    const answersObj = ans === questions[quesIndex].correct_answer ? 1 : 0;
    if (ansArr?.length === 0) {
      setAnsArr([answersObj]);
    } else {
      setAnsArr([...ansArr, answersObj]);
    }
    if (questions.length - 1 === quesIndex) {
      localStorage.setItem("score", ansArr.filter((a) => a === 1)?.length * 5);
      navigate(`/result`);
    } else {
      setQuesIndex(quesIndex + 1);
    }
    setResult("");
  };

  const handleSelect = (ans) => {
    setAns(ans);
    if (ans === questions[quesIndex].correct_answer) {
      setResult("Correct!");
    } else {
      setResult("Sorry. Please try again!");
    }
  };

  return (
    <Layout>
      <div style={{ position: "absolute", top: 0, right: 0, width: "100%" }}>
        <ProgressBar
          completed={(quesIndex + 1) * 5}
          labelColor="#666666"
          borderRadius="0px"
          bgColor="#666666"
        />
      </div>

      <h1 className="text-3xl font-bold text-slate-700">
        Question {quesIndex + 1} of {questions.length}
      </h1>
      <p className="text-slate-500 mt-1.5">{questions[quesIndex].type}</p>

      <div className="flex ">
        <div className="star-rating">
          {[...Array(3)].map((star, idx) => (
            <span
              key={idx}
              className={idx <= rating ? "on" : "off"}
              onClick={() => setRating(idx)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 font-semibold text-lg">
        {questions[quesIndex].question}
      </div>

      <div className="flex flex-wrap options">
        {questions[quesIndex].options.flatMap((el, idx) => (
          <div
            key={idx}
            role="button"
            className=" py-1.5 border-2 rounded-md  font-bold text-center"
            style={{
              borderColor: `${ans === el ? "#000080" : "#000080"}`,
              color: `${ans === el ? "#fff" : "#000080"}`,
              background: `${ans === el ? "#000080" : "#fff"}`,
              width: "42%",
            }}
            onClick={() => handleSelect(el)}
          >
            {el}
          </div>
        ))}
      </div>

      {result !== "" && (
        <p
          className="text-center text-xl mb-5 font-bold"
          style={{ color: `${result === "Correct!" ? "green" : "red"}` }}
        >
          {result}
        </p>
      )}

      <button
        role="button"
        className="px-10 py-2 border-2 border-[#000080] rounded-md mx-auto font-bold flex justify-center text-[#000080] hover:bg-[#000080] hover:text-[#fff] disabled:bg-[#cccccc] disabled:text-[#666666] disabled:border-[#999999]"
        onClick={handleNext}
        disabled={result === ""}
      >
        Next Question
      </button>

      <div
        className="score-container"
        style={{
          position: "absolute",
          bottom: 25,
          width: "100%",
          left: 0,
          // width: "calc( 100% - 120px )",
        }}
      >
        <p className="font-semibold">
          Score: {ansArr.filter((a) => a === 1)?.length * 5}%
        </p>
        <ProgressBar
          completed={ansArr.filter((a) => a === 1)?.length * 5}
          labelColor="#000"
          borderRadius="3px"
          bgColor="#000"
          className="wrapper"
        />
      </div>
    </Layout>
  );
};

export default Quiz;
