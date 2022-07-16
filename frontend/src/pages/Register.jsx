import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							name='name'
							id='name'
							className='form-control'
							placeholder='Enter Your Name'
							value={name}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							id='email'
							className='form-control'
							placeholder='Enter Your Email'
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							id='password'
							className='form-control'
							placeholder='Enter Your Password'
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password2'
							id='password2'
							className='form-control'
							placeholder='Confirm Password'
							value={password2}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;