import { Film, ShortFilm } from '../types/films';
import { GenresEnum } from '../types/genres';

export const films: ShortFilm[] = [
  {
    id: 0,
    name: 'Гарри Поттер и философский камень',
    posterImage:
      'https://ucare.timepad.ru/c4023654-57f4-408d-95cd-035e08fbf84c/posterImage_event_2270055.jpg',
  },
  {
    id: 1,
    name: 'Гарри Поттер и Тайная комната',
    posterImage: 'https://web-3.ru/data/articles/40337/3.jpg',
  },
  {
    id: 2,
    name: 'Гарри Поттер и узник Азкабана',
    posterImage: 'https://web-3.ru/data/articles/40337/3.jpg',
  },
  {
    id: 3,
    name: 'Гарри Поттер и Кубок огня',
    posterImage:
      'https://www.1c-interes.ru/images/2022/10/kubok_ognya_regionalnoe_main.jpg',
  },
  {
    id: 4,
    name: 'Гарри Поттер и Орден Феникса',
    posterImage:
      'https://pic.rutubelist.ru/video/17/85/1785b23dca62b5e6415ebcab81557c58.jpg',
  },
  {
    id: 5,
    name: 'Гарри Поттер и Принц-полукровка',
    posterImage:
      'https://w.forfun.com/fetch/2c/2c95666815fa29c99129097bb02e79b8.jpeg',
  },
  {
    id: 6,
    name: 'Гарри Поттер и Дары Смерти. Часть 1',
    posterImage:
      'https://w.forfun.com/fetch/36/3668f633dd3b0dd85b7e989754222b88.jpeg',
  },
  {
    id: 7,
    name: 'Гарри Поттер и Дары Смерти. Часть 2',
    posterImage:
      'https://w.forfun.com/fetch/6e/6e30e1305b05bc21fb5decfd08df61e2.jpeg',
  },
];

export const promoFilm: Film = {
  id: 8,
  name: 'Фантастические твари и где они обитают',
  posterImage:
    'https://s1.1zoom.ru/b5162/803/Men_Houses_Fantastic_Beasts_and_Where_to_Find_Them_529545_2048x1152.jpg',
  backgroundImage:
    'https://s1.1zoom.ru/b5162/803/Men_Houses_Fantastic_Beasts_and_Where_to_Find_Them_529545_2048x1152.jpg',
  videoLink: '',
  genre: GenresEnum.Fantasy,
  released: 2016,
  description:
    '1926 год. Ньют Саламандер – бывший студент школы магии и волшебства Хогвартс, но сейчас он изучает биологию и зоологию магического мира. Для того, чтобы узнавать больше о мире животных ему приходится постоянно путешествовать, поэтому, когда редкую птицу необходимо доставить в Аризону, Саламандер без сомнений садится на корабль и отправляется в путь даже несмотря на то, что Министерство магии запрещает ввозить фантастических животных на территорию США. Но судьба распоряжается иначе. Зоолог случайно оставляет свой магический чемоданчик, в котором обитают животные, и по ошибке забирает с собой другой, точно такой же. Так весь набор представителей магической флоры и фауны оказывается в руках у маггла! Саламандер ставит под удар волшебное сообщество.Но и это ещё не всё. Вскоре главный герой обнаруживает, что в городе есть обскур – ребёнок, который вынужден сдерживать свои магические силы. Ни для кого не секрет, что подобные создания опасны не только для магического мира, но и для магглов. Сможет ли Саламандер восстановить мир и спасти невинное создание?',
  rating: 0,
  scoresCount: 0,
  director: 'Дэвид Йейтс',
  starring: [
    'Bill Murray',
    'Edward Norton',
    'Jude Law',
    'Willem Dafoe',
    'other',
  ],
  isFavorite: false,
};
