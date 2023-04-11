import path from 'path';

const PASSAGE_WALLPAPER_FILE_ALLOWED_EXTENSION: string[] = [
    ".jpg", ".png",
];

const READING_SKILL_RESOURCE_PATH: string = path.join(__dirname, '..', '..' , '..', '..', 'resources', 'modules', 'readingSkill');
const READING_PASSAGE_RESOURCE_PATH: string = path.join(READING_SKILL_RESOURCE_PATH, 'readingPassage');
const READING_PASSAGE_THUMBNAIL_RESOURCE_PATH: string = path.join(READING_PASSAGE_RESOURCE_PATH, 'thumbnail');

export {
    PASSAGE_WALLPAPER_FILE_ALLOWED_EXTENSION,
    READING_SKILL_RESOURCE_PATH,
    READING_PASSAGE_THUMBNAIL_RESOURCE_PATH,
};