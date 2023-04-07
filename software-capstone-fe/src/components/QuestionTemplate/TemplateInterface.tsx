import { QuestionGroupInfo } from "services/animeService/QuestionTypeService";

export default interface TemplateProps {
    // count total questions in one section
    updateQuestionGroupInfoCallback: (infoList: any) => any;
    initialFrom: number;
    initialTo: number;
}
  