document.addEventListener("DOMContentLoaded", init);

function init() {
  const textarea = document.querySelector("textarea");
  const wordsNumberEl = document.querySelector(".stat__value--words");
  const charactersNumberEl = document.querySelector(".stat__value--characters");
  const palindromesNumberEl = document.querySelector(
    ".stat__value--palindromes"
  );
  const sentencesNumberEl = document.querySelector(".stat__value--sentences");

  const mostRepetedWordEl = document.querySelector(
    ".stat__value--most-repeted"
  );
  const longestWordEl = document.querySelector(".stat__value--longest");
  let palindromes = 0;
  let sentences = 0;
  let words = 0;
  let characters = 0;
  let mostRepeted = "";
  let longest = "";

  textarea.addEventListener("input", (e) => {
    const text = e.target.value;

    if (text.includes("<script>")) {
      alert("You cannot use that");
      e.target.value = e.target.value.replace("<script>", "");
    }

    characters = charactersCounter(text);
    const wordsArr = wordsCounter(text);

    palindromes = palindromesCounter(wordsArr);
    sentences = sentencesCounter(text);

    mostRepeted = checkMostRepetedWord(wordsArr);
    longest = checkLongestWord(wordsArr);
    const analiticsResults = {
      words: wordsArr?.length || 0,
      characters,
      palindromes,
      sentences,
      mostRepeted,
      longest,
    };

    updateUI(analiticsResults);
  });

  function updateUI({
    words,
    characters,
    palindromes,
    sentences,
    mostRepeted,
    longest,
  }) {
    wordsNumberEl.textContent = words;
    charactersNumberEl.textContent = characters;
    palindromesNumberEl.textContent = palindromes;
    sentencesNumberEl.textContent = sentences;
    mostRepetedWordEl.innerHTML = `${mostRepeted?.word || "-"} ${
      mostRepeted?.times ? `<span>(${mostRepeted?.times} times)</span>` : ""
    } `;
    longestWordEl.innerHTML = `${longest || "-"}`;
  }
}

function checkMostRepetedWord(words) {
  if (!words || words.length < 3) return 0;
  const wordsFrecuency = words.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: (acc[curr] || 0) + 1,
    };
  }, {});

  const mostRepeted = Object.entries(wordsFrecuency)
    .sort((a, b) => b[1] - a[1])
    .at(0);

  console.log(mostRepeted);

  return {
    word: mostRepeted[0] || "",
    times: mostRepeted[1] || null,
  };
}

function checkLongestWord(words) {
  if (!words || !words.length) return;
  return words.sort((a, b) => b.length - a.length).at(0);
}
function palindromesCounter(words) {
  if (!words || !words.length) return 0;
  return words.reduce((acc, curr) => acc + palindromeChecker(curr), 0);
}

function wordsCounter(string) {
  const wordRegex = /[\w]{2,}/g;
  const words = string.match(wordRegex);

  return words;
}

function charactersCounter(string) {
  const characters = string.trim().split("").length;
  return characters;
}

function palindromeChecker(word) {
  const safeWord = word.replace(/[!-?\d]/, "");
  const reversedWord = word.split("").reverse().join("");
  if (safeWord === reversedWord) return true;
  return false;
}

function sentencesCounter(string) {
  if (string.length < 3) return 0;
  const sentences = string.split("").filter((char) => char == ".");
  const endsWithDot = /[.]$/.test(string);
  return sentences?.length + !endsWithDot || 0;
}

//TODO:Contador de frases: cantidad de frases en el texto. Puedes usar los signos de puntuación como punto, signo de interrogación y signo de exclamación para delimitar las frases.
// TODO: Análisis de frecuencia de palabras: Crea una funcionalidad que analice la frecuencia de cada palabra en el texto y genere un listado con la cantidad de veces que aparece cada palabra.
// TODO: Identificación de palabras más largas y más cortas: Añade una función que identifique las palabras más largas y más cortas en el texto.
//TODO: Conteo de sílabas: Añade una función que cuente la cantidad de sílabas en cada palabra y en total, útil para análisis métricos en poesía, por ejemplo.
