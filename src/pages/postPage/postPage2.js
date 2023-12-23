import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { useEffect, useState } from "react";
import axios from "axios";
import MyContext from "../../components/MyContext";
import Navigation from "../../components/Navbar";
import "./PostPage.css";

const QuillEditor = ({ name, setFieldValue }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["image"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      onChange={(content, delta, source, editor) => {
        setFieldValue(name, editor.getContents());
      }}
    />
  );
};

const validationSchema = Yup.object().shape({
  prerequisite: Yup.object().test(
    "prerequisite",
    "Prerequisite is required",
    (value) => {
      return (
        value &&
        value.ops &&
        value.ops.length !== 0 &&
        value.ops.some(
          (op) =>
            (typeof op.insert === "string" && op.insert.trim() !== "") ||
            (op.insert && op.insert.image)
        )
      );
    }
  ),
  question: Yup.object().test("question", "Question is required", (value) => {
    return (
      value &&
      value.ops &&
      value.ops.length !== 0 &&
      value.ops.some(
        (op) =>
          (typeof op.insert === "string" && op.insert.trim() !== "") ||
          (op.insert && op.insert.image)
      )
    );
  }),
  history: Yup.object().test("history", "History is required", (value) => {
    return (
      value &&
      value.ops &&
      value.ops.length !== 0 &&
      value.ops.some(
        (op) =>
          (typeof op.insert === "string" && op.insert.trim() !== "") ||
          (op.insert && op.insert.image)
      )
    );
  }),
  analogy: Yup.object().test("analogy", "Analogy is required", (value) => {
    return (
      value &&
      value.ops &&
      value.ops.length !== 0 &&
      value.ops.some(
        (op) =>
          (typeof op.insert === "string" && op.insert.trim() !== "") ||
          (op.insert && op.insert.image)
      )
    );
  }),
  explanation: Yup.object().test(
    "explanation",
    "Explanation is required",
    (value) => {
      return (
        value &&
        value.ops &&
        value.ops.length !== 0 &&
        value.ops.some(
          (op) =>
            (typeof op.insert === "string" && op.insert.trim() !== "") ||
            (op.insert && op.insert.image)
        )
      );
    }
  ),
});

const PostPage = () => {
  const { wannaanswerthis } = useContext(MyContext);
  const [formKey, setFormKey] = useState(Math.random());

  useEffect(() => {
    if (wannaanswerthis) {
      sessionStorage.setItem(
        "wannaanswerthis",
        JSON.stringify(wannaanswerthis)
      );
    }
  }, [wannaanswerthis]);

  const persistedWannaanswerthis = JSON.parse(
    sessionStorage.getItem("wannaanswerthis")
  );
  const wannaanswerthisData = wannaanswerthis || persistedWannaanswerthis;

  const handleSubmit = async (values, { resetForm }) => {
    const valuesCopy = { ...values, query: wannaanswerthisData };
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "post",
        // url: 'http://localhost:5000/message/add',
        url: "https://social-media-app-sandy-one.vercel.app/message/add",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { message: valuesCopy },
      };
      await axios(config);
      alert("Your data has been stored successfully.");
      resetForm();
      setFormKey(Math.random()); // Change formKey to reset QuillEditor's internal state
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="Container">
        <section className="sectio">
          <h2>Here is your query.</h2>
        </section>
        <div className="question" style={{ fontSize: "20px" }}>
          {wannaanswerthisData}
        </div>
        <Formik
          initialValues={{
            prerequisite: { ops: [] },
            question: { ops: [] },
            history: { ops: [] },
            analogy: { ops: [] },
            explanation: { ops: [] },
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="form" key={formKey}>
              <section className="section">
                <h2>1. Please provide prerequisite knowledge</h2>
                <QuillEditor
                  name="prerequisite"
                  setFieldValue={setFieldValue}
                />
                {errors.prerequisite && touched.prerequisite ? (
                  <div>{errors.prerequisite}</div>
                ) : null}
              </section>
              {/* ... rest of your form */}
              <section className="section">
                <h2>2. Post a thought provoking question</h2>
                <QuillEditor name="question" setFieldValue={setFieldValue} />
                {errors.question && touched.question ? (
                  <div>{errors.question}</div>
                ) : null}
              </section>
              <section className="section">
                <h2>3. Historical Background</h2>
                <QuillEditor name="history" setFieldValue={setFieldValue} />
                {errors.history && touched.history ? (
                  <div>{errors.history}</div>
                ) : null}
              </section>
              <section className="section">
                <h2>4. Analogy</h2>
                <QuillEditor name="analogy" setFieldValue={setFieldValue} />
                {errors.analogy && touched.analogy ? (
                  <div>{errors.analogy}</div>
                ) : null}
              </section>
              <section className="section">
                <h2>5. Actual Topic</h2>
                <QuillEditor name="explanation" setFieldValue={setFieldValue} />
                {errors.explanation && touched.explanation ? (
                  <div>{errors.explanation}</div>
                ) : null}
              </section>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PostPage;
