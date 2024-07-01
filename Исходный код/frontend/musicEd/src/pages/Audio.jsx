import React from 'react';

const questions = [
  {
    "question": "Какая нота звучит тут (сколько Гц)?",
    "options": ["Ля 1 октавы, 440 Гц", "До 2 октавы, 480 Гц", "Соль 1 октавы, 377 Гц", "Си 3 октавы, 1005Гц"],
    "correctOption": 0,
    "audio": "LyaRast.mp3"
  },
  {
    "question": "Какая тональность у этого минуса?",
    "options": ["Си-минор", "Ре-минор", "Ля-мажор", "До-мажор"],
    "correctOption": 1,
    "audio": "minus2.mp3"
  },
  {
    "question": "Прослушайте данный отрывок и ответьте на вопрос: Какой эффект наложен на запись?",
    "options": ["Дилэй", "Реверберация", "подавление шума", "Фейзер"],
    "correctOption": 0,
    "audio": "effDelay.wav"
  },
  {
    "question": "На Каком фрагменте звучит самая высокая нота?",
    "options": ["1 нота", "2 нота", "обе равны"],
    "correctOption": 0,
    "audio": "La-Do.mp3"
  },
  {
    "question": "Определите тональность данной композиции",
    "options": ["Ре-минор", "Ля-мажор", "Соль-мажор"],
    "correctOption": 0,
    "audio": "MinusReMinor.mp3"
  },
  {
    "question": "Сравните высоту нот",
    "options": ["обе равны", "1 нота ниже 2", "1 нота выше 2"],
    "correctOption": 2,
    "audio": "La-Do.mp3"
  },
];

const Audio = () => {
  const [selectedOptions, setSelectedOptions] = React.useState(new Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getScore = () => {
    return questions.reduce((score, question, index) => {
      return question.correctOption === selectedOptions[index] ? score + 1 : score;
    }, 0);
  };

  return (
    <div>
      <h2 className='text-4xl text-white mb-5 text-center'>Аудио тест музыкального слуха!</h2>
      {questions.map((question, questionIndex) => (
        <div className='mx-4 text-white' key={questionIndex} style={{ marginBottom: '20px' }}>
          <div className='mb-4'>
            <audio className="" src={question.audio} controls />
          </div>
          <p>{question.question}</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                <input className='mr-2 mb-2'
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex}
                  checked={selectedOptions[questionIndex] === optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                  disabled={isSubmitted}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className='flex justify-center'>
        <button className="w-1/2 mb-4 text-[18px] mt-6 rounded-full bg-white text-[#8C82FC] hover:bg-[#8C82FC] hover:text-white py-2 transition-colors duration-300" onClick={handleSubmit} disabled={isSubmitted}>Отправить</button>
      </div>
      {isSubmitted && (
        <div flex justify-center>
          <h3 className='text-center mb-4 text-white'>Ваш результат: {getScore()} из {questions.length}</h3>
        </div>
      )}
    </div>
  );
};

export { Audio };