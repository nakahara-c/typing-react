import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./App.css";

const App = () => {
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef();

  const words = useMemo(
    () => ["apple", "banana", "orange", "grape", "strawberry"],
    []
  );

  const getRandomWord = useCallback(() => {
    return words[Math.floor(Math.random() * words.length)];
  }, [words]);
  
  useEffect(() => {
    if (isGameActive) {
      inputRef.current.focus();
      setWord(getRandomWord());

      const countdown = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isGameActive, getRandomWord]);


  useEffect(() => {
    if (timer === 0) {
      setIsGameActive(false);
    }
  }, [timer]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === word) {
      setScore(score + 1);
      setInputValue("");
      setWord(getRandomWord(words));
      setIsCorrect(true);
      setTimeout(() => setIsCorrect(false), 500);
    }
  };

  const handleGameStart = () => {
    setIsGameActive(true);
    setTimer(10);
  };

  const handleGameReset = () => {
    setIsGameActive(false);
    setScore(0);
    setInputValue("");
    setTimer(10);
  };

  return (
    <div className="container">
      <h1>タイピングゲーム</h1>
      {!isGameActive ? (
        <button onClick={handleGameStart}>ゲームスタート</button>
      ) : (
        <button onClick={handleGameReset}>リセット</button>
      )}
      <p>スコア: {score}</p>
      <p>時間: {timer}</p>
      {isGameActive && (
        <div>
          <p>タイプする単語: {word}</p>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          {isCorrect && <p className="correct">正解！</p>}
        </div>
      )}
    </div>
  );
};

export default App;
