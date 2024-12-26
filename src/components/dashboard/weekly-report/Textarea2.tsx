import { Editor } from "@tinymce/tinymce-react";
import { SetStateAction, useRef } from "react";

export default function Textarea({
  className,
  value,
  setValue,
}: {
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
  className: string;
}) {
  const editorRef = useRef<any>(null);
  return (
    <div className={`${className} w-full relative`}>
      <label className="text-white font-medium block" htmlFor="eigth-driver">
        Your Report <span className="text-danger">*</span>
      </label>
      <div id="eigth-driver" className="mt-2">
        <Editor
          id="article-text-editor"
          value={value}
          onEditorChange={(e) => {
            setValue(e);
          }}
          apiKey="ou6vupt6kkvaoyqctm0xfvx9q0dlgl78thc8frfo6afog1x5"
          onInit={(evt, editor) => (editorRef.current = editor)}
          // initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
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
              "help",
              "wordcount",
              "image code",
            ],
            images_upload_url: "/api/articles/image/upload",
            file_picker_types: "image",
            // file_picker_callback: handleImageUpload,
            automatic_uploads: true,
            toolbar1:
              "undo redo | blocks | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | image code | insertfile undo redo",
            toolbar2:
              "table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader",
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); body { font-family:Plus Jakarta Sans,Arial,sans-serif; font-size:16px }",
          }}
          // value={body}
          // onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
