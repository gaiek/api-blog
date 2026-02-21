import { prismaClient } from "../lib/database";


export class TagService {

    async getAllTags() {
        try {
            const tags = await prismaClient.tag.findMany();
            return tags;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async createTag(name: string) {
        try {
            const newTag = await prismaClient.tag.create({
                data: {
                    name,
                },
            });
            return newTag;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async getTagById(id: number) {
        try {
            const tag = await prismaClient.tag.findUnique({
                where: { id },
            });
            return tag;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
    
    async updateTag(id: number, name: string) {
        try {
            const updateTag = await prismaClient.tag.update({
                where: { id },
                data: {
                    name,
                },
            });
            return updateTag;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async deleteTag(id: number) {
        try { 
            await prismaClient.tag.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async getArticlesByTagId(tagId: number) {
        try {
            const article = await prismaClient.article.findMany({
                where: {
                    article_tags: {
                        some: {
                            tag_id: tagId
                        }
                    }
                },
                include: {
                    article_tags: {
                        include: {
                            tag: true
                        }
                    }
                }
            })
            return article
        } catch(error) {
            throw new Error('Internal Server Error')
        }
    }
}