import { definePageMeta } from '#build/imports'

interface IHead {
    title?: string
    description?: string
    image?: string
}

export const useMetaTags = (meta: IHead) => {
    useHead({
        title: meta?.title,
        meta: [
            {
                name: 'description',
                content: meta!.description,
            },
            {
                name: 'og:description',
                content: meta!.description,
            },
            {
                name: 'og:title',
                content: meta!.title,
            },
            {
                name: 'og:image',
                content: meta!.image,
            },
            {
                name: 'twitter:title',
                content: meta!.title,
            },
            {
                name: 'twitter:description',
                content: meta!.description,
            },
            {
                name: 'twitter:image',
                content: meta!.image,
            },
        ],
    })
}
