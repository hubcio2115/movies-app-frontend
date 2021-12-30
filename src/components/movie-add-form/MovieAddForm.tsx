import { FC } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import api from "../../api/movies";
import { Link } from "react-router-dom";

const MovieAddForm: FC = () => {
  const initialValues = {
    title: "",
    director: "",
    genre: "",
    year: 1999,
    description: "",
    image_url: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Pole wymagane"),
    director: Yup.string().required("Pole wymagane"),
    genre: Yup.string().required("Pole wymagane"),
    year: Yup.number()
      .min(1000, "Proszę podać date po roku 1000")
      .max(
        new Date().getFullYear(),
        "Rok nie może być większy niż z dzisiejszej daty"
      )
      .required("Pole wymagane"),
    description: Yup.string().required("Pole wymagane"),
    image_url: Yup.string().url("Proszę podać ").nullable(),
  });

  return (
    <div>
      <h2>Dodaj Film</h2>
      <Link to={"/"}>
        <button>Powrót</button>
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          api.post("/movie", values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="title">Tytuł: </label>
              <Field id="title" name="title" type="text" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
            </div>
            <div>
              <label htmlFor="director">Dyrektor: </label>
              <Field id="director" name="director" type="text" />
              {errors.director && touched.director ? (
                <div>{errors.director}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="genre">Gatunek: </label>
              <Field id="genre" name="genre" type="text" />
              {errors.genre && touched.genre ? <div>{errors.genre}</div> : null}
            </div>
            <div>
              <label htmlFor="year">Rok premiery: </label>
              <Field id="year" name="year" type="number" />
              {errors.year && touched.year ? <div>{errors.year}</div> : null}
            </div>
            <div>
              <label htmlFor="description">Opis: </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={10}
                cols={30}
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="image_url">Zdjęcie: </label>
              <Field id="image_url" name="image_url" type="url" />
              {errors.image_url && touched.image_url ? (
                <div>{errors.image_url}</div>
              ) : null}
            </div>
            <button type="submit">Zapisz</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MovieAddForm;
