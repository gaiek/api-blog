import { Request, Response } from "express";
import { TagService } from "../service/tagService";

export class TagController {
    constructor(private tagService: TagService) { }

    getAllTags = async (_: Request, res: Response) => {
        console.log('ESTOU SENDO CHAMADO NO CONTROLLER -->');
        try {
            const tags = await this.tagService.getAllTags();
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' }); 
        }
    }

    createTag = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }

            const newTag = await this.tagService.createTag(name);
            console.log('passei pelo controller -->', newTag);
            res.status(201).json(newTag);
        } catch (error: any) {
            console.error('error -->', error);
            res.status(500).json({ message: 'Internal Server Error', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
        }
    }

    getTagById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const tag = await this.tagService.getTagById(Number(id));
            if (!tag) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            res.status(200).json(tag);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    updateTag = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedTag = await this.tagService.updateTag(Number(id), name);
            res.status(200).json(updatedTag);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    deleteTag = async (req: Request, res: Response) => {
        console.log('ESTOU SENDO CHAMADO PARA DELETAR NO CONTROLLER -->');
        try {
            const { id } = req.params;
            await this.tagService.deleteTag(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

     getArticlesByTagId = async (req: Request, res: Response) => {
        try {
            const { tagId } = req.params;
            const article = await this.tagService.getArticlesByTagId(Number(tagId));
            res.status(200).json(article);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}