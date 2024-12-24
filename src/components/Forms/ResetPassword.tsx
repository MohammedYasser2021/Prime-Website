// "use client"
// import React from 'react'
// import Input from '../Inputs/Input'
// import { useTranslations } from 'next-intl'

// interface PropsTypes {
//     canselHandler():void
// }
// const ResetPassword:React.FC<PropsTypes> = ({canselHandler}) => {
//   const t = useTranslations('profile')

//   return (
//     <form className='flex flex-col gap-3'>
//         <Input inputProps={{type : 'password' , placeholder : "••••••••••"}}  label={t('currentPassword')}/>
//         <Input inputProps={{type : 'password' , placeholder : "••••••••••"}}  label={t("newPassword")}/>
//         <Input inputProps={{type : 'password' , placeholder : "••••••••••"}}  label={t("newPasswordConfirmation")}/>
//         <div className='flex justify-end gap-2'>
//             <button onClick={canselHandler}  className='text-gray-400 hover:bg-gray-100 transition-all px-4 py-2 rounded-md'>{t("cansel")}</button>
//             <button className='bg-primary hover:bg-secondary transition-all text-white px-4 py-2 rounded-md'>{t("change")}</button>
//         </div>
//     </form>
//   )
// }

// export default ResetPassword
