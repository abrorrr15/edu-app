import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  CatalogsPage: undefined;
  LessonContent: {
    title: string;
    content: string;
  };
};