## Мотивация и обоснование разработки
Попытаемся ответить на самые частые вопросы относительно elephize, в частности:
- Зачем была нужна разработка собственного транспилятора?
- Были ли другие варианты и почему они не подошли?
- Каковы основные цели, которые мы ставили при разработке?

### Что такое Server side rendering?
В мире React это технология, позволяющая запускать React-приложения на сервере, получая на выходе HTML-строку,
идентичную по структуре документу, который генерируется на клиенте при помощи React.

#### Какие бенефиты несет в себе SSR?
1) Пользователь сразу видит полезный контент при заходе на сайт. Потом после загрузки скриптов сайт “оживает” 
   и с ним можно взаимодействовать полноценно. Т.е. Это существенное улучшение UX, и чем более плохое 
   соединение у пользователя - тем значительнее это улучшение.
2) Хотя поисковики последнее время и научились худо-бедно исполнять JS, сайт, предоставляющий контент сразу, с
   большой вероятностью получит больше баллов в оценке например PageSpeed или Lighthouse, кроме того сам поисковик
   может отранжировать такой сайт выше, чем аналогичные сайты с чисто клиентским рендером.
(расширить?)

#### Как обычно реализуется React SSR?
Существует готовый модуль от разработчиков React, позволяющий запустить приложение под NodeJS, получив нужную 
HTML-строку, которую можно вставить в шаблон документа и отдать пользователю. Но что если ваш сайт настолько нагружен,
что не может себе позволить NodeJS? В этом случае приходится искать какие-то обходные пути.

- Можно вообще отказаться от React. Самый простой путь, но в то же время чреватый существенными сложностями,
  особенно если ваши разработчики очень хотят писать на React и пользоваться его фичами, типа Unidirectional
  dataflow. Это кстати относится в целом к любым JS-фреймворкам, не только React. Ну и поддерживать две 
  аналогичные функциональности, которые написаны на разных языках это тоже развлечение на любителя.
- Второй путь заключается в том, чтобы каким-то образом адаптировать ваши серверные приложения или инфраструктуру
  таким образом, чтобы они могли отдавать HTML, полностью соответствующий по структуре тому, что создается на
  фронтенде через React. Если это условие соблюдается, то гидрация прекрасно подхватит серверный HTML и оживит его, 
  даже несмотря на то, что на сервере React может отсутствовать в принципе.

#### Как именно адаптировать сервер? 
Тут опять же есть несколько путей. Прекрасное исследование провели наши коллеги из ОК, соорудив в итоге среду для
запуска JS-скриптов на базе JVM и GraalVM. Подробности можно почитать в 
[статье Олега Коровина на хабре](https://habr.com/ru/company/odnoklassniki/blog/480808). Вкратце, коллеги изучили
возможные способы привязки nodejs к их бэкенду на Java, включая:
- Транспиляцию бэкенд-скриптов на Kotlin в JS 
- Запуск Nodejs в качестве дополнительного сервиса для обработки фронтенда 
- Запуск Nodejs в качестве постпроцессора для кода, отдаваемого бэкендом 
- Запуск JS-рантаймов в составе JVM
- Использование GraalVM - на чем они впоследствии и остановились как на самом производительном варианте.

К сожалению, вариант с GraalVM нам не подходил, поскольку наши бэкенды используют [KPHP](https://github.com/VKCOM/kphp).
Остальные варианты с запуском NodeJS также в перспективе очень сильно могли просадить производительность, к тому же 
крайне усложняли поддержку конвейера деплоя.

[//]: # (подробнее - почему не node? Особенности деплоя, особенности раскидываний, почему админы не хотят ноду - экономические обоснования)

Посидев и подумав некоторое время мы пришли к простому выводу - раз Магомет не идет к горе, то гора пойдет к Магомету. 
Мы не будем транспилировать в JS наш kphp код (что потребовало бы портирования на PHP не только React, но и массы уже
написанного кода), но мы попробуем затранспилировать наш JS код в PHP. Кроме того, у нас уже был некоторый опыт такой
транспиляции - внутри компании на тот момент уже существовал базовый транспилятор js2php, использующий espree в качестве
парсера и инструмента работы с AST. Доработка js2php тоже была одним из вариантов, однако мы очень хотели typescript
и его возможности по выводу типов, что было достаточно сложно реализуемо на espree.

[//]: # (привести пример выхлопа js2php и elephize для мотивации)

[Далее: Ограничения и возможности](./restrictions-and-opportunities.md)
