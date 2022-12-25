import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { NextPage } from "next";
import style from "./../../styles/component/_login.module.scss";
import CallApi from "./../../app/instance/api";

interface registerFormValues {
  mail: string;
  pass: string;
}

const RegisterFormValidationsSchema = yup.object().shape({
  mail: yup.string().required().email("must be a valid email"),
  pass: yup.string().required(),
});

const LogIn: NextPage = () => {
  const initialValues: registerFormValues = {
    mail: "",
    pass: "",
  };

  const CheckUserLogin = (value: any) => {
    CallApi()
      .get("/users.json")
      .then((res) => {
        let user = Object.values(res.data).find(
          (item: any) => item.mail === value.mail
        );
        user && console.log("login");
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterFormValidationsSchema}
      onSubmit={(value) => CheckUserLogin(value)}
    >
      <Form className={style.logInForm}>
        <label htmlFor="">Email oder HandyNr.</label>
        <Field
          name="mail"
          id="mail"
          required
          autoComplete="mail"
          type="email"
        />

        <label htmlFor="">Kennwort</label>
        <Field name="pass" id="pass" required type="password" />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LogIn;
