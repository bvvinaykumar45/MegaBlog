import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import RTE from "../../components/shared/RTE";

import appwriteService from "../../appwrite/services";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { control, getValues, handleSubmit, register, setValue, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z\d]+/g, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updateArticle(data.slug, {
        ...data,
        featuredImage: file?.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createArticle({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 px-2 flex flex-col gap-4">
        <Input
          label="Title :"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: false,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 flex flex-col gap-4 items-center">
        <Input
          label="Featured Image: "
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          label="Status: "
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full mt-8"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
