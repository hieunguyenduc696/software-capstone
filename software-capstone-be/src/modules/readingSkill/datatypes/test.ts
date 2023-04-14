type ParagraphDto = {
    paragraph_id: number | null,
    section_id: number | null,
    wallpaper: string | null | undefined,
    title: string | null | undefined,
    content: string | null | undefined,
}

type ReadingSection = {
    paragraph: ParagraphDto | null | undefined,
}

type ReadingTestDto = {
    reading_sections: ReadingSection | null | undefined,
}

export {
    ParagraphDto,
    ReadingSection,
    ReadingTestDto,
}