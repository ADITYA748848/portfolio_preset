import React from 'react';

export default function SignupPage() {
  return <div>Signup Page</div>;
}
// // import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";



// export default function SignUp() {

//   // const {data: session, status} = useSession();
//   const [form, setForm]= useState({email: '', password: '', confirmPassword: ''});
//   const [error, setError] = useState('');

//   const router = useRouter();

//   // useEffect(() => {
//   //   if (status == 'authenticated') {
//   //     router.push('/');
//   //   }
//   // }, [status, router])
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value});
//   } 
//   const handleSubmit = async  (e) => { 
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       setError('Password do not match');
//       return;
//     }

//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (data.error) {
//       setError('Error happend here')
//       setTimeout(() => {
//         setError('')
//       }, 3000);
//     }else{
//       router.push('/auth/signin');
//     }
//   }

//   return (
//     <>
//       <div className="flex flex-center full-h">
//         <div className="loginform">
//           <div className="heading">Sign Up Created Admin</div>

//           <form className="form" onSubmit={handleSubmit}>
//             <input type="email" name="email" onChange={handleChange} className="input" placeholder="Enter email Address" />
//             <input type="password" name="password" onChange={handleChange} className="input" placeholder="password" />
//             <input type="password" name="confirmPassword" onChange={handleChange} className="input" placeholder="ConfirmPassword" />
//             <button className="login-button" type="submit">Sign Up</button>
//             {error && <p>{error}</p>}
//           </form>
//         </div>
//       </div>

//     </>
//   );
// }

// export default function signup(){
//   return <>
//   <h1>You Don't Have permision to SignUp To This Admin Dashboard</h1>
//   </>
// }
