import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RTEditor, Input, Button, Select } from './index'
import storageService from '../appwrite/storage'

function PostForm({ post }) {
  const navigate = useNavigate()
  const userData = useSelector(status => status.auth.userData)
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
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

        const updatedPost = storageService.updatePost({
          ...data,
          slug: post.$id,
          featuredImage: file.$id
        })

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`)
        }
      }
    }
    else {
      // Create Post
      const file = data.image[0] ? await storageService.createFile(data.image[0]) : null

      if (file) {
        const newPost = await storageService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file.$id
        })

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  }

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
      
      <div className="w-2/3 px-2">

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

        <RTEditor
          name="content"
          label="Content :"
          control={control}
          defaultValue={getValues("content")}
        />

      </div>

      <div className="w-1/3 px-2">

        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post
          })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFliePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          label="Status"
          className="mb-4"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          className="w-full"
          bgColor={post ? "bg-green-500" : undefined}
          children={post ? "Update" : "Submit"}
        />

      </div>

    </form>
  )
}

export default PostForm