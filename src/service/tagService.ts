import { prismaClient } from "../lib/database";


export class TagService {

    async getAllTags() {
        console.log('ESTOU SENDO CHAMADO NO SERVICE -->');
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
            console.log('passei pelo service -->', newTag);
            return newTag;
        } catch (error: any) {
            console.log('error -->', error);
            if (error.code) {
                console.log('error message -->', error.message);
                console.log('error code -->', error.code);
            }
            if (error.message) {
                console.log('error message -->', error.message);
                throw new Error(error.message);
            }
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
        console.log('ESTOU SENDO CHAMADO PARA DELETAR NO SERVICE -->');
        try { 
            console.log('ID PARA DELETAR -->', id);
            await prismaClient.tag.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
}