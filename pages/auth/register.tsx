import { NextPage } from "next";
import Router from "next/router";
/* Form */
import { Field, Formik, Form } from "formik";
import * as yup from "yup";
/* API */
import CallApi from "./../../app/instance/api";
/* Style */
import style from "./../../styles/component/_login.module.scss";
/* Functions */
import { sendVerify } from "./../../app/actions/nodeMail";
/* Form Interface */
interface registerFormValues {
  name: string;
  mail: string;
  mobile: string;
  pass: string;
}
/* Yup validation */
const RegisterFormValidationsSchema = yup.object().shape({
  name: yup.string().required().min(4),
  // mail: yup.string().required().email("must be a valid email"),
  pass: yup.string().required().min(6),
});

const register: NextPage = () => {
  const initialValues: registerFormValues = {
    name: "",
    mail: "",
    mobile: "",
    pass: "",
  };

  let CreateUser = async (values: any) => {
    values.verifyCode = Math.trunc(Math.random() * 1000000);
    let res = await CallApi().post("/users.json", values);
    if (res.status === 200) {
      Router.push(`/auth/${values.name}?mail=${values.mail}`);
      sendVerify();
    } else console.log("error");
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterFormValidationsSchema}
        onSubmit={(value) => CreateUser(value)}
      >
        <Form className={style.signUpForm}>
          <label htmlFor="name">Full Name</label>
          <Field
            name="name"
            id="name"
            required
            autoComplete="name"
            type="text"
          />

          <label htmlFor="mail">Email</label>
          <Field
            name="mail"
            id="mail"
            required
            autoComplete="mail"
            type="email"
          />

          <label htmlFor="mobile">HandyNr.</label>
          <Field
            name="mobile"
            id="mobile"
            required
            autoComplete="mobile"
            type="text"
          />

          <label htmlFor="pass">Kennwort</label>
          <Field name="pass" id="pass" required type="password" />

          <button type="submit">Anmelden</button>
        </Form>
      </Formik>

      {/**  <div className={style.logInForm}>
        <label htmlFor="">Email oder HandyNr.</label>
        <input type="text" />

        <label htmlFor="">Kennwort</label>
        <input type="password" />

        <button type="submit">Login</button>
      </div> */}
    </>
  );
};

export default register;
