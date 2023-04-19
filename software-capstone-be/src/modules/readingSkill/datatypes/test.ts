type ReadingTestDto = {
    test_id?: number | null | undefined,

    title: string | null | undefined,
    test_type: number | null | undefined,
    test_level: number | null | undefined,

    sections?: ReadingSectionDto[],
}

type ReadingSectionDto = {
    section_id?: number | null | undefined,
    test_id?: number | null | undefined,

    section_index?: number | null | undefined,
    section_type?: number | null | undefined,

    templates?: TemplateDto[],
    paragraph?: ParagraphDto,
}

type ParagraphDto = {
    paragraph_id?: number | null | undefined,
    section_id?: number | null | undefined,
    wallpaper: string | null | undefined,
    title: string | null | undefined,
    content: string | null | undefined,
}

type TemplateTypeDto = {
    template_type_id?: number | null | undefined,
    name: string | null | undefined,
    description: string | null | undefined,
}

type TemplateDto = {
    template_id?: number | null | undefined,
    template_type_id?: number | null | undefined,
    section_id?: number | null | undefined,

    template_index: number | null | undefined,
    title: string | null | undefined,
    content: string | null | undefined,
    expand_column: string | null | undefined,

    questions?: QuestionDto[],
}

type QuestionDto = {
    template_id?: number | null | undefined, 
    question_id?: number | null | undefined, 
    question_index: number | null | undefined, 
    content: string | null | undefined, 
    options: string | null | undefined, 
    score: number | null | undefined,

    answers?: AnswerDto[],
}

type AnswerDto = {
    question_id?: number | null | undefined,
    answer_id?: number | null | undefined,
    content: number | null | undefined, 
    options: number | null | undefined,
}

export {
    ReadingTestDto,
    ReadingSectionDto,
    ParagraphDto,
    TemplateTypeDto,
    TemplateDto,
    QuestionDto,
    AnswerDto,
}