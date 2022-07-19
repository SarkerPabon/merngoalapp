import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formData;

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate("/");
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("Register: ", formData);

		if (password !== password2) {
			toast.error("Passwords do not match");
		} else {
			const userData = { name, email, password };

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

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
