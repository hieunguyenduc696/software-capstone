import path from 'path';

const PARAGRAPH_WALLPAPER_FILE_ALLOWED_EXTENSION: string[] = [
    ".jpg", ".png",
];

const READING_SKILL_RESOURCE_PATH: string = path.join(__dirname, '..', '..' , '..', '..', 'resources', 'modules', 'readingSkill');
const PARAGRAPH_RESOURCE_PATH: string = path.join(READING_SKILL_RESOURCE_PATH, 'readingPARAGRAPH');
const PARAGRAPH_WALLPAPER_RESOURCE_PATH: string = path.join(PARAGRAPH_RESOURCE_PATH, 'wallpaper');

export {
    PARAGRAPH_WALLPAPER_FILE_ALLOWED_EXTENSION,
    READING_SKILL_RESOURCE_PATH,
    PARAGRAPH_WALLPAPER_RESOURCE_PATH,
};