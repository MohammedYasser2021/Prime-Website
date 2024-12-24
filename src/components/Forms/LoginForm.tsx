// "use client";

// import React, { useState } from "react";
// import Input from "../Inputs/Input";
// import Logo from "../../assets/svgs/Logo";
// import Button from "../Buttons/Button";

// interface FormField {
//   value: string;
//   valid: boolean;
// }
// interface LoginData {
//   email: FormField;
//   password: FormField;
// }
// const LoginForm = () => {
//   const [formData, setFormData] = useState<LoginData>({
//     email: {
//       value: "",
//       valid: true,
//     },
//     password: {
//       value: "",
//       valid: true,
//     },
//   });

//   const changeInputHandler = (
//     inputIdentifier: keyof LoginData,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFormData((prev) => {
//       return {
//         ...prev,
//         [inputIdentifier]: {
//           value: event.target.value,
//           void: true,
//         },
//       } as typeof prev;
//     });
//   };

//   const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };
//   return (
//     <>
//       <form
//         onSubmit={submitFormHandler}
//         className="w-2/3 sm:w-1/2 lg:w-1/3  flex-col gap-6   items-center flex"
//       >
//         <Logo
//           svgProps={{
//             className: "w-2/3",
//           }}
//         />
//         <span className="text-2xl">مرحباً بعودتك</span>
//         <Input
//           label="الحساب"
//           classes="w-full  "
//           inputProps={{
//             id: "email",
//             required: true,
//             onChange: changeInputHandler.bind(this, "email"),
//             value: formData.email.value,
//           }}
//         />
//         <Input
//           label="كلمة المرور"
//           classes="w-full"
//           inputProps={{
//             id: "password",
//             required: true,
//             onChange: changeInputHandler.bind(this, "password"),
//             value: formData.password.value,
//           }}
//         />

//         <div className="w-full items-center flex flex-col">
//           <Button
//             classes="w-full"
//             btnTitle="دخول"
//             btnProps={{
//               type: "submit",
//             }}
//           />
//           <span className="text-2x my-2">
//             جميع الحقوق محفوظة لدي ميدكا نيتورك © 2023
//           </span>npm run buildnpm run
//         </div>
//       </form>
//     </>
//   );
// };

// export default LoginForm;
