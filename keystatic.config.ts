import { config, fields, collection, singleton } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'test3/astro-keystatic-blog',
  },
  collections: {
    categories: collection({
      label: 'Категории',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Название категории' } }),
      },
    }),
    posts: collection({
      label: 'Статьи',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Заголовок статьи' } }),
        description: fields.text({
          label: 'Краткое описание (анонс)',
          multiline: true,
        }),
        date: fields.date({
          label: 'Дата публикации',
          defaultValue: { kind: 'today' },
        }),
        category: fields.relationship({
          label: 'Категория',
          collection: 'categories',
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Обложка (фото)',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        videoUrl: fields.text({
          label: 'Ссылка на видео (YouTube / Rutube / VK Video / Vimeo)',
          description: 'Например, https://www.youtube.com/watch?v=... или https://rutube.ru/video/...',
        }),
        videoFile: fields.file({
          label: 'Или загрузить видеофайл напрямую (до 100 МБ)',
          directory: 'public/videos/posts',
          publicPath: '/videos/posts',
        }),
        content: fields.markdoc({
          label: 'Содержимое статьи',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: 'Главная страница',
      path: 'src/content/homepage/index',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Заголовок на главной', defaultValue: 'Полезные статьи о ремонте' }),
        description: fields.text({
          label: 'Подзаголовок на главной',
          multiline: true,
          defaultValue: 'Экспертные разборы, советы по выбору материалов и пошаговые инструкции от профессионалов.'
        }),
      },
    }),
  },
});
