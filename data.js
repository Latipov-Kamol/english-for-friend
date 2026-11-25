/* ====== ЗДЕСЬ МЕНЯЕШЬ ВСЁ СОДЕРЖИМОЕ САЙТА ======
   Поменял файл на GitHub → обновил страницу → всё изменилось.
   Каждый урок: id (уникальный, не меняй после начала), title, date (ГГГГ-ММ-ДД),
   слова (en + tr, лучше 20 штук) и текст, где эти слова используются.
   Новый урок проще всего сделать на странице admin.html — она сама напишет блок кода.
   Слова в тексте пиши в той же форме (допустимы окончания -s, -ed, -ing). */
window.APP = {
  title: "English Step by Step",
  subtitle: "Учим слова и сразу читаем их в тексте",
  theme: { accent: "#15233b", paper: "#eef3f8", mark: "#ffe14d", good: "#1f9d6b", bad: "#d64550" },
  lessons: [
    {
      id: "day1",
      title: "Урок 1",
      date: "2026-11-24",
      words: [
        { en: "important", tr: "важный" },
        { en: "travel", tr: "путешествовать" },
        { en: "agree", tr: "соглашаться" },
        { en: "offer", tr: "предложение" },
        { en: "difficult", tr: "трудный" },
        { en: "different", tr: "разный, другой" },
        { en: "easy", tr: "лёгкий" },
        { en: "friend", tr: "друг" },
        { en: "learn", tr: "учить, узнавать" },
        { en: "language", tr: "язык" },
        { en: "study", tr: "учиться" },
        { en: "happy", tr: "счастливый" },
        { en: "together", tr: "вместе" },
        { en: "because", tr: "потому что" },
        { en: "teacher", tr: "учитель" },
        { en: "country", tr: "страна" },
        { en: "speak", tr: "говорить" },
        { en: "practice", tr: "практиковаться" },
        { en: "mistake", tr: "ошибка" },
        { en: "every", tr: "каждый" }
      ],
      text: "Anna wants to travel to London. It is a new country for her. She knows that English is important, because people there speak English every day. Anna has a good friend, Tom. Tom is a teacher. He has an offer for her: \"Let's study together. I will help you.\" Anna says, \"I agree!\" At first, English is difficult. It is very different from her language. Anna makes a mistake, but Tom says, \"It is OK. Every person makes a mistake.\" Anna wants to learn more words, so they practice every evening. After one month, some words are easy. Anna is happy. Now she wants to travel and speak English with new friends.",
      textTr: "Анна хочет поехать в Лондон. Для неё это новая страна. Она знает, что английский важен, потому что там люди говорят по-английски каждый день. У Анны есть хороший друг Том. Том — учитель. У него есть предложение для неё: «Давай учиться вместе. Я помогу тебе». Анна говорит: «Я согласна!» Сначала английский трудный. Он сильно отличается от её языка. Анна делает ошибку, но Том говорит: «Всё в порядке. Каждый человек делает ошибки». Анна хочет выучить больше слов, поэтому они практикуются каждый вечер. Через месяц некоторые слова становятся лёгкими. Анна счастлива. Теперь она хочет путешествовать и говорить по-английски с новыми друзьями."
    },
    {
      id: "day2",
      title: "Урок 2",
      date: "2026-11-25",
      words: [
        { en: "city", tr: "город" },
        { en: "family", tr: "семья" },
        { en: "begin", tr: "начинать" },
        { en: "answer", tr: "отвечать; ответ" },
        { en: "question", tr: "вопрос" },
        { en: "remember", tr: "помнить" },
        { en: "morning", tr: "утро" },
        { en: "breakfast", tr: "завтрак" },
        { en: "school", tr: "школа" },
        { en: "sister", tr: "сестра" },
        { en: "brother", tr: "брат" },
        { en: "birthday", tr: "день рождения" },
        { en: "weather", tr: "погода" },
        { en: "usually", tr: "обычно" },
        { en: "ask", tr: "спрашивать" },
        { en: "forget", tr: "забывать" },
        { en: "bring", tr: "приносить" },
        { en: "gift", tr: "подарок" },
        { en: "party", tr: "вечеринка, праздник" },
        { en: "again", tr: "снова" }
      ],
      text: "My family lives in a big city. Every morning I begin my day with breakfast. Usually we eat bread and drink tea. Then I go to school with my sister and brother. The weather is nice today. My little sister has a question. She asks, \"Do you remember my birthday?\" I answer, \"Of course, I never forget it!\" Her birthday is on Saturday. We want to make a party at home. My brother will bring a gift. I will bring a cake. My sister is happy again.",
      textTr: "Моя семья живёт в большом городе. Каждое утро я начинаю день с завтрака. Обычно мы едим хлеб и пьём чай. Потом я иду в школу с сестрой и братом. Сегодня хорошая погода. У моей младшей сестры есть вопрос. Она спрашивает: «Ты помнишь мой день рождения?» Я отвечаю: «Конечно, я никогда его не забуду!» Её день рождения в субботу. Мы хотим устроить дома праздник. Брат принесёт подарок. Я принесу торт. Сестра снова счастлива."
    }
  ]
};
