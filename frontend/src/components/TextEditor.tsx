import { useEffect, useState } from "react";
import { ContentState, Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import "../styles/textEditor.css";
import axios from "axios";
import { Backend_url } from "../config";

export const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(rawContentState);
    setContent((val) => html);
  }, [editorState]);

  return (
    <div className="h-lvh p-3 grid grid-rows-10 ">
      <div className="row-span-1">
        <input
          className=" w-full outline-none rounded-sm text-4xl font-homo  text-gray-900 font-semibold"
          placeholder="Title"
          onChange={(e) => setTitle((val) => e.target.value)}
        ></input>
      </div>

      <div className="row-span-8 text-2xl font-homo">
        <Editor
          placeholder="   Tell your story..."
          toolbar={{
            list: {
              options: ["unordered", "ordered"],
            },
            link: {
              options: ["link"],
            },
          }}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>

      <div className=" row-span-1 flex justify-end ">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={async () => {
            console.log(content)
            axios.post(
              `${Backend_url}/api/v1/blog`,
              {
                title: title,
                content: content,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            );
          }}
        >
          Publish
        </button>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => 1}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
