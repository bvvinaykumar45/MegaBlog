import { useId } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../../config/config";

function RTE({ name, control, label, defaultValue }) {
  const editorId = useId();
  return (
    <div className="w-full flex flex-wrap">
      {label && (
        <label className="inline-block pl-1 mb-1" htmlFor={editorId}>
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            id={editorId}
            apiKey={config.tinyMceApiKey}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              initialValue: defaultValue,
              height: 500,
              width: "100%",
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
