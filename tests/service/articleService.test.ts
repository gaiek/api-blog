import { prismaClient } from '../../src/lib/database';
import { ArticleService } from '../../src/service/articleService';

jest.mock('../../src/lib/database.ts', () => ({
    prismaClient: {
        article: {
            findMany: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        articleTag: {
            createMany: jest.fn(),
            deleteMany: jest.fn(),
        }
    }
}));

describe('ArticleService', () => {
    let articleService: ArticleService;

    beforeEach(() => {
        articleService = new ArticleService();
        });

    it('should be defined', () => {
        expect(articleService).toBeDefined();
    });

    it('should have methods', () => {
        expect(articleService.getAllArticles).toBeDefined();
        expect(articleService.createArticle).toBeDefined();
        expect(articleService.getArticleById).toBeDefined();
        expect(articleService.updateArticle).toBeDefined();
        expect(articleService.deleteArticle).toBeDefined();
        expect(articleService.addTagsToArticle).toBeDefined();
        expect(articleService.removeTagsFromArticle).toBeDefined();
    });

    it('should return an array of articles for getAllArticles', async () => {
        const mockArticles = [
            { id: 1, title: 'Article 1', content: 'Content 1' },
            { id: 2, title: 'Article 2', content: 'Content 2' },
        ];
        (prismaClient.article.findMany as jest.Mock).mockResolvedValue(mockArticles);
        const result = await articleService.getAllArticles();
        expect(result).toEqual(mockArticles);
    });

    it('should return error for getAllArticles', async () => {
        (prismaClient.article.findMany as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.getAllArticles()).rejects.toThrow('Internal Server Error');
    });

    it('should create a new article for createArticle', async () => {
        const mockArticle = { id: 1, title: 'New Article', content: 'New Content' };
        (prismaClient.article.create as jest.Mock).mockResolvedValue(mockArticle);
        const result = await articleService.createArticle('New Article', 'New Content', [1]);
        expect(result).toEqual(mockArticle);
    });

    it('should create a new article without tags for createArticle', async () => {
        const mockArticle = { id: 1, title: 'New Article', content: 'New Content' };
        (prismaClient.article.create as jest.Mock).mockResolvedValue(mockArticle);
        const result = await articleService.createArticle('New Article', 'New Content');
        expect(result).toEqual(mockArticle);
    });

    it('should return error for createArticle', async () => {
        (prismaClient.article.create as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.createArticle('New Article', 'New Content', [1, 2])).rejects.toThrow('Internal Server Error');
    });

    it('should return an article for getArticleById', async () => {
        const mockArticle = { id: 1, title: 'Article 1', content: 'Content 1' };
        (prismaClient.article.findUnique as jest.Mock).mockResolvedValue(mockArticle);
        const result = await articleService.getArticleById(1);
        expect(result).toEqual(mockArticle);
    });

    it('should return error for getArticleById', async () => {
        (prismaClient.article.findUnique as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.getArticleById(1)).rejects.toThrow('Internal Server Error');
    });

    it('should update an article for updateArticle', async () => {
        const mockArticle = { id: 1, title: 'Updated Article', content: 'Updated Content' };
        (prismaClient.article.update as jest.Mock).mockResolvedValue(mockArticle);
        const result = await articleService.updateArticle(1, 'Updated Article', 'Updated Content', [1, 2]);
        expect(result).toEqual(mockArticle);
    });

    it('should updated article without tags for updateArticle', async () => {
        const mockArticle = { id: 1, title: 'Updated Article', content: 'Updated Content' };
        (prismaClient.article.update as jest.Mock).mockResolvedValue(mockArticle);
        const result = await articleService.updateArticle(1, 'Updated Article', 'Updated Content');
        expect(result).toEqual(mockArticle);
    });

    it('should return error for updateArticle', async () => {
        (prismaClient.article.update as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.updateArticle(1, 'Updated Article', 'Updated Content', [1, 2])).rejects.toThrow('Internal Server Error');
    });

    it('should delete an article for deleteArticle', async () => {
        (prismaClient.article.delete as jest.Mock).mockResolvedValue({});
        await expect(articleService.deleteArticle(1)).resolves.toBeUndefined();
    });

    it('should return error for deleteArticle', async () => {
        (prismaClient.article.delete as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.deleteArticle(1)).rejects.toThrow('Internal Server Error');
    });

    it('should add tags to an article for addTagsToArticle', async () => {
        const mockTags = [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }];
        (prismaClient.articleTag.createMany as jest.Mock).mockResolvedValue({});
        (prismaClient.article.findUnique as jest.Mock).mockResolvedValue({ ...mockTags[0], ...mockTags[1] });
        const result = await articleService.addTagsToArticle(1, [1, 2]);
        expect(result).toEqual({ ...mockTags[0], ...mockTags[1] });
    });

    it('should return error for addTagsToArticle', async () => {
        (prismaClient.articleTag.createMany as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.addTagsToArticle(1, [1, 2])).rejects.toThrow('Internal Server Error');
    });

    it('should remove tags from an article for removeTagsFromArticle', async () => {
        (prismaClient.articleTag.deleteMany as jest.Mock).mockResolvedValue({});
        (prismaClient.article.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await articleService.removeTagsFromArticle(1, [1, 2]);
        expect(result).toBeNull();
    });

    it('should return error for removeTagsFromArticle', async () => {
        (prismaClient.articleTag.deleteMany as jest.Mock).mockRejectedValue(new Error('Test error'));
        await expect(articleService.removeTagsFromArticle(1, [1, 2])).rejects.toThrow('Internal Server Error');
    });
});