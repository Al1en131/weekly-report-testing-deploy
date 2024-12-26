import { SetStateAction } from "react";
import dynamic from "next/dynamic";

// Dynamically imports Froala Editor component
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

export default function Textarea({
  className,
  value,
  setValue,
}: {
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
  className?: string;
}) {
  return (
    <div className={`${className} w-full relative`}>
      <label
        className="text-white font-medium block mb-2"
        htmlFor="editor"
      >
        Your Report <span className="text-red-500">*</span>
      </label>
      <div id="editor" className="mt-2">
        <FroalaEditorComponent
          tag="textarea"
          config={{
            height: 100,
            width: "100%",
            listAdvancedTypes: true,
            toolbarButtons: [
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "|",
              "subscript",
              "superscript",
              "outdent",
              "indent",
              "|",
              "formatOL",
              "formatUL",
              "clearFormatting",
              "insertTable",
              "|",
              "html",
            ],
            heightMin: 200,
            heightMax: 400,
            placeholderText: "Write your report here...",
          }}
          onModelChange={(content: string) => setValue(content)}
        />
      </div>
    </div>
  );
}
