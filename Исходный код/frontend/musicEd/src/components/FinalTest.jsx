import React, { useState } from 'react';

const questions = [
    {
        "question": "Какая частота является нижним пределом слышимого диапазона для человека?",
        "options": ["20 Гц", "50 Гц", "100 Гц", "200 Гц"],
        "correctOption": 0
      },
      {
        "question": "Что такое компрессор в звукорежиссуре?",
        "options": ["Устройство для увеличения громкости", "Устройство для уменьшения громкости", "Устройство для сжатия динамического диапазона", "Устройство для расширения динамического диапазона"],
        "correctOption": 2
      },
      {
        "question": "Какой микрофон лучше всего подходит для записи вокала в студийных условиях?",
        "options": ["Динамический микрофон", "Ленточный микрофон", "Конденсаторный микрофон", "Петличный микрофон"],
        "correctOption": 2
      },
      {
        "question": "Что такое децибел (dB)?",
        "options": ["Единица измерения частоты", "Единица измерения громкости", "Единица измерения времени", "Единица измерения длины"],
        "correctOption": 1
      },
      {
        "question": "Какой микрофон обладает кардиоидной направленностью?",
        "options": ["Динамический микрофон", "Микрофон с кардиоидной диаграммой направленности", "Конденсаторный микрофон", "Ленточный микрофон"],
        "correctOption": 1
      },
      {
        "question": "Что такое эквализация?",
        "options": ["Процесс изменения громкости звука", "Процесс изменения тембра звука", "Процесс изменения времени звучания", "Процесс изменения частоты звука"],
        "correctOption": 1
      },
      {
        "question": "Какой плагин используется для контроля уровня громкости трека в процессе сведения?",
        "options": ["Компрессор", "Эквалайзер", "Лимитер", "Ревербератор"],
        "correctOption": 2
      },
      {
        "question": "Что такое панорама в сведении?",
        "options": ["Распределение звуков по частотам", "Распределение звуков по громкости", "Распределение звуков по стерео-пространству", "Распределение звуков по времени"],
        "correctOption": 2
      },
      {
        "question": "Как называется процесс удаления нежелательных частот из аудиозаписи?",
        "options": ["Компрессия", "Фильтрация", "Экспандирование", "Лимитирование"],
        "correctOption": 1
      },
      {
        "question": "Какой тип микрофона наиболее чувствителен к высоким частотам и часто используется в студийных записях?",
        "options": ["Динамический микрофон", "Ленточный микрофон", "Конденсаторный микрофон", "Петличный микрофон"],
        "correctOption": 2
      },
      {
        "question": "Что такое битрейт?",
        "options": ["Частота дискретизации звука", "Количество бит информации, передаваемых в секунду", "Уровень громкости звука", "Частота звуковых волн"],
        "correctOption": 1
      },
      {
        "question": "Какой формат аудиозаписи обычно используется для не сжатого звука?",
        "options": ["MP3", "WAV", "AAC", "OGG"],
        "correctOption": 1
      },
      {
        "question": "Какой диапазон частот считается слышимым для человека?",
        "options": ["0-10 Гц", "20-20,000 Гц", "50-15,000 Гц", "100-10,000 Гц"],
        "correctOption": 1
      },
      {
        "question": "Что такое гармоники?",
        "options": ["Основная частота звука", "Чистые тоны без примесей", "Обертоны, возникающие при колебании звука", "Низкочастотные звуковые волны"],
        "correctOption": 2
      },
      {
        "question": "Какое явление описывает эффект Доплера?",
        "options": ["Изменение громкости звука при удалении источника", "Изменение частоты звука при движении источника относительно наблюдателя", "Изменение тембра звука при изменении температуры воздуха", "Изменение времени звучания при изменении давления"],
        "correctOption": 1
      },
      {
        "question": "Что такое фазовый сдвиг?",
        "options": ["Изменение частоты звука", "Изменение громкости звука", "Изменение временного положения звуковых волн", "Изменение тембра звука"],
        "correctOption": 2
      },
      {
        "question": "Какое устройство используется для преобразования аналогового звука в цифровой сигнал?",
        "options": ["Компрессор", "Аналого-цифровой преобразователь (АЦП)", "Эквалайзер", "Ревербератор"],
        "correctOption": 1
      }
    ]

const FinalTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('audioFile', selectedFile);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      <h2 className='text-4xl text-white mb-5 text-center'>Финальный тест</h2>
      {questions.map((question, questionIndex) => (
        <div className='mx-4 text-white' key={questionIndex} style={{ marginBottom: '20px' }}>
          <p className='text-2xl mb-4'>{question.question}</p>
          {question.options.map((option, optionIndex) => (
            <div className='' key={optionIndex}>
              <label>
                <input className='mr-4 mb-4 h-4 w-5 accent-[#8C82FC]'
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
      {/* <div>
        <h2 className='text-white text-center text-2xl'>Проверка ваших мультимедийных файлов</h2>
      </div>
      <div>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div> */}
    </div>
  );
};

export default FinalTest;
