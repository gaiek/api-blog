import { prismaClient } from '../../src/lib/database';
import { TagService } from '../../src/service/tagService';

jest.mock('../../src/lib/database.ts', () => ({
    prismaClient: {
        tag: {
            findMany: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        article: {
            findMany: jest.fn(),
        }
    }
}));

describe('TagService', () => {
    let tagService: TagService;

    beforeEach(() => {
        tagService = new TagService();
    });

    it('should be defined', () => {
        expect(tagService).toBeDefined();
    });

    it('should have methods', () => {
        expect(tagService.getAllTags).toBeDefined();
        expect(tagService.createTag).toBeDefined();
        expect(tagService.getTagById).toBeDefined();
        expect(tagService.updateTag).toBeDefined();
        expect(tagService.deleteTag).toBeDefined();
    });

    it('should return an array of tags for getAllTags', async () => {
        const mockTags = [
            { id: 1, name: 'Tag 1' },
            { id: 2, name: 'Tag 2' },
        ];
        (prismaClient.tag.findMany as jest.Mock).mockResolvedValue(mockTags);
        const result = await tagService.getAllTags();
        expect(result).toEqual(mockTags);
    });

    it('should return error for getAllTags', async () => {
        (prismaClient.tag.findMany as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(tagService.getAllTags()).rejects.toThrow('Internal Server Error');
    });

    it('should create a new tag for createTag', async () => {
        const mockTag = { id: 1, name: 'New Tag' };
        (prismaClient.tag.create as jest.Mock).mockResolvedValue(mockTag);
        const result = await tagService.createTag('New Tag');
        expect(result).toEqual(mockTag);
    });

    it('should return error for createTag', async () => {
        (prismaClient.tag.create as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(tagService.createTag('New Tag')).rejects.toThrow('Internal Server Error');
    });
    
    it('should get a tag by id for getTagById', async () => {
        const mockTag = { id: 1, name: 'Tag 1' };
        (prismaClient.tag.findUnique as jest.Mock).mockResolvedValue(mockTag);
        const result = await tagService.getTagById(1);
        expect(result).toEqual(mockTag);
    });

    it('should return error for getTagById', async () => {
        (prismaClient.tag.findUnique as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(tagService.getTagById(1)).rejects.toThrow('Internal Server Error');
    });

    it('should update a tag for updateTag', async () => {
        const mockTag = { id: 1, name: 'Updated Tag' };
        (prismaClient.tag.update as jest.Mock).mockResolvedValue(mockTag);
        const result = await tagService.updateTag(1, 'Updated Tag');
        expect(result).toEqual(mockTag);
    });

    it('should return error for updateTag', async () => {
        (prismaClient.tag.update as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(tagService.updateTag(1, 'Updated Tag')).rejects.toThrow('Internal Server Error');
    });

    it('should delete a tag for deleteTag', async () => {
        (prismaClient.tag.delete as jest.Mock).mockResolvedValue({});
        const result = await tagService.deleteTag(1);
        expect(result).toBeUndefined();
    });

    it('should return error for deleteTag', async () => {
        (prismaClient.tag.delete as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(tagService.deleteTag(1)).rejects.toThrow('Internal Server Error');
    });

    it('should return result for getArticlesByTagId', async () => {
        const mockArticles = [
            { id: 1, title: 'Article 1', content: 'Content 1', tag_id: 1 },
            { id: 2, title: 'Article 2', content: 'Content 2', tag_id: 1 },
        ];
        (prismaClient.article.findMany as jest.Mock).mockResolvedValue(mockArticles);
        const result = await tagService.getArticlesByTagId(1);
        expect(result).toEqual(mockArticles);
    });

    it('should return error for getArticlesByTagId', async () => {
        (prismaClient.article.findMany as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(tagService.getArticlesByTagId(1)).rejects.toThrow('Internal Server Error');
    });
});

