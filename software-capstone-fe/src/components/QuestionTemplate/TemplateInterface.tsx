import { QuestionGroupInfo } from "services/QuestionTypeService";

export default interface TemplateProps {
    // count total questions in one section
    updateQuestionGroupInfoCallback: (infoList: any) => any;
    initialFrom: number;
    initialTo: number;
}
