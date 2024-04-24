import "./App.css";
import Message from "./Message.tsx";
import { GenderEnum, MyForm } from "./types.tsx";
import { useForm, SubmitHandler } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email format is not valid"),
  age: yup.number().required("Age is required").min(1).max(100).integer(),
  gender: yup.string<GenderEnum>().defined().required("Gender is required").default(GenderEnum.male),
});

function App() {

const form = useForm<MyForm>({
    defaultValues: {
    email: "",
    age: 0,
    gender: GenderEnum.male,
    },
    resolver: yupResolver(schema),
  })
  
  const { register, handleSubmit, control, formState: { errors }, reset } = form;

  const onSubmit: SubmitHandler<MyForm> = (data) => {
    console.log(data);
    reset();
  }

  return (
    <>
      <h2>React Forms</h2>
      <form className="my-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Email
          <input type="email" {...register("email")} />
        <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <Message>{message}</Message>}
      />
        </label>
        <label>
          Age
          <input type="number" {...register("age")} />
        </label>
          <ErrorMessage
        errors={errors}
        name="age"
          render={({ message }) => <Message>{message}</Message>}
        
      />
        <label>gender
          <select id="gender" {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <ErrorMessage
        errors={errors}
        name="gender"
          render={({ message }) => <Message>{message}</Message>}
      />
        </label>

        <button type="submit">Submit</button>
      </form>
              <DevTool control={control}/>
    </>
  );
}
export default App;
