/* ====== ЗДЕСЬ МЕНЯЕШЬ ВСЁ СОДЕРЖИМОЕ САЙТА ======
   Поменял файл на GitHub → обновил страницу → всё изменилось.
   Каждый урок: id (уникальный, не меняй после начала), title, date (ГГГГ-ММ-ДД), слова (en + tr) и текст.
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
        { en: "different", tr: "разный, другой" }
      ],
      text: "Anna wants to travel to London. It is important for her to learn English. Her friend Tom says, \"I agree, English is important.\" Tom has an offer: \"Let's study together every day.\" At first it is difficult, because English is different from her language. But Anna is happy. She likes to learn new words.",
      textTr: "Анна хочет поехать в Лондон. Для неё важно выучить английский. Её друг Том говорит: «Я согласен, английский важен». У Тома есть предложение: «Давай учиться вместе каждый день». Сначала трудно, потому что английский не похож на её язык. Но Анна счастлива. Ей нравится учить новые слова."
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
        { en: "remember", tr: "помнить" }
      ],
      text: "My family lives in a big city. Every morning I begin my day with tea. My little sister has a question. I answer her. She says, \"Do you remember my birthday?\" Of course, I remember it!",
      textTr: "Моя семья живёт в большом городе. Каждое утро я начинаю день с чая. У моей младшей сестры есть вопрос. Я отвечаю ей. Она говорит: «Ты помнишь мой день рождения?» Конечно, я помню!"
    }
  ]
};
