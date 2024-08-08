const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:White;";
    document.body.appendChild(div);
  };

  // 게임이 종료되었을 때 이벤트
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0; // index 초기화
  };

  const updateKeyboard = (key, color) => {
    const keyBlock = document.querySelector(
      `.keyboard-block[data-key="${key}"]`
    );
    if (keyBlock) {
      const currentColor = keyBlock.style.backgroundColor;
      if (currentColor !== "rgb(106, 170, 100)") {
        // "#6AAA64" in RGB
        keyBlock.style.backgroundColor = color;
        keyBlock.style.color = "white";
      }
    }
  };

  // 엔터키를 눌렀을 때
  const handleEnterKey = () => {
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6AAA64";
        block.classList.add("correct");
        updateKeyboard(입력한_글자, "#6AAA64");
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        block.classList.add("present");
        updateKeyboard(입력한_글자, "#C9B458");
      } else {
        block.style.background = "#787C7E";
        block.classList.add("absent");
        updateKeyboard(입력한_글자, "#787C7E");
      }

      block.style.color = "white";
    }

    if (맞은_개수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
      //   handleCharacterInput(key);
    }
  };

  const handleCharacterInput = (key) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    thisBlock.innerText = key;
    index += 1;
  };

  const handleVirtualKeyClick = (event) => {
    const key = event.target.dataset.key;
    if (!key) return;

    if (key === "ENTER") {
      handleEnterKey();
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (index < 5) {
      handleCharacterInput(key);
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
  document
    .querySelector("footer")
    .addEventListener("click", handleVirtualKeyClick);
}

appStart();
