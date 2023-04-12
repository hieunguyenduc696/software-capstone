type ReadingPassageDao = {
    wallpaper: string | null | undefined,
    title: string | null | undefined,
    content: string | null | undefined,
}

type ReadingSection = {
    reading_passage: ReadingPassageDao | null | undefined,
}

type ReadingExamDao = {
    reading_sections: ReadingSection | null | undefined,
}

export {
    ReadingPassageDao,
    ReadingSection,
    ReadingExamDao,
}