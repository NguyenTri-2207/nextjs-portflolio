import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaRegComments } from "react-icons/fa";
import Link from "components/molecules/Link";
import Card from "./Card";
import axios from "axios";
import { useForm } from "react-hook-form";

/*** Vendors ***/

/*** components ***/

/*** ========== ***/

export default function Comments({ data, urlBlog }) {
  console.log(urlBlog);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [login, setLogin] = useState(false);
  const [dataComment, setDataComment] = useState(null);
  // Get All COmment
  console.log(dataComment);
  const fetchData = async () => {
    axios
      .get(`http://localhost:4000/api/comments/${urlBlog}`)
      .then((res) => setDataComment(res.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setLogin(localStorage.getItem("login"));
  }, []);

  const onSubmit = async (data) => {
    const author = "6602a71f6bf954fa2f98aa4a";
    const post = urlBlog;
    const content = data.content;
    const abc = { author, post, content };
    console.log(abc);
    axios
      .post("http://localhost:4000/api/comments", abc)
      .then((res) => {
        fetchData(), console.log(res), reset();
      })
      .catch((err) => console.log(err));
  };

  const DeleteComments = (item) => {
    const postIdToDelete = item._id;
    axios
      .delete(`http://localhost:4000/api/comments/${postIdToDelete}`)
      .then((response) => {
        console.log(`Deleted post with ID ${postIdToDelete}`);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <section className="py-8 lg:py-16 antialiased" id="comment">
        <div className=" ">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion (20)
            </h3>
          </div>
          <div className="mb-10">
            {login === "true" ? (
              <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    {...register("content", { required: true })}
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <div className="text-right">
                  {" "}
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Comment
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center border border-white dark:border-[#2a2d46] p-4 rounded-lg shadow">
                <Link
                  href={`/auth/login?url=${router.asPath}#comment`}
                  className="text-center mb-1 cursor-pointer"
                >
                  <div className="flex items-center hover:text-blue-500">
                    <FaRegComments className="mr-2" />
                    <span>Login to comment</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {dataComment &&
            [...dataComment].reverse().map((item, index) => {
              return (
                <Card
                  key={index}
                  data={item}
                  DeleteComments={() => DeleteComments(item)}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
}
