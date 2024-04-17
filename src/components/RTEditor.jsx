import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
import conf from "../conf/conf";

function RTEditor({
  name,
  label,
  control,
  defaultValue = ""
}) {
  return (
    <div className="w-full">

      {label && <label className="inline-block mb-1 pl-1">
        {label}
      </label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceApiKey}
            initialValue={defaultValue}
            init={{
              height: 650,
              menubar: true,
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              plugins: [
                "image",
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
                "code",
                "help",
                "wordcount",
                "anchor",
              ]
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}

export default RTEditor