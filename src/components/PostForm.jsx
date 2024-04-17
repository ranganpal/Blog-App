import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RTEditor, Input, Button, Select } from './index'
import storageService from '../appwrite/storage'

function PostForm({ post }) {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState("")
  const userData = useSelector(status => status.auth.userData)
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      slug: post?.$id || "",
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      authorName: post?.authorName || ""
    },
  })

  const slugTransfer = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  const submit = async (data) => {
    if (post) {
      // Update Post
      const file = data.image[0] ? await storageService.createFile(data.image[0]) : null

      if (file) {
        await storageService.deleteFile(post.featuredImage)
      }

      const updatedPost = storageService.updatePost({
        ...data,
        slug: post.$id,
        authorId: userData.$id,
        featuredImage: file ? file.$id : post.featuredImage
      })

      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`)
      }

    }
    else {
      // Create Post
      const file = data.image[0] ? await storageService.createFile(data.image[0]) : null

      if (file) {
        const newPost = await storageService.createPost({
          ...data,
          authorId: userData.$id,
          featuredImage: file.$id
        })

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    setPreviewImage(storageService.getFliePreview(post?.featuredImage || ""))
  }, [post])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransfer(value.title), {
          shouldValidate: true
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, setValue, slugTransfer])

  return (
    <form
      className="flex flex-wrap"
      onSubmit={handleSubmit(submit)}
    >

      <div className="w-1/3 px-2 flex flex-col justify-between">

        <div>

          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", {
              required: true
            })}
          />

          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", {
              required: true
            })}
            onInput={(event) => {
              setValue("slug", slugTransfer(event.currentTarget.value), {
                shouldValidate: true
              })
            }}
          />

          <Input
            label="Author Name :"
            placeholder="Author Name"
            className="mb-4"
            {...register("authorName", {
              required: true
            })}
          />

          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: !post
            })}
            onChange={handleImageChange}
          />

          <div className="w-full pt-4 flex justify-center items-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="No Image"
                style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                  borderRadius: "8px"
                }}
              />
            )}
          </div>

        </div>

        <div>

          <Select
            label="Status"
            className="mb-10"
            options={["active", "inactive"]}
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            className={`w-full hover:${post ? "bg-green-600" : "bg-blue-700"}`}
            bgColor={post ? "bg-green-500" : "bg-blue-600"}
            children={post ? "Update" : "Submit"}
          />

        </div>

      </div>

      <div className="w-2/3 px-2 flex flex-col">

        <RTEditor
          name="content"
          label="Content :"
          control={control}
          defaultValue={getValues("content")}
        />

      </div>

    </form>
  )
}

export default PostForm