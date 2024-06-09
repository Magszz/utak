import { NotifLang } from "../typings/Typings";

export const notifLang: NotifLang<
  "create" | "delete" | "fetch" | "uploadImg" | "submitImg" | "update"
> = {
  create: {
    success: {
      title: "Successfully created",
      description: "New product created successfully!",
    },
    error: {
      title: "Something went wrong.",
      description:
        "The application encountered an unexpected error while processing your request. Please try again!",
    },
  },
  delete: {
    success: {
      title: "Successfully deleted",
      description: "Selected product has been successfully deleted!",
    },
    error: {
      title: "Something went wrong.",
      description:
        "The application encountered an unexpected error while processing your request. Please try again!",
    },
  },
  update: {
    success: {
      title: "Successfully updated",
      description: "Selected product has been successfully updated!",
    },
    error: {
      title: "Something went wrong.",
      description:
        "The application encountered an unexpected error while processing your request. Please try again!",
    },
  },
  fetch: {
    error: {
      title: "Something went wrong.",
      description:
        "The application encountered an unexpected error while processing your request. Please refresh the page.",
    },
  },
  uploadImg: {
    error: {
      title: "Invalid file",
      description: "Please upload valid image file (JPG, JPEG, PNG).",
    },
  },
  submitImg: {
    error: {
      title: "Something went wrong.",
      description:
        "The application encountered an unexpected error while processing your request. Please try again.",
    },
  },
};
