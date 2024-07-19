import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    if (isAuthenticated) {
      navigate('/admin'); // Manda a admin autenticado
    }
  });

  return (
    <div className="container-fluid">
      <h1>Login </h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', { required: true })}
            placeholder="your-email@email.com"
          />
          {errors.email && <p className="red">Email is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register('password', { required: true })}
              placeholder="your-password"
            />
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </Button>
          </div>
          {errors.password && <p className="red">Password is required</p>}
        </Form.Group>

        {signinErrors && signinErrors.map((error, i) => (
          <div className="red" key={i}>
            {error}
          </div>
        ))}

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <p> You do not have an account? <Link to="/register">Register</Link>  </p>
    </div>
  );
}

export default LoginPage;
