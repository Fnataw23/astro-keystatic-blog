import { config, fields, collection } from '@keystatic/core';

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
        category: fields.select({
          label: 'Категория',
          options: [
            { label: 'Строительство', value: 'construction' },
            { label: 'Ремонт и отделка', value: 'renovation' },
            { label: 'Сантехника', value: 'plumbing' },
            { label: 'Электрика', value: 'electrical' },
            { label: 'Дизайн интерьера', value: 'design' },
          ],
          defaultValue: 'renovation',
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
});
